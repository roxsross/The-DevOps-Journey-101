# AWS Challenge

## Challenge 08

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Creación de un template en CloudFormation y su despliegue en AWS
  - Creación de un template en Terraform y su despliegue en AWS
  - El template detallará el despliegue de una instancia EC2 Linux y su despliegue de código php
  - El template detallará el despliegue de un NAT Instances
  - El template detallará el despliegue de una base de datos RDS MySQL y carga de datos a través de un cliente MySQL
  - El template detallará la generación del usuario y contraseña de la base de datos RDS a través de Secrets Manager
  - El template detallará la configuración de System Manager - Session Manager en la instancia Linux Web Server


<br>

<img src=Reto08.png>

<br>

**2. Principales Servicios/features usados**

  - CloudFormation Template
  - CloudFormation Stack
  - CloudFormation - Integración RDS y Secrets Manager
  - Terraform
  - Secrets Manager
  - System Manager - Session Manager



<br>

**3. Entregables**

<br>

a. Desplegar los recursos en AWS desde CloudFormation y Terraform, los usuarios deberán consultar la IP Pública de las instancias “EC2 Linux” y las páginas "index.php" y "Coffee.php". Ejemplo:

    http://20.35.48.129/index.php
    http://20.35.48.129/Coffee.php

b. Templates de CloudFormation y Terraform
c. Acceso a la instancia EC2 usando System Manager - Session Manager

<br>

**4. Recomendaciones técnicas al desplegar**

<br>

**Networking:**

 - Crear VPC
 - Crear Subnets Públicas y Privadas
 - Crear Route Table Público y Privado
 - Crear NAT Instances t2.micro (Community AMI)
 - Configurar NAT Instances

**Base de datos:**

 - Crear Subnet Group para RDS
 - Crear RDS MySQL

**Cómputo:**

 - Crear instancias "EC2 Linux"
 - Levantar el servicio “Web Coffee” usando el código del repositorio.
 - Configurar la integración entre “EC2 Linux” y “RDS” ( /var/www/html/Model/Credentials.php)
 - Desde la instacia "EC2 Linux" instalar el cliente MySQL y cargar los registros base al RDS. 

**Conexión Remota:**

 - Para que sea posible la conexión vía "System Manager - Session Manager" se debe configurar 3 cosas: a) La instancia debe contar con el agente de System Manager (las instancias Ubuntu vienen con este agente por defecto), b) El Security Group deberá tener salida al protocolo HTTPS, c) La instancia deberá tener salida a internet.

<br>

**5. Consideraciones de Seguridad**

**A nivel de red:**

 - Configurar privilegios mínimos en los respectivos security groups (EC2 Linux y RDS). Considerar filtros por sg-id no por CIDR.
 - Configurar correctamente el ruteo en las subnets privadas (a través del NAT Instances) y las subnets públicas (a través del Internet Gateway)
 - Desplegar la instancia RDS en una red privada
 - Exponer los puertos HTTP y HTTPS en el NAT Instances a través del security group

 **A nivel de aplicación:**

 - No exponer el protocolo SSH a los administradores (MyIP) para conectarse a las instancias. En su lugar usar, System Manager - Session Manager
 - Cifrar los discos EBS con llaves KMS gestionadas por aws (kms/ebs) 
 
**CloudFormation:**
 - No redactar credenciales en "duro" en los Templates. Evitar exponer secretos
 - No redactar el usuario y contraseña de la base de datos en los Template. Hacer uso de Secrets Manager
 - Permisos mínimos en las políticas generadas desde la plantilla de CloudFormation
 - Habilitar CloudTrail para auditar las APIs de AWS con las que CloudFormation interactua *(Implementación opcional)*
 - Usar otras herramientas para el escaneo de configuraciones incorrectas, por ejemplo Checkov (https://www.checkov.io/) *(Implementación opcional)*


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

