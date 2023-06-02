# AWS Challenge

## Challenge 04

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Despliegue de un balanceador de aplicaciones (ALB) con dos target groups.  - Despliegue de dos aplicaciones (APP A y APP B), cada una de estas se asociará a un target group distinto.
  - Instalación del agente unificado CloudWatch para EC2 AutoScaling Group en APP B
  - Configuración de AutoScaling Group basado en métricas de CPU y una configuración de Min: 2, Max: 5 para APP B
  - Configuración con EC2 AutoScaling Group y una configuración de Min: 1, Max: 1 en NAT Instances. Cada nuevo ID del NAT Instances se deberá registrar automáticamente en el Route Table respectivo, al escalar la instancia 
  - Creación de certificado SSL/TLS usando Certificate Manager a través de CNAME
  - Creación de registros en HostZone Públicos de Route53
  - Configuración de alarmas en CloudWatch Alarm basadas en consumo de CPU, de memoria y espacio en disco para APP B
  - Envío de notificaciones usando SNS al superar el umbral de una alarma.
  - Actualización de la aplicación APP B (version 2) y despliegue en EC2 AutoScaling Group

<br>

<img src=Reto04.png>

<br>

b. Desplegar la aplicación “Web Coffee" en cada instancia "EC2 Linux"

<br>

**2. Principales Servicios/features usados**

  - Application Load Balanacer (ALB) y Listener Rules (Redirect)
  - Launch Template/ Launch Configuration
  - EC2 AutoScaling Group
  - Route53 (Hosted Zone - DNS)
  - Certificate Manager
  - NAT Instances

<br>

**3. Entregables**

<br>

**App**

a. Los usuarios deberán consultar el DNS del servicio Route53 y las siguientes páginas:

    https://appa.PUBLIC_DNS_ROUTE53/index.php
    https://appa.PUBLIC_DNS_ROUTE53/Coffee.php
    https://appb.PUBLIC_DNS_ROUTE53/index.php
    https://appb.PUBLIC_DNS_ROUTE53/Coffee.php    


b. Correcta configuración en las reglas de direccionamiento del balanceador de aplicaciones (ALB - Listener Rules - Redirect). Si el usuario consulta las direcciones en "http", estas deberán ser redireccionadas a "https".

<br>

**Escalamiento**

c. Prueba de estrés sobre instancia configurada con EC2 Autoscaling. Se deberá comprobar el cumplimiento del “Dynamic Scaling Policies” (Policy Type: Step Scaling)

| Alarm |           Detalle            |
|-------|------------------------------|
|  CPU  |  <30%, remove 1 Instances    |
|  CPU  |  >70% & <80, add 1 Instances |
|  CPU  |  >80% & <90, add 1 Instances |
|  CPU  |  >90, add 1 Instances        |


<br>


**4. Detalle de Configuración**

**4.1. ALB Listener Rules**

|      Ruta       |  Ruta Destino en APP  |
|-----------------|-----------------------|
|       HTTP      | HTTPS (redirect 443)  |
| Hostname APP A  |  Target Group APP A   |
| Hostname APP B  |  Target Group APP B   |


<br>

**4.2. CloudWatch Alarm**

|   Alarm   |            Detalle              |
|-----------|---------------------------------|
| APP A CPU |  >70% CPU de la instancia APP A |
| APP B CPU |  >70% CPU de la instancia APP B |

<br>
<br>

**5. Recomendaciones técnicas al desplegar**

<br>

**Networking:**

 - Crear VPC
 - Crear Subnets Públicas y Privadas
 - Crear NAT Instances t2.micro (Community AMI)
 - Configurar NAT Instances (“Change source/destination check”)

**Base de datos:**

 - Crear Subnet Group para RDS
 - Crear RDS MySQL

