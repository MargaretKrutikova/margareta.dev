# Install and configure sidecar on the target machine

```
# The URL to the Graylog server API.
server_url: "http://ip_address:9000/api/"

# The API token to use to authenticate against the Graylog server API.
# This field is mandatory
server_api_token: "generate_token"

# The node ID of the sidecar. This can be a path to a file or an ID string.
# If set to a file and the file doesn't exist, the sidecar will generate an
# unique ID and writes it to the configured path.
#
# Example file path: "file:/etc/graylog/sidecar/node-id"
# Example ID string: "6033137e-d56b-47fc-9762-cd699c11a5a9"
#
# ATTENTION: Every sidecar instance needs a unique ID!
#
node_id: "file:/etc/graylog/sidecar/node-id"

# The node name of the sidecar. If this is empty, the sidecar will use the
# hostname of the host it is running on.
#node_name: ""

# The update interval in seconds. This configures how often the sidecar will
# contact the Graylog server for keep-alive and configuration update requests.
#update_interval: 10

# This configures if the sidecar should skip the verification of TLS connections.
# Default: false
#tls_skip_verify: false

# This enables/disables the transmission of detailed sidecar information like
# collector statues, metrics and log file lists. It can be disabled to reduce
# load on the Graylog server if needed. (disables some features in the server UI)
#send_status: true

# A list of directories to scan for log files. The sidecar will scan each
# directory for log files and submits them to the server on each update.
#
# Example:
#     list_log_files:
#       - "/var/log/nginx"
#       - "/opt/app/logs"
#
# Default: empty list
#list_log_files: []

# Directory where the sidecar stores internal data.
#cache_path: "/var/cache/graylog-sidecar"

# Directory where the sidecar stores logs for collectors and the sidecar itself.
#log_path: "/var/log/graylog-sidecar"

# The maximum size of the log file before it gets rotated.
#log_rotate_max_file_size: "10MiB"

# The maximum number of old log files to retain.
#log_rotate_keep_files: 10

# Directory where the sidecar generates configurations for collectors.
#collector_configuration_directory: "/var/lib/graylog-sidecar/generated"

# A list of binaries which are allowed to be executed by the Sidecar. An empty list disables the whitelist feature.
# Wildcards can be used, for a full pattern description see https://golang.org/pkg/path/filepath/#Match
# Example:
#     collector_binaries_whitelist:
#       - "/usr/bin/filebeat"
#       - "/opt/collectors/*"
#
# Example disable whitelisting:
#     collector_binaries_whitelist: []
#
# Default:
# collector_binaries_whitelist:
#  - "/usr/bin/filebeat"
#  - "/usr/bin/packetbeat"
#  - "/usr/bin/metricbeat"
#  - "/usr/bin/heartbeat"
#  - "/usr/bin/auditbeat"
#  - "/usr/bin/journalbeat"
#  - "/usr/share/filebeat/bin/filebeat"
#  - "/usr/share/packetbeat/bin/packetbeat"
#  - "/usr/share/metricbeat/bin/metricbeat"
#  - "/usr/share/heartbeat/bin/heartbeat"
#  - "/usr/share/auditbeat/bin/auditbeat"
#  - "/usr/share/journalbeat/bin/journalbeat"
#  - "/usr/bin/nxlog"
#  - "/opt/nxlog/bin/nxlog"

```

# Filebeat sidecar configuration on the graylog server

```
# Needed for Graylog
fields_under_root: true
fields.collector_node_id: ${sidecar.nodeName}
fields.gl2_source_collector: ${sidecar.nodeId}

filebeat.inputs:
- input_type: log
  enabled: true
  paths:
    - /home/adminuser/bamboo/*.txt
  type: log
  multiline.type: pattern
  multiline.pattern: '^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
  multiline.negate: true
  multiline.match: after
  processors:
    - add_fields:
        fields:
            document_type: "log4j"
output.logstash:
   hosts: ["ip_address:5044"]
path:
  data: /var/lib/graylog-sidecar/collectors/filebeat/data
  logs: /var/lib/graylog-sidecar/collectors/filebeat/log
```
