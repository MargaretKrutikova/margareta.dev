---
path: graylog
date: 2021-07-26T11:30:00.831Z
title: Graylog configuration
category: note
tags: [graylog]
published: true
description:
---

# Extractors vs pipelines for message processing

Extractor can create new fields that might need to be present for the pipeline to run, or the other way. Message processor ordering is important (Message filter chain vs Pipeline) and can be configured, see [docs on pipelines](https://docs.graylog.org/en/4.0/pages/pipelines/usage.html#configure-the-message-processor) and [docs on stream connections](https://docs.graylog.org/en/4.1/pages/pipelines/stream_connections.html#the-importance-of-message-processor-ordering).

Prefer pipelines, see [answer](https://community.graylog.org/t/pipeline-processor-vs-extractor/6029/4).

> Pipelines are the future.

Extractor is always bound to an input.

# Pipelines

The actions are run for all matching rules in the stage regardless of whether the outcome of the stage's condition is true or false.

Rules can be shared between pipelines. Rules' conditions eventually determine whether to run the rest of the stages in the pipeline depending on the stage's `match` conditions.

Rules have conditions and actions.

# Streams

Streams are categories of messages. Default stream is `All messages`. After it messages can be routed into many other streams bases on rules of the streams. A message can be part of many streams.

From [docs on streams](https://docs.graylog.org/en/4.0/pages/streams.html):

> Every stream is assigned to an index set which controls how messages routed into that stream are being stored into Elasticsearch.

# Grok

You can create your own grok patterns under `System -> Grok patterns`

# Using regex in rules

Many online tools don't use JAVA regex, but all graylog regexs come in Java format so they need to be double escaped to make them work. E.g.:

`regex("^(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2},\\d{3})", message, ["date"])`

To see the results it is possible to use `debug`, see (answer)[https://community.graylog.org/t/regex-tools-vs-graylog-matching/13380/4]:

```
then
...
  debug("---results of regex:");
  debug(to_string(m)); //to look at all parts in {}
  debug(to_string(m["12"]; //if you want to pull out item 12
...
end
```

Then: `tail -f /var/log/graylog-server/server.log`.

%{LOGTIMESTAMP:timestamp} %{LOGLEVEL:level} \[%{DATA:thread}\] \[%{DATA:class}\]

# Total restart

```
cd /home/adminuser/graylog-server
curl -XDELETE 'http://localhost:9200/graylog_0'
sudo docker-compose down
sudo -i
rm /var/lib/graylog-sidecar/collectors/filebeat/data/registry
rm /var/lib/graylog-sidecar/collectors/filebeat/log/filebeat*
exit

sudo systemctl restart filebeat
sudo systemctl restart graylog-sidecar

sudo docker-compose up --build --force-recreate -d
pwd
```

# Troubleshooting

```
sudo systemctl status filebeat
sudo systemctl status graylog-sidecar
```
