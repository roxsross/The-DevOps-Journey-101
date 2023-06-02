# AWS Challenge

## Challenge 10

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Habilitar los registros de CloudTrail
  - Filtrar eventos de API a través de Event Bridge
  - Configuración de un API Gateway
  - Orquestar funciones Lambda a través de Step Functions
  - Hacer uso de funciones Lambda (usando Python3 y boto3)
  - Consumir la API de Amazon Polly desde Lambda
  - Creación de OpenSearch

b. Cada vez que un usuario IAM cree un usuario IAM se deberá almacenar en OpenSearch (ElasticSearch) los valores del usuario creado, fecha de creación y políticas asignadas al usuario

c. En la orquestación del Step Functions, este workflow contendrá dos funciones lambda. El objetivo de la primera función Lambda es parsear el JSON que envía Event Bridge, este parseo obtendrá los valores solicitados (usuario creado, fecha de creación y políticas asignadas al usuario) y almacenará estos valores en OpenSearch (ElasticSearch). La segunda función Lambda tiene por objetivo concatenar los valores anteriormente mencionados y consultar a la API de Polly para obtener un audio de estos valores. Este audio será almacenado en S3 (en modo Static WebSite Hosting)

<br>

<img src=Reto10.png>

<br>

**2. Principales Servicios/features usados**

  - CloudTrail
  - S3
  - Event Bridge
  - API Gateway
  - Step Functions
  - Lambda
  - OpenSearch (ElasticSearch)
  - Polly

<br>

**3. Entregables**

<br>

a. Orquestación en estado "Pass" en AWS Step Function
b. Datos almacenados en OpenSearch (ElasticSearch)
c. Acceso al audio de Polly desplegado en la página web aprovisionado en S3 (Static WebSite Hosting)

<br>

**4. Recomendaciones técnicas al desplegar**

<br>

**CloudTrail:**

 - Habilitar registros en S3
 - Identificar el nombre de la API que permitirá que el flujo de nuestra sistema inicie y nos permita obtener los valores "usuario creado", "fecha de creación" y "políticas asignadas al usuario" 

**Event Bridge:**

 - Crear "rule" tipo "Rule with an event pattern"

**Lambda:**

 - Entender los parámetros "event" y "context"
 - Uso de python3 y boto3
 - Configurar secretos (usuario y contraseña de OpenSearch) invocando la API de Secrets Manager

**Step Functions:**

 - Entender los parámetros de entrada y salida de un "step"

**OpenSearch:**

 - Desplegar un Cluster OpenSearch tipo t2.small.search o t3.small search single-AZ (para usar las 750 horas de capa gratutita)
 - Desplegar el Cluster OpenSearch modo público

**Polly:**

 - Consultar directamente la API de Polly

**S3:**

 - Habilitar modo Static WebSite Hosting


<br>

**5. Consideraciones de Seguridad**

**CloudTrail:**

 - Crear un trail
 - Habilitar "CloudTrail log file validation"
 - Habilitar "Log file SSE-KMS encryption" *(Implementación opcional, se incurre en costos mínimos*)

**Event Bridge**

 - Configurar permisos mínimos en el rol asociado

**Lambda:**

 - Configurar permisos mínimos en el rol asociado (desde Lambda y Step Functions)
 - Configurar permisos mínimos en el rol asociado (hacía DynamoDB)

**Step Functions:**

 - Configurar permisos mínimos en el rol asociado

**OpenSearch:**

 - Existen 3 tipos de autenticación: Basic, IAM or SAML Authetication. Para este laboratorio aplica "Basic Authentication"
 - Configurar cifrado en reposo
 - Personalizar acceso a index, documents (Security Plugin) *Implementación opcional*

**Polly:**

 - No Aplica

<br>
