#!/bin/bash
git clone https://github.com/wodby/docker4drupal.git
cd docker4drupal
docker4drupal$ docker-compose up -d
sleep 30
docker ps