# AWS Challenge

## Challenge 05

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Apagado automático de un NAT Instances usando Event Bridge (Schedule) y funciones Lambda
  - Instalación del engine docker en una instancia EC2
  - La aplicación dockerizada se integrará a una base de datos RDS MySQL
  - Montar un sistema archivo EFS en una instancia EC2
  - Despliegue de un balanceador de aplicaciones (ALB) y un target group
  - Creación de certificado SSL/TLS usando Certificate Manager a través de CNAME
  - Creación de registros en HostZone Públicos de Route53

<br>

<img src=Reto05.png>

<br>

b. Dockerizar la aplicación “Web Coffee" y desplegarla en la instancia EC2

<br>

**2. Principales Servicios/features usados**

  - Docker & Docker Hub en EC2
  - Funciones Lambda
  - Event Bridge (CloudWatch Events)
  - EFS (Elastic File System)

<br>

**3. Entregables**

<br>

**App**

a. Software funcionando al configurar correctamente Route53, Certificate Manager, ALB (rules y Target Group) y EC2 (Docker), en: 
    https://docker.PUBLIC_DNS_ROUTE53/index.php

b. Software funcionando al integrar correctamente Route53, Certificate Manager, ALB (rules y Target Group), EC2 (Docker) y RDS, en:
    https://docker.PUBLIC_DNS_ROUTE53/Coffee.php

c. Docker Image almacenada en Docker Hub
d. Dockerfile o Docker Compose

<br>

**4. Detalle de Configuración**

**4.1. ALB Listener Rules**

|      Ruta       |  Ruta Destino en APP  |
|-----------------|-----------------------|
|       HTTP      | HTTPS (redirect 443)  |
|         /*      |     Target Group      |

<br>

**4.2. Event Bridge**

|      Horario     |      Actividad       |              |
|------------------|----------------------|
| 7:00 AM (UTC-5)  |  NAT Instances Start |
| 11:00 PM (UTC-5) |  NAT Instances Stop  |

<br>
<br>

**5. Recomendaciones técnicas al desplegar**

<br>

**Base de datos:**

 - Crear Subnet Group para RDS
 - Crear RDS MySQL


**App (Docker):**

 - Crear el DockerFile/Docker Compose respectivo para la aplicación WebCoffee
 - Generar imagen Docker
 - Push de imágenes a Docker Hub
 - Crear VPC
 - Crear Subnet Públicas y Privadas
 - Crear NAT Instances
 - Crear EC2 Instance (Ubuntu 18) en una de las subnets privadas
 - Instalar Docker en EC2
 - Creación de EFS
 - Creación de Puntos de Montaje EFS (/log)
 - Montar EFS en EC2 Instance
 - Crear y encender containers (Web Coffee) usando los puntos de montaje de EFS. Considerar pasar como variable el DNS Endpoint del RDS MySQL en la creación del WebCoffee Container. Exponer puerto 80.
 - Testear la configuración docker realizada
 - Crear un Target Group (Instances Type)
 - Crear ALB (Application Load Balancer)
 - Crear Certificate Manager
 - Asociar Certificate Manager a Route53 (CNAME)
 - Asociar Certificate Manager al ALB (alias)
 - Asociar ALB a Route53
 - Configurar reglas en ALB (Rules) según lo solicitado (redireccionamiento HTTP a HTTPS)
 - Testear desde el DNS Público del ALB las páginas "index.php" y "Coffee.php" de APP A


**Encendido/Apagado Automático**

 - Identificación de NAT Instances
 - Creación de Lambda Function. Se recomienda el uso del run time python
 - Test Lambda Function
 - Creación de Rules en Event Bridge
 - Test de Event Bridge según horario


<br>

**6. Consideraciones de Seguridad**


**A nivel de red:**

 - Configurar privilegios mínimos en los respectivos security groups (EC2 Linux, ALB, RDS). Considerar filtros por sg-id y no por CIDR.
 - Configurar correctamente el ruteo en las subnets privadas (a través del NAT Instances) y las subnets públicas (a través del Internet Gateway)
 - Desplegar la instancia RDS en una red privada
 - Desplegar la instancia EC2 en una subnet privada
 - Exponer los puertos HTTP y HTTPS en el NAT Instances a través del security group

 **A nivel de aplicación:**

 - Exponer sólo el puerto HTTP de los EC2 Linux al Security Group del ALB
 - No exponer el protocolo SSH a los administradores (MyIP) para conectarse a las instancias. En su lugar usar, System Manager - Session Manager
 - Instalar el agente Unificado de CloudWatch (JSON) en cada instancia con el objetivo de obtener métricas personalizadas (memoria y espacio en disco) y los logs del sistema operativo o de la aplicación. Configurar correctamente el wizard. *Se recomienda dejar todo por defecto para no incurrir en costos extras*
 - Hardenizar las AMIs generadas
 - Cifrar los discos EBS con llaves KMS gestionadas por aws (kms/ebs) 
 
**A nivel de ALB:**

 - Exponer sólo el puerto HTTPS en el Security Group
 - Habilitar sólo un Listener Rule para HTTPS:443
 - Generar un certificado SSL/TLS a través de validación DNS (no email) y asociarlo al balanceador
 - Configurar reglas de redireccionamiento HTTP a HTTPS en el balanceador

**A nivel de Route53:**
 - Configurar los registros del Host Zone Público de Route53 con el tipo ALIAS o CNAME (se prefiere el uso de ALIAS sobre CNAME)

**A nivel de EFS**
 - Exponer sólo el puerto 2049 a la instancia EC2. Considerar filtros por sg-id y no por CIDR en el Security Group.
 - Personalizar permisos en la política asociada al File System EFS

**A nivel de Lambda**
 - Configurar permisos mínimos en el IAM Role asociado
 - Implementar buenas prácticas en el desarrollo del código python
 - No colocar en código o en variables de entorno datos sensibles. Usar los servicios de "System Manager - Parameter Store" o "Secrets Managers" para almacenar estos valores. 

**A nivel de Event Bridge**
 -  Configurar permisos mínimos en el IAM Role asociado

<br>

<br>

# Considerando los siguintes comandos, dockerizar "Coffee Website"

El folder "help-me" de este laboratorio en GitHub contiene la resolución (archivos "Dockerfile" y "docker-entrypoint.sh") de una de las tantas maneras de como dockerizar esta aplicación. Revisa el contenido, si y sólo si no encuentras la manera de como dockerizar esta aplicación.

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
 - Validar la carga de la página "index.php"

<br>

**6. Validación Coffee.php**

 - Validar la carga de la página"Coffee.php"
 - Esta página se visualizará cuando la integración entre EC2 Instances (Docker) y RDS esté realizado


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
 - mysql -u $USUARIO_RDS -h $ENDPOINT_RDS -p
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

<br>

## Integración ALB y EC2

<br>

**1. Validación index.php**

 - Validar la carga de la página index.php desde: "http://PUBLIC_DNS_ALB/index.php"
 - Después de la integración del ALB con Certificate Manager y Route53, validar la carga de la página index.php desde: "https://PUBLIC_DNS_ROUTE/index.php"

<br>

**2. Validación Coffee.php**

 - Validar la carga de la página Coffee.php desde: "http://PUBLIC_DNS_ALB/Coffee.php"
 - Después de la integración del ALB con Certificate Manager y Route53, validar la carga de la página index.php desde: "https://PUBLIC_DNS_ROUTE/Coffee.php"
 - Esta página se visualizará cuando la integración entre EC2 Instances (Docker) y RDS esté realizado

<br>