**Cómputo:**

 - Crear instancias "EC2 Linux"
 - Levantar el servicio “Web Coffee” usando el código del repositorio. 
 - La instancia "EC2 Linux APP A" escuchará tráfico HTTP en el puerto 80
 - La instancia "EC2 Linux APP B" escuchará tráfico HTTP en el puerto 80
 - Configurar la integración entre “EC2 Linux” y “RDS” ( /var/www/html/Model/Credentials.php)
 - Desde una instacia "EC2 Linux" instalar el cliente MySQL y cargar los registros base al RDS. 
 - Modificar elementos visuales de las páginas "index.php" y "Coffee.php", en cada "EC2 Linux", para tener páginas web distintas (APP A y APP B)
 - Finalizada la implementación, realizar un cambio sobre la aplicación APP B. Reflejar este cambio en el EC2 AutoScaling Group

**Conexión Remota:**

 - Para que sea posible la conexión vía "System Manager - Session Manager" se debe configurar 3 cosas: a) La instancia debe contar con el agente de System Manager (las instancias Ubuntu vienen con este agente por defecto), b) El Security Group deberá tener salida al protocolo HTTPS, c) La instancia deberá tener salida a internet.

**Balanceador de Carga:**

 - Crear 02 Target Group, uno para "APP A" y otro para "APP B"
 - Asociar "APP A" a uno de los Targets Groups creados previamente
 - Crear el balanceador de aplicaciones (ALB)
 - Testear desde el DNS Público del ALB las páginas "index.php" y "Coffee.php" de APP A

**AutoScaling NAT Instances:**

 - Obtener AMI de NAT Instances.
 - Generar UserData (Script Linux) que permita obtener el nuevo ID de NAT Instances (Cada vez que el AutoScaling se active) y este se registre en el Route Table respectivo usando AWSCLI. Considerar que antes de obtener la AMI, el NAT Instances deberá tener instalado AWSCLI
 - Configurar Launch Template o Launch Configuration para APP B
 - Configurar EC2 AutoScaling Group para NAT Instances

**AutoScaling APP:**

 - Obtener AMI de APP B
 - Configurar Launch Template o Launch Configuration para APP B
 - Configurar EC2 AutoScaling Group para APP B

**Certificado y Dominio:**

 - Crear un certificado SSL/TLS desde Certificate Manager vía DNS (CNAME)
 - Registrar CNAMEs previamente generados en Route53
 - Configurar registros HostZone Públicos en Route53 (tipo CNAME o ALIAS) y asociarlo al ALB
 - Configurar reglas de redireccionamiento (Listener Rules) en ALB, según lo detallado en 4.1 

**Monitoreo**

 - Instalar el "Agente Unificado CloudWatch" en APP B. Considerar la configuración de AutoScaling durante el proceso de instalación.
 - Configurar el "Agente Unificado CloudWatch" para recolectar métricas de memoria y Espacio en disco en cada instancia APP B
 - Configurar el "Agente Unificado CloudWatch" para recolectar logs de apache2 (/var/log/apache2/access.log) en cada instancia APP B
 - Validar que los logs se visualizan en CloudWatch Logs. Cuando el APP B escale, validar que se muestre el log respectivo de cada instancia APP B.
 - Validar que las métricas personalizadas se visualizan en CloudWatch Metrics, a través de un nuevo Custom NameSpace para APP B (AutoScaling)
 - Crear alarma CPU a través de CloudWatch Alarm para APP B. Hacer uso de la aplicación "stress" en Linux para saturar el CPU y validar que escale la aplicación APP B.

 **Notificación**

 - Crear Tópico SNS
 - Crear Subscripción “Tipo Email” en el Tópico SNS
 - Asociar Tópico SNS creado en las alarmas CloudWatch


<br>

**6. Consideraciones de Seguridad**


