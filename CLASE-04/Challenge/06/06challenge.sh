#!/bin/bash
# Build Dockerfile
docker build -t wyataco/pokepy-challenge06:1.0 .
# Run Dockerfile
docker run -d --name challenge06 -p 5000:5000 wyataco/pokepy-challenge06:1.0
sleep 2
curl http://localhost:5000
sleep 3
curl http://localhost:5000
sleep 3
docker stop challenge06
docker rm challenge06
# Image in My Docker Hub
# wyataco/pokepy-challenge06:1.0