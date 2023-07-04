#!/bin/bash
# Image in My Docker Hub
# wyataco/challenge05-app:1.0
# wyataco/challenge05-consumer:1.0

# Run docker compose
docker-compose up -d
sleep 3
curl localhost:8000
sleep 2
docker logs service-consumer
sleep 3
docker-compose down