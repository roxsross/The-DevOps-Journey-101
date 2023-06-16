# AWS Challenge

## Challenge 07

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Desplegar un cluster de ECS-EC2 y aprovisionar un Servicio de un Task Definition (Backend)
  - Despliegue de un balanceador de aplicaciones (ALB) y un target group
  - Creación de certificados SSL/TLS usando Certificate Manager
  - Creación de registros en HostZone Públicos de Route53
  - Desplegar un bucket S3 (Frontend)
  - Desplegar una distribución CloudFront y una configuración OAI (Origin Access Identity) hacia S3
  - Desplegar una RDS (Base de Datos)

<br>

<img src=Reto07.png>

<br>

b. Dockerizar la aplicación “CRUD" y desplegarla en la instancia ECS-EC2

<br>

**2. Principales Servicios/features usados**

  - S3
  - CloudFront

<br>

**3. Entregables**

<br>

**3.1. App**

a. Software funcionando al configurar correctamente Route53, CloudFront, S3, Certificate Manager, ALB (rules y Target Group), ECR y ECS-EC2 (Docker), en: 
    https://cloudfront.PUBLIC_DNS_ROUTE53/index.php

b. Software funcionando al integrar correctamente Route53, CloudFront, S3, Certificate Manager, ALB (rules y Target Group), ECR, EC2-ECS (Docker) y RDS, en:
    https://cloudfront.PUBLIC_DNS_ROUTE53/Coffee.php

c. Docker Image almacenada en ECR
d. Dockerfile o Docker Compose

<br>

**4. Detalle de Configuración**

**4.1. ALB Listener Rules**

