#!/bin/bash
export NODE_PROJECT_NAME="bangumiNode"
nohup node serve.js > bangumiNode.log 2>&1 &
echo $! > bangumiNode.pid
echo "bangumiNode started with PID $(cat bangumiNode.pid)"
