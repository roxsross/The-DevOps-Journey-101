#!/bin/bash
docker-compose up -d
sleep 120
docker exec -it challenge11-web bash
sudo sed -i 's/172.20.1.101/challenge11-db/g' /var/www/html/index.php