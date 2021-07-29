Parsing logs in log4j format, since bamboo uses log4j for logs.

# Filebeat

https://community.graylog.org/t/pipeline-grok-syntax/3397

# Graylog configuration

Content pack for parsing bamboo logs.

%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} \\[%{DATA:thread}\\] \\[%{DATA:class}\\]%{GREEDYDATA:message}(?s)%{GREEDYDATA:exception}
