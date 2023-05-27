#!/bin/bash
# Build Dockerfile
docker build . -t challenge04-apache:new
# Run Dockerfile
docker run -d --name challenge04 -p 5050:80 challenge04-apache:new
# Inspect Image
echo Inspect image
docker inspect challenge04-apache:new
echo History image
docker history challenge04-apache:new
echo Inspect image layers
docker image inspect challenge04-apache:new -f '{{.RootFS.Layers}}'
docker stop challenge04
docker rm challenge04