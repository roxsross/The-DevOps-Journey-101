#!/bin/bash
# Image in My Docker Hub
# wyataco/challenge07-backend-pokemon-app:1.0
# wyataco/challenge07-frontend-pokemon-app:1.0

# Run docker compose
docker-compose up -d
sleep 30
docker-compose down