|      Ruta       |  Ruta Destino en APP  |
|-----------------|-----------------------|
|       HTTP      | HTTPS (redirect 443)  |
|         /*      |     Target Group      |


<br>

**5. Recomendaciones técnicas al desplegar**

<br>

**Base de datos:**

 - Crear Subnet Group para RDS
 - Crear RDS MySQL
 - Crear esquema 


**Backend (Docker):**

 - Crear el DockerFile/Docker Compose respectivo para la aplicación CRUD
 - Generar imagen Docker
 - Push de imágenes a ECR
 - Crear VPC
 - Crear Subnet Públicas y Privadas
 - Crear NAT Instances
 - Creación del Cluster de ECS-EC2
 - Creación del Task Definition para CRUD
 - Crear un Target Group (Instances Type)
 - Crear ALB (Application Load Balancer)
 - Desplegar el container usando ECS Services. Crear ECS Services desde el Task Definition anterior.
 - Testear la aplicación desplegada ingresando a la instancia EC2.  
 - Crear Certificate Manager usando CNAME en Route53
 - Asociar Certificate Manager al ALB (alias)
 - Asociar ALB a Route53 (Registro ALIAS)
 - Configurar reglas en ALB (Rules) según lo solicitado (redireccionamiento HTTP a HTTPS)
 - Testear desde el DNS Público del ALB las páginas "index.php" y "Coffee.php" de APP A


**Frontend (CloudFront y S3)**

 - Compilar código de frontend. El archivo axios.js (archivo de configuración) tendrá el valor del Subdominio registrado en Route53 del ALB
 - Copiar contenido del folder /build a S3
 - Crear una distribución CloudFront con origen S3
 - En CloudFront, habilitar OAI (Origin Access Identity)
 - Asignar un dominio personalizado y un Certificate Manager a la distribución CloudFront
 - Desde Route53, asignar un registro ALIAS hacía CloudFront


<br>

**6. Consideraciones de Seguridad**


**A nivel de red:**

 - Configurar privilegios mínimos en los respectivos security groups (ECS-EC2, ALB, RDS). Considerar filtros por sg-id y no por CIDR.
 - Configurar correctamente el ruteo en las subnets privadas (a través del NAT Instances) y las subnets públicas (a través del Internet Gateway)
 - Desplegar la instancia RDS en una red privada
 - Desplegar el cluster ECS-EC2 en una subnet privada
 - Exponer los puertos HTTP y HTTPS en el NAT Instances a través del security group

 **A nivel de aplicación (ECS-EC2):**

 - Exponer sólo el puerto HTTP del ECS-EC2 al Security Group del ALB
 - Cifrar los discos EBS con llaves KMS gestionadas por aws (kms/ebs) *(Opcional de implementación)*
 - Configuración de permisos mínimos en los roles "ECS Task Role" y "ECS Task Execution Role"
 - Construir imágenes de contenedores seguros *(Opcional de implementación)*
 - Implementar secretos en el servicio de Secrets Manager a través del uso de las variables/parámetros en ECS

**A nivel de ALB:**

 - Exponer sólo el puerto HTTPS en el Security Group
 - Habilitar sólo un Listener Rule para HTTPS:443
 - Generar un certificado SSL/TLS a través de validación DNS (no email) y asociarlo al balanceador
 - Configurar reglas de redireccionamiento HTTP a HTTPS en el balanceador

**A nivel de Route53:**

 - Configurar los registros del Host Zone Público de Route53 con el tipo ALIAS o CNAME (se prefiere el uso de ALIAS sobre CNAME)

**A nivel de Repositorio Docker (ECR)**

 - Habilitar el escaneo automático
 - Cifrado de la imagen ECR. *Usar cifrado por defecto para no incurrir en costos*
 - Habilitar "Tag immutability"

**A nivel de bucket S3**

 - No habilitar "Static WebSite Hosting"
 - No deshabilitar los permisos "Block Public Access"
 - No habilitar políticas "s3:GetObject" en S3
 - Habilitar cifrado en tránsito y reposo

**A nivel de la distribución CloudFront**

 - Configurar cifrado en tránsito
 - Habilitar OAI (Origen Access Identity) durante la integración con S3
 - Configurar Geo restricciones
 - Agregar "Custom Headers" en CloudFront y ALB *(Opcional de Implementación)*


<br>

<br>

# Considerando los siguintes comandos, dockerizar "CRUD App"

## Instalación de la Aplicación y Base de datos en "CRUD App" (Ubuntu 18.04)

<br>

**1. Instalación de la aplicación**

```bash
sudo su
sudo apt-get update
sudo apt-get install awscli -y
aws --version
```

<br>

**2. Descarga del proyecto e Instalación de NodeJS**

```bash
cd /opt
git clone https://github.com/jbarreto7991/aws-challenge.git
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs -y
node --version
npm --version
```

<br>

**3. Personalización de archivos de configuración y construcción del Frontend**

```bash
#Obteniendo IP Pública de la instancia EC2 y almacenarla como variable
PUBLIC_IP=$(curl http://169.254.169.254/latest/meta-data/public-ipv4)
echo $PUBLIC_IP

#Reemplazando parámetro en archivo de configuración de la carpeta frontend del proyecto
sed 's+http://$PUBLIC_IP/v1+http://'"$PUBLIC_IP"'/v1+g' /opt/aws-challenge/crud-app/frontend/src/config/axios.js >> /opt/aws-challenge/crud-app/frontend/src/config/bk_axios.js
rm /opt/aws-challenge/crud-app/frontend/src/config/axios.js
mv /opt/aws-challenge/crud-app/frontend/src/config/bk_axios.js /opt/aws-challenge/crud-app/frontend/src/config/axios.js
cat /opt/aws-challenge/crud-app/frontend/src/config/axios.js

#Compilar Frontend
cd /opt/aws-challenge/crud-app/frontend
npm install
npm run build
```

<br>

**4. Carga del Frontend a S3**

```bash
#Carga del Frontend a un bucket S3
cd /opt/aws-challenge/crud-app/frontend/build/
BUCKET=$(aws s3 ls | sort -r | awk 'NR ==1 { print $3 }')
echo $BUCKET
aws s3 sync . s3://$BUCKET
```

<br>

**5. Creación de base de datos y carga de esquema en la base de datos**

```bash
#Instalación Servidor MySQL (actuará como un cliente MySQL)

sudo apt-get update
sudo apt-get install mysql-server -y
sudo service mysql status

#Crear archivo que contiene usuario, contraseña y endpoint del RDS. Tiene por objetivo automatizar la creación de los recursos en la instancia RDS. Estos valores son obtenidos durante la creación del RDS en AWS. Reemplazar el valor $USER, $PASSWORD y $RDS_HOST

touch /opt/mysql_access
chmod 400 /opt/mysql_access
echo "[client]" >> /opt/mysql_access
echo "user=$USER" >> /opt/mysql_access
echo "password=$PASSWORD" >> /opt/mysql_access
echo "host=$RDS_HOST" >> /opt/mysql_access

#Creación de la tabla "task" para el uso de la aplicación
mysql --defaults-extra-file=/opt/mysql_access --batch << "EOF"
create database test;
use test;
CREATE TABLE tasks
(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY (id)
);
quit
EOF
```

<br>

**6. Instalación e iniciación del servicio backend**

```bash
#Instalación del Backend
cd /opt/aws-challenge/crud-app/backend/
nano .env
#[El archivo .env incluye la cadena de conexión hacía la BD. Personalizar estos valores]

#Inicialización del servicio backend
npm install
npm start &
```

<br>
