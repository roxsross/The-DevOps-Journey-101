# AWS Challenge

## Challenge 03

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Despliegue de un balanceador de aplicaciones (ALB) con dos target groups
  - Configuración de VPC Flow Logs a nivel de VPC
  - Uso del servicio de analítica "Athena" para hacer consultas SQL sobre los logs de VPC Flow Logs
  - Creación de un bucket S3
  - Instalación del agente unificado CloudWatch
  - Almacenamiento de los logs de aplicaciones apache en CloudWatch Logs
  - Configuración de alarmas en CloudWatch Alarm basadas en consumo de CPU, de memoria y espacio en disco
  - Generación de dashboard de seguimiento a través de CloudWatch Dashboard
  - Envío de notificaciones usando SNS al superar el umbral de una alarma.

<br>

<img src=Reto03.png>

<br>

b. Desplegar la aplicación “Web Coffee" en cada instancia "EC2 Linux"

<br>

**2. Principales Servicios/features usados**

  - Application Load Balanacer (ALB), Target Groups y Listener Rules
  - VPC Flow Logs
  - S3
  - Athena
  - Agent Unificado CloudWatch
  - CloudWatch Logs
  - CloudWatch Alarm
  - CloudWatch Dashboard
  - SNS

<br>

**3. Entregables**

<br>

**App**

a. Los usuarios deberán consultar el DNS Público del balanceador de aplicaciones (ALB) y las siguientes páginas:

    http://PUBLIC_DNS_ALB/appa/index.php
    http://PUBLIC_DNS_ALB/appa/Coffee.php
    http://PUBLIC_DNS_ALB/appb/index.php
    http://PUBLIC_DNS_ALB/appb/Coffee.php    


b. Correcta configuración en las reglas de direccionamiento del balanceador de aplicaciones (ALB - Listener Rules)

<br>

**Monitoreo & Notificación**

c. Visualización de los logs de apache en CloudWatch Logs
d. Visualización de dashboard de CPU, Memoria y Espacio en Disco en CloudWatch Dashboard
e. Visualización de correo SNS recibido por alarma


<br>

**Analítica**

f. Elaborar un reporte que identifice la cantidad de veces que una determina ip (pública o privada) a consumido nuestra aplicación. Evidenciar el query realizado. 

<br>

**4. Detalle de Configuración**

**4.1. ALB Listener Rules**

|      Ruta       |        Ruta Destino en APP        |
|-----------------|-----------------------------------|
| PUBLIC_DNS_ALB/ |  Contenido de index.php de APP A  |
| DNS_ALB/appa/   |  Contenido de index.php de APP A  |
| DNS_ALB/appb/   |  Contenido de index.php de APP B  |


<br>

**4.2. CloudWatch Logs**

| Log Stream  |   Ruta Destino en APP   |
|-------------|-------------------------|
|    appa     |  Logs de APP A (apache2)|
|    appb     |  Logs de APP B (apache2)|


 - Considerar los logs de apache2 (/var/log/apache2/access.log)
 - Cada instancia APP debe pertenecer a un Log Stream distinto

<br>

**4.3. CloudWatch Alarm**

|   Alarm   |            Detalle              |
|-----------|---------------------------------|
| APP A CPU |  >70% CPU de la instancia APP A |
| APP B CPU |  >70% CPU de la instancia APP B |

<br>

**4.4. CloudWatch Dashboard**

|      Dashboard     |                        Detalle                       |
|--------------------|------------------------------------------------------|
|         CPU        |       Mostrar métrica de CPU de APP A y APP B        | 
|       Memoria      |     Mostrar métrica de Memoria de APP A y APP B      |
|  Espacio en Disco  | Mostrar métrica de Espacio en Disco de APP A y APP B |


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
 - La instancia "EC2 Linux APP A" escuchará tráfico HTTP en el puerto 8081
 - La instancia "EC2 Linux APP B" escuchará tráfico HTTP en el puerto 8082
 - Configurar la integración entre “EC2 Linux” y “RDS” ( /var/www/html/Model/Credentials.php)
 - Desde una instacia "EC2 Linux" instalar el cliente MySQL y cargar los registros base al RDS. 
 - Modificar elementos visuales de las páginas "index.php" y "Coffee.php", en cada "EC2 Linux", para tener páginas web distintas

**Conexión Remota:**

 - Para que sea posible la conexión vía "System Manager - Session Manager" se debe configurar 3 cosas: a) La instancia debe contar con el agente de System Manager (las instancias Ubuntu vienen con este agente por defecto), b) El Security Group deberá tener salida al protocolo HTTPS, c) La instancia deberá tener salida a internet.

**Balanceador de Carga:**

 - Crear 02 Target Group, uno para "APP A" y otro para "APP B"
 - Asociar cada instancia "EC2 Linux" a cada Target Group creado previamente
 - Crear el balanceador de aplicaciones (ALB)
 - Testear desde el DNS Público del ALB las páginas "index.php" y "Coffee.php". Se deberá observar dos páginas de contenido distinto en "index.php" y "Coffee.php".
 - Configurar reglas de redirección según lo detallado en el punto 4.1.