**A nivel de red:**

 - Configurar privilegios mínimos en los respectivos security groups (EC2 Linux, ALB, RDS). Considerar filtros por sg-id no por CIDR.
 - Configurar correctamente el ruteo en las subnets privadas (a través del NAT Instances) y las subnets públicas (a través del Internet Gateway)
 - Desplegar la instancia RDS en una red privada
 - Desplegar las instancias EC2 en redes privadas. Cada uno en una AZ distinta
 - Exponer los puertos HTTP y HTTPS en el NAT Instances
 - Habilitar los campos por defecto de VPC Flow Logs en la VPC. Usar los query SQL de Athena para consultar datos sobre el tráfico en la red.

 **A nivel de aplicación:**

 - Exponer sólo el puerto HTTP de los EC2 Linux al Security Group del ALB
 - No exponer el protocolo SSH a los administradores (MyIP) para conectarse a las instancias. En su lugar usar, System Manager - Session Manager
 - Cifrar los discos EBS con llaves KMS gestionadas por aws (kms/ebs) 
 - Hardenizar las AMIs generadas
 - Instalar el agente Unificado de CloudWatch (JSON) en cada instancia con el objetivo de obtener métricas personalizadas (memoria y espacio en disco) y los logs del sistema operativo o de la aplicación. Configurar correctamente el wizard. *Se recomienda dejar todo por defecto para no incurrir en costos extras*

**A nivel de EC2AutoScaling Group:**
 - Crear un VPC Endpoint Interface para Amazon EC2 AutoScaling (*No usar debido a que se incurre en costos*) 
 - Cifrar los discos EBS con llaves KMS gestionadas por aws (kms/ebs) 
 - Hardenizar las AMIs generadas
 - Instalar el agente Unificado de CloudWatch (JSON) en cada instancia con el objetivo de obtener métricas personalizadas (memoria y espacio en disco) y los logs del sistema operativo o de la aplicación. Configurar correctamente el wizard. *Se recomienda dejar todo por defecto para no incurrir en costos extras*
 - No exponer el protocolo SSH a los administradores (MyIP) para conectarse a las instancias. En su lugar usar, System Manager - Session Manager
 - Exponer sólo el puerto HTTP de los EC2 Linux al Security Group del ALB

**A nivel de AutoScaling:**
 - Para el APP, seleccionar redes privadas para las instancias que se crearán con el proceso de AutoScaling
 - Para el caso de NAT Instances, velar que el código detallado en el UserData no exponga data sensible
 - Centralizar los logs de aplicaciones y del Sistema Operativo en CloudWatch Logs, para su tratamiento futuro

**A nivel de ALB:**

 - Exponer sólo el puerto HTTPS en el Security Group
 - Habilitar sólo un Listener Rule para HTTPS:443
 - Generar un certificado SSL/TLS a través de validación DNS (no email) y asociarlo al balanceador
 - Configurar reglas de redireccionamiento HTTP a HTTPS en el balanceador

**A nivel de Route53:**
 - Configurar los registros del Host Zone Público de Route53 con el tipo ALIAS o CNAME (se prefiere el uso de ALIAS sobre CNAME)


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

**4. Configuración apache (APP A y APP B)**

```bash
chmod 777 /etc/php/7.2/apache2/php.ini
sed 's+;extension=mysqli+extension=mysqli+g' /etc/php/7.2/apache2/php.ini >> /etc/php/7.2/apache2/bk_php.ini
rm /etc/php/7.2/apache2/php.ini
mv /etc/php/7.2/apache2/bk_php.ini /etc/php/7.2/apache2/php.ini
sudo /etc/init.d/apache2 restart
```

<br>

**5. Validación index.php (APP A y APP B)**

 - Desde una instancia ubicada dentro de la red, validar la carga de la página "index.php"

```bash
curl http://PRIVATE_IP/index.php
```

<br>

**6. Validación Coffee.php (APP A y APP B)**

 - Desde una instancia ubicada dentro de la red, validar la carga de la página "Coffee.php"
 - Esta página se visualizará cuando la integración entre EC2 y RDS esté realizado

```bash
curl http://PRIVATE_IP/Coffee.php
```


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

<br>

**2. Validación Coffee.php**

 - Validar la carga de la página Coffee.php desde: "http://PUBLIC_DNS_ALB/Coffee.php"
 - Esta página se visualizará cuando la integración entre EC2 y RDS esté realizado

<br>


## Load Testing EC2

```bash
apt-get install stress
stress --cpu 8 --timeout 300
```
