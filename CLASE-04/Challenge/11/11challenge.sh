#!/bin/bash
mkdir lamp-app-ecommerce
cp -r ../../../CLASE-02/lamp-app-ecommerce/* lamp-app-ecommerce
docker compose up -d
sleep 30
docker ps
docker exec -t challenge11-php bash -c "sed -i 's/172.20.1.101/mariadb/g' /var/www/html/index.php"
sleep 30
docker-compose down -v --rmi all
rm -r lamp-app-ecommerce