**Monitoreo**

 - Instalar el "Agente Unificado CloudWatch" en cada instancia APP (A y B)
 - Configurar el "Agente Unificado CloudWatch" para recolectar métricas de memoria y Espacio en disco en cada instancia APP (A y B)
 - Configurar el "Agente Unificado CloudWatch" para recolectar logs de apache2 (/var/log/apache2/access.log) en cada instancia APP (A y B)
 - Validar que los logs se visualizan en CloudWatch Logs
 - Validar que las métricas personalizadas se visualizan en CloudWatch Metrics, a través de un nuevo Custom NameSpace
 - Crear dos alarma CPU a través de CloudWatch Alarm (uno por cada instancia APP). Hacer uso de la aplicación "stress" en Linux para saturar el CPU
 - Crear dos alarmas personalizadas de memoria y dos alarmas personalizadas de espacio en disco a través de CloudWatch Alarm (uno por cada instancia APP)
 - Crear un Dashboard a través de CloudWatch Dashboard (considerando las métricas de CPU, memoria y Espacio en Disco por cada instancia APP)

 **Notificación**

 - Crear Tópico SNS
 - Crear Subscripción “Tipo Email” en el Tópico SNS
 - Asociar Tópico SNS creado en las alarmas CloudWatch

 **Analítica**

  - Crear bucket S3 destino
  - Configurar VPC Flow Logs a nivel de VPC. Considerar valores por defecto. Seleccionar como destino el bucket S3 creado previamente
  - Personalizar el query Athena de creación de tabla, según el origen S3 creado previamente
  - Elaborar un query personalizado (reporte), que consulte los logs de vpcflowlogs desde Athena, que tenga por objetivo identificar la cantidad de veces que una determina ip (pública o privada) a consumido nuestra aplicación. 

<br>

```bash
#Query en Athena para creación de tabla "vpcflowlog"

CREATE EXTERNAL TABLE IF NOT EXISTS vpcflowlog (
version string, 
account_id string, 
interface_id string, 
srcaddr string, 
dstaddr string, 
srcport int,
dstport int,
protocol int,
packets int,
bytes int,
start_time string,
end_time string,
action string,
log_status string 
  ) 
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'
WITH SERDEPROPERTIES (
'serialization.format' = ' ',
'field.delim' = ' '
)
LOCATION 's3://{bucket_name}/AWSLogs/';
```

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
 - Instalar el agente Unificado de CloudWatch (JSON) en cada instancia con el objetivo de obtener métricas personalizadas (memoria y espacio en disco) y los logs del sistema operativo o de la aplicación. Configurar correctamente el wizard. *Se recomienda dejar todo por defecto para no incurrir en costos extras*
 - Hardenizar las AMIs generadas
 - Centralizar los logs de aplicaciones y del Sistema Operativo en CloudWatch Logs, para su tratamiento futuro
 - Cifrar los discos EBS con llaves KMS gestionadas por aws (kms/ebs) 
 
**A nivel de ALB:**

 - Exponer sólo el puerto HTTP en el Security Group
 - Habilitar sólo un Listener Rule para HTTP:80


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

**3. Personalización de proyectos**

**3.1. EC2 Instances - APP A**

```bash
mkdir /var/www/html/appa
cp -r * /var/www/html/appa
sudo /etc/init.d/apache2 restart
```

**3.2. EC2 Instances - APP B**

```bash
mkdir /var/www/html/appb
cp -r * /var/www/html/appb
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

**5. Modificación de puerto apache2**

**5.1. APP A**

```bash
nano /etc/apache2/ports.conf
#Modificar puerto a 8081
sudo /etc/init.d/apache2 restart
```

**5.2. APP B**

```bash
nano /etc/apache2/ports.conf
#Modificar puerto a 8082
sudo /etc/init.d/apache2 restart
```

**6. Validación index.php (APP A y APP B)**

 - Desde una instancia ubicada dentro de la red, validar la carga de la página "index.php"

```bash
curl http://PRIVATE_IP/appa/index.php
curl http://PRIVATE_IP/appb/index.php
```

<br>

**7. Validación Coffee.php (APP A y APP B)**

 - Desde una instancia ubicada dentro de la red, validar la carga de la página "Coffee.php"
 - Esta página se visualizará cuando la integración entre EC2 y RDS esté realizado

```bash
curl http://PRIVATE_IP/appa/Coffee.php
curl http://PRIVATE_IP/appb/Coffee.php
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

<br>

## Athena

```bash
#Query en Athena para creación de tabla "vpcflowlog"

CREATE EXTERNAL TABLE IF NOT EXISTS vpcflowlog (
version string, 
account_id string, 
interface_id string, 
srcaddr string, 
dstaddr string, 
srcport int,
dstport int,
protocol int,
packets int,
bytes int,
start_time string,
end_time string,
action string,
log_status string 
  ) 
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'
WITH SERDEPROPERTIES (
'serialization.format' = ' ',
'field.delim' = ' '
)
LOCATION 's3://{bucket_name}/AWSLogs/';
```

<br>

```bash
#Query de consulta base

select interface_id,srcaddr,dstaddr,srcport,dstport,protocol,action,log_status 
from vpcflowlog 
where version not in ('version') 
order by interface_id,action,log_status;
```
