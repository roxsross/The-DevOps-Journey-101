#!/bin/bash
# Image in My Docker Hub
# wyataco/challenge08-app:1.0

# Run docker compose
docker-compose up -d
sleep 5
curl http://localhost:8080
curl http://localhost:8080
curl http://localhost:8080
curl http://localhost:8080
curl http://localhost:8080
sleep 5
docker-compose down