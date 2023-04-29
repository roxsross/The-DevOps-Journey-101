# Introduction

Ejemplo de despliegue de una aplicacion e-commerce

Sistema Operativo: Ubuntu

## Deploy Pre-Requisites

1. Update

```
sudo apt-get update
```

## Deploy and Configure Database

1. Install MariaDB

```
sudo apt install -y mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo systemctl status mariadb
```

2. Configure Database

```
$ mysql
MariaDB > CREATE DATABASE ecomdb;
MariaDB > CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompassword';
MariaDB > GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'localhost';
MariaDB > FLUSH PRIVILEGES;
```

3. Agregar datos a la database ecomdb

Create the db-load-script.sql

```
cat > db-load-script.sql <<-EOF
USE ecomdb;
CREATE TABLE products (id mediumint(8) unsigned NOT NULL auto_increment,Name varchar(255) default NULL,Price varchar(255) default NULL, ImageUrl varchar(255) default NULL,PRIMARY KEY (id)) AUTO_INCREMENT=1;

INSERT INTO products (Name,Price,ImageUrl) VALUES ("Laptop","100","c-1.png"),("Drone","200","c-2.png"),("VR","300","c-3.png"),("Tablet","50","c-5.png"),("Watch","90","c-6.png"),("Phone Covers","20","c-7.png"),("Phone","80","c-8.png"),("Laptop","150","c-4.png");

EOF
```

Run sql script

```

mysql < db-load-script.sql
```


## Deploy and Configure Web

1. Install required packages

```
sudo apt install apache2 -y
sudo apt install -y php libapache2-mod-php php-mysql
```

2. Iniciar servidor web Apache

```
sudo systemctl start apache2 
sudo systemctl enable apache2 
sudo systemctl status apache2 
```

4. Codigo

```
sudo apt install git -y
git clone https://github.com/roxsross/The-DevOps-Journey-101.git
cp -r The-DevOps-Journey-101/CLASE-02/lamp-app-ecommerce/* /var/www/html/
mv /var/www/html/index.html /var/www/html/index.html.bkp
```

5. Actualizar index.php

Update index.php

```
sudo sed -i 's/172.20.1.101/localhost/g' /var/www/html/index.php

              <?php
                        $link = mysqli_connect('172.20.1.101', 'ecomuser', 'ecompassword', 'ecomdb');
                        if ($link) {
                        $res = mysqli_query($link, "select * from products;");
                        while ($row = mysqli_fetch_assoc($res)) { ?>
```

6. Test

```
curl http://localhost
```
---

Documentación Complementaria:

[Cómo instalar la pila Linux, Apache, MySQL y PHP (LAMP) en Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-20-04-es)

[How To Install MariaDB on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04)


© KodeKloud 2019|Fixed by RoxsRoss 2023 | All Rights Reserved
