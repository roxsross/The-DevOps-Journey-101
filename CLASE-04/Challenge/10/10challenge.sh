#!/bin/bash
docker-compose up -d --build
sleep 120
docker-compose down -v --rmi all