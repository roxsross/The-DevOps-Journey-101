# AWS Challenge

## Challenge 01

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Despliegue de una instancia EC2 Linux y despliegue de código php
  - Despliegue de una instancia EC2 Windows e instalación de un cliente MySQL
  - Despliegue de una base de datos RDS MySQL y carga de datos a través de Linux y un cliente MySQL
  - Despliegue de componentes de red multi-región e interconexión entre estos recursos

<br>

<img src=Reto01.png>

<br>

b. Desplegar la aplicación “Web Coffee" en la instancia "EC2 Linux"

<br>

**2. Principales Servicios/features usados**

 - EC2 Instances
 - Security Groups
 - RDS Instances
 - VPC, Subnet, Route Table
 - VPC Peering Connection

<br>

**3. Entregables**

<br>

a. Los usuarios deberán consultar la IP Pública de la Instancia “EC2 Linux” y las páginas "index.php" y "Coffee.php". Ejemplo:

    http://20.35.48.129/index.php
    http://20.35.48.129/Coffee.php

<br>

 b. La organización ha visto oportuno agregar un nuevo tipo de café. Se solicita al equipo técnico agregar este nuevo tipo de café en la base de datos desde la instancia “EC2 Windows”. Los cambios se deberán ver reflejados en la aplicación.

<br>

**4. Recomendaciones técnicas al desplegar**

<br>

**En cada región:**

 - Crear VPC
 - Crear componentes de red en VPC (Subnet, Route Table, Internet Gateway)
 - Crear VPC Peering entre VPCs

**En la región de Ohio (us-east-2)**

 - Crear Subnet Group
 - Crear RDS MySQL

**En la región de N.Virginia (us-east-1)**

 - Crear instancia “EC2 Linux”
 - Levantar el servicio “Web Coffee” usando el código del repositorio
 - Crear y asociar “Elastic IP”
 - Configurar la integración entre “EC2 Linux” y “RDS” ( /var/www/html/Model/Credentials.php)
 - Desde la instancia "EC2 Linux" instalar el cliente MySQL y cargar los registros base al RDS. 
 - Testear desde la IP Pública de la instancia EC2 las páginas "index.php" y "Coffee.php"
 - Crear instancia “EC2 Windows”
 - Instalar “MySQL Workbench” o algún software conexión a base de datos (DBeaver) en la instancia "EC2 Windows".
 - Conectarse, desde la instancia “EC2 Windows”, al RDS. Cargar un nuevo registro
 - Testear desde la IP Pública de la instancia EC2 las páginas "index.php" y "Coffee.php"

<br>

**5. Consideraciones de Seguridad**

**A nivel de red:**

 - Configurar privilegios mínimos en los respectivos security groups (EC2 Linux, EC2 Windows, RDS). Realizar configuraciones por sg-id no por CIDR.
 - Configurar correctamente el ruteo en las subnets privadas (a través del VPC Peering Connection) y las subnets públicas (a través del VPC Peering Connection y el Internet Gateway). Configurar rutas mínimas.
 - Desplegar la instancia RDS en una red privada.

 **A nivel de aplicación:**

 - Exponer sólo el puerto HTTP a todo el mundo (0.0.0.0/0)
 - Exponer sólo los protocolos SSH y RDP a los administradores (MyIP)
 - Cifrar el volumen EBS con KMS (Gestionado por AWS)

<br>

<br>

# Aplicación

## Instalación de la Aplicación Web (Ubuntu 18.04)

<br>

**1. Instalación de aplicaciones**

```bash
sudo su
sudo apt-get update
sudo apt-get install php libapache2-mod-php -y
sudo apt-get install php-mysqli -y
```

<br>

**2. Descarga de código fuente**

```bash
cd /home/ubuntu
git clone https://github.com/jbarreto7991/aws-challenge.git
cd /home/ubuntu/aws-challenge/web-app
```

<br>

**3. Desplegando código en apache**

```bash
cp -r * /var/www/html
sudo /etc/init.d/apache2 restart
```

<br>

**4. Configuración apache**

```bash
chmod 777 /etc/php/7.2/apache2/php.ini
sed 's+;extension=mysqli+extension=mysqli+g' /etc/php/7.2/apache2/php.ini >> /etc/php/7.2/apache2/bk_php.ini
rm /etc/php/7.2/apache2/php.ini
mv /etc/php/7.2/apache2/bk_php.ini /etc/php/7.2/apache2/php.ini
sudo /etc/init.d/apache2 restart
```

<br>

**5. Validación index.php**

 - Revisar la página: http://PUBLIC_IP/index.php

<br>

**6. Validación Coffee.php**

 - Revisar la página http://PUBLIC_IP/Coffee.php
 - Esta página se visualizará cuando la integración entre EC2 y RDS esté realizado


<br>

## Instalación de MySQL Client y conexión a BD desde instancia Linux

<br>

**1. Install MySQL**

```bash
sudo apt-get update
sudo apt-get install mysql-server -y
sudo service mysql status
```

    > Recordar "usuario" de RDS: $USUARIO_RDS

    > Recordar "contraseña" de RDS: $CONTRASEÑA_RDS

    > Recordar "endpoint" de RDS: $ENDPOINT_RDS


<br>

**2. Conexión a RDS**

```bash
mysql -u $USUARIO_RDS -h $ENDPOINT_RDS -p
```

    > Ingresar $CONTRASEÑA_RDS

<br>

**3. Creación de base de datos "coffee"**

```bash
CREATE DATABASE coffee;

USE coffee;

CREATE TABLE IF NOT EXISTS `coffee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `roast` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `review` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

SHOW TABLES;

INSERT INTO `coffee` (`id`, `name`, `type`, `price`, `roast`, `country`, `image`, `review`) VALUES
(1, 'Cafe au Lait', 'Classic', 2.25, 'Medium', 'France', 'Images/Coffee/Cafe-Au-Lait.jpg', 'A coffee beverage consisting strong or bold coffee (sometimes espresso) mixed with scalded milk in approximately a 1:1 ratio.'')'),
(2, 'Caffe Americano', 'Espresso', 3.25, 'Medium', 'Italy', 'Images/coffee/caffe_americano.jpg', 'Similar in strength and taste to American-style brewed coffee, there are subtle differences achieved by pulling a fresh shot of espresso for the beverage base.'),
(3, 'Peppermint White Chocolate Mocha', 'Espresso', 3.25, 'Medium', 'Italy', 'Images/coffee/white-chocolate-peppermint-mocha.jpg', 'Espresso with white chocolate and peppermint flavored syrups and steamed milk. Topped with sweetened whipped cream and dark chocolate curls.'),
(4, 'Galao', 'Latte', 4.2, 'Light', 'Portugal', 'Images/Coffee/galao_kaffee_portugal.jpg', 'Galao is a hot drink from Portugal made of espresso and foamed milk');
```

<br>

**4. Validar registros ingresados**

```bash
select * from coffee;
```

<br>

## Integración EC2 y RDS

<br>

**1. Configurar archivos de integración EC2 - RDS**

```bash
nano /var/www/html/Model/Credentials.php
```

<br>

**2. Modificar los siguientes valores:**

 - $host, con la ip privada del RDS
 - $user, con el usuario registrado en el RDS al momento de la creación
 - $passwd, con la contraseña registrada en el RDS al momento de la creación
 - $database, el valor debe ser "coffee". Según el database creado en pasos anteriores

<br>

**3. Reiniciar el servicio apache**

```bash
sudo /etc/init.d/apache2 restart
```

