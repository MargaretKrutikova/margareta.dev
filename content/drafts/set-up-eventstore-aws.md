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

When creating an event store we are pulling an [eventstore](https://hub.docker.com/r/eventstore/eventstore) image from docker hub, specifying two external ports for TCP (1113) and HTTP (2113) communication. `EventStore` image supports built-in self-signed certificate or can be instructed to use a real certificate, read more about event store [security](https://developers.eventstore.com/server/v5/security.html#security). Setting `EVENTSTORE_INSECURE` to `true` will allow us to skip this for now, we will deal with it later when the rest is up and running.

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
    EVENTSTORE_ENABLE_EXTERNAL_TCP: "true",
    EVENTSTORE_INSECURE: "true"
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

## Creating stacks and dependencies

In our `bin/app.ts` we assemble the stacks and constructs in the order of their dependencies. A stack with stateful resources and their dependencies (`Vpc` and file system) are packaged in a deployment unit `StatefulStack` and is created first, the event store stack is created on the fly inside the construct and accepts the dependencies defined above.

```ts
const app = new cdk.App();

const statefulResources = new StatefulStack(app, "StatefulResources");

const eventStoreResources = new EventStoreConstruct(
  new Stack(app, "EventStore"),
  "EventStore",
  {
    fileSystem: statefulResources.fileSystem,
    vpc: statefulResources.vpc,
  }
);
```

## Access to event store from outside

Assume we have another fargate service that we are building and we want to give it access to our event store. We need to add inbound rules in the event store security group to allow access to the event store on specific ports from the security group of this new service.

Ideally we don't want to configure security group rules inside the event store construct/stack because it will invert the dependency arrow - it is not the event store that depends on that external service, but the external service depends on the event store. In this way the deployment cycle of the event store is not influenced by deployments of the dependent stacks.

One solution is to allow other `cdk` constructs to configure access in the event store connections that we can expose from the event store construct. The plan is:
- expose `connections` object from the `fargate` service on the construct,
- pass the `connections` as a dependency in `props` in the other service construct,
- configure access to the service security group via `allowTo`.

Changes we want to make inside the event store construct:
```ts
export class EventStoreConstruct extends Construct {
  connections: ec2.Connections;

  constructor(scope: Construct, id: string, props: EventStoreProps) {
    super(scope, id);
    const fargateService = new ecs.FargateService(..);
    
    // a lot of code

    this.connections = fargateService.connections;
  }
}
```

And our service construct:

```ts
export type OtherServiceProps = {
  vpc: IVpc;
  eventStoreConnections: ec2.IConnectable;
};

export class OtherServiceConstruct extends Construct {
  constructor(scope: Construct, id: string, props: OtherServiceProps) {
    super(scope, id);
    
    // setup cluster, fargate service, task definition etc.

    const fargateService = new ecs.FargateService(...);

    fargateService.connections.allowTo(props.eventStoreConnections, ec2.Port.tcp(2113));
    fargateService.connections.allowTo(props.eventStoreConnections, ec2.Port.tcp(1113));
  }
}
```

## Access EventStore Admin UI

You can enable access to EventStore [Admin UI](https://developers.eventstore.com/server/v5/admin-ui.html#dashboard) for testing purposes by exposing port `2113` to your IP in the inbound rules of the security group that belongs to the fargate service we created above. This is not pretty, but hej, we need to test stuff first ... You should be able to access the admin UI with `http://<FARGATE_TASK_IP>:2113`.

 I guess it goes without saying that you need to remove your IP from the rules and set up a more robust solution (external `dns`, `aws cloud map` or smth else) to access the admin UI when going live.

## Bonus: generating certificate

To secure communication to/from event store we can generate a certificate with the [certification generation tool](https://developers.eventstore.com/server/v20.10/security.html#certificate-generation-tool) that comes with event store. There is a docker image and a CLI that will generate a certificate authority and a node certificate for `EventStoreDB`, located in a separate `github` repo [`es-gencert-cli`](https://github.com/EventStore/es-gencert-cli). 

The plan is to extend the task definition and volumes defined earlier in our event store construct. The certificate won't be stored in the file system but in the fargate task storage and will be re-generated every time the task is updated. Here are the steps:
- create a bind mount host volumes and add it to the task definition,
- add container with `es-gencert-cli` image and specify command that will generate a certificate and place it on disk,
- add mount point to the container,
- add the certificate generator container to the dependencies in the main event store container.

The communication to/from the event store is now encrypted, though the certificate is self-signed :shrug: A more production-ready setup is necessary, but hej, we are experimenting here, aren't we?


## Next steps

You might want to add logging and cloud map for service discoverability to the event store container. You might also want to change the default event store credentials and pass them to the other services via `SecretsManager`.