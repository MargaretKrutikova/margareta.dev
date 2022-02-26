# Setting up event store in aws with cdk

Event store can be deployed as a managed instance via [Event Store Cloud](https://www.eventstore.com/event-store-cloud) which will take care of availability, clustering and other candies. The only drawback is the [cost](https://www.eventstore.com/event-store-cloud/pricing) of the hosting resources plus a separate cost for [support](https://www.eventstore.com/support). For a small project or a POC, it might get too overwhelming. So we won't take any fancy shortcuts with managed clouds and do it on our own in `aws` using `cdk` with `Typescript`. We will have one event store cluster running in `ecs` fargate service writing events to an external file system.

## Setup overview

- create a VPC where the file system will reside
- file system for persisting events
- ecs fargate service to run EventStore 
    - configure EventStore image
    - configure certificate
    - allow access to file system
- open access to event store from anothe service

## Best practices

A couple of very important `cdk` [best practices](https://aws.amazon.com/blogs/devops/best-practices-for-developing-cloud-applications-with-aws-cdk/) that we will follow in our setup:
- organize app in logical units that extend `Construct`,
- group constructs into deployment units that extend `Stack`,
- separate stacks with stateful and stateless resources.

Following these will greatly help when your app grows, you need to refactor or add more resources. And hopefully this will happen and your app will grow :)  

Our setup will look like this:
- Constructs:
    - vpc where will later attach the file system and `ecs` cluster for event store,
    - file system,
    - `ecs` cluster and `fargate` service for running event store,
- Stacks:
    - a stateful stack with the vpc and filesystem constructs,
    - a stateless stack with the event-store construct.

## Stateful resources

Here is an example construct of vpc and file system.

The file system can e.g. look like this:
```ts
new efs.FileSystem(this, "AppFileSystem", {
    vpc: props.vpc,
    lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
    performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
    throughputMode: efs.ThroughputMode.BURSTING,
    removalPolicy: RemovalPolicy.RETAIN,
    fileSystemName: "AppFileSystem",
    enableAutomaticBackups: true,
});
```

You can configure backups manually or turn on automatic backups (`enableAutomaticBackups` is set to `true`). The important thing here is to be aware of the default setting of automatic backups. According to the [docs](https://docs.aws.amazon.com/aws-backup/latest/devguide/create-auto-backup.html):

> The default backup window (the time frame when the backup will run) is set to start at 5 AM UTC (Coordinated Universal Time) and lasts 8 hours.

And to ensure consistent backups they [recommend](https://docs.aws.amazon.com/efs/latest/ug/alternative-efs-backup.html) pausing any writes to the file system or unmounting it during the backup:
> We recommend that you perform all backups during scheduled downtime or off hours.

You might not want to keep these default settings and in that case make to not enable automatic backups and configure your own backup vault and backup rules, e.g.:

```ts
const backupVault = new backup.BackupVault(...);

const plan = new backup.BackupPlan(this, "FileSystemBackupPlan`, {
    backupVault,
    backupPlanRules: [
        new backup.BackupPlanRule({
            completionWindow: Duration.hours(2),
            startWindow: Duration.hours(1),
            scheduleExpression: events.Schedule.cron({ hour: "2", minute: "0" }), // daily at 2 AM UTC
            deleteAfter: Duration.days(35),
        }),
    ],
});
```

Once you go for the automatic backups and change your mind later, the automatic backup vault can't be removed. It will just be there, cold and lonely, until the end of times.

## Event store

This beast is tricky, here is what we do:
- create ecs cluster, 
- create volumes for event store logs and data in our file system,
- create a `fargate` task definition and add the volumes,
- create an event store container and mount the volumes,
- create a `fargate` service and connect it with the task definition,
- open access from the service to the file system.

Let's assume we have created a cluster and a `fargate` task definition:
```ts
const cluster = new ecs.Cluster(...)
const taskDefiniton = new ecs.FargateTaskDefinition(...)
```

To create the volumes we need a file system which we can pass as props into the construct:
```ts
const esVolumeLogs: ecs.Volume = {
  name: "eventstore-volume-logs",
  efsVolumeConfiguration: {
    fileSystemId: props.fileSystem.fileSystemId,
  },
};

const esVolumeData: ecs.Volume = {
  name: "eventstore-volume-data", 
  efsVolumeConfiguration: {
    fileSystemId: props.fileSystem.fileSystemId,
    transitEncryption: "ENABLED",
  },
};

taskDefinition.addVolume(esVolumeLogs);
taskDefinition.addVolume(esVolumeData);
```

When creating an event store we are pulling an [eventstore](https://hub.docker.com/r/eventstore/eventstore) image from docker hub, specifying two external ports for TCP (1113) and HTTP (2113) communication.

```ts
const esContainer = taskDefinition.addContainer("EventStoreContainer", {
  image: ecs.ContainerImage.fromRegistry(
    "eventstore/eventstore:21.10.0-buster-slim"
  ),
  containerName: "EventStore",
  portMappings: [{ containerPort: 2113 }, { containerPort: 1113 }],
  user: "root",
  environment: {
    EVENTSTORE_CLUSTER_SIZE: "1",
    EVENTSTORE_EXT_TCP_PORT: "1113",
    EVENTSTORE_HTTP_PORT: "2113",
    EVENTSTORE_ENABLE_EXTERNAL_TCP: "true"
  },
});
```

And now we can mount the volumes we created earlier:
```ts
  esContainer.addMountPoints({
    containerPath: "/var/log/eventstore",
    sourceVolume: esVolumeLogs.name,
    readOnly: false,
  });

  esContainer.addMountPoints({
    containerPath: "/var/lib/eventstore",
    sourceVolume: esVolumeData.name,
    readOnly: false,
  });
```

Creating a fargate service is trivial and will just connect the loose parts together:
```ts
  const fargateService = new ecs.FargateService(
    this,
    "EventStoreFargateService",
    {
      cluster,
      taskDefinition,
      platformVersion: ecs.FargatePlatformVersion.LATEST,
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
      assignPublicIp: true,
    }
  );
```



## Next steps

You might want to add logging and cloud map for service discoverability to the event store container. You might also want to change the default event store credentials and pass them to the other services via `SecretsManager`.