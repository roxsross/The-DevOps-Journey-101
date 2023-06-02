# AWS Challenge

## Challenge 09

<br>

**1. Objetivo**

a. Desplegar la siguiente arquitectura cloud, detallada en:

  - Habilitar los registros de CloudTrail
  - Filtrar eventos de API a través de Event Bridge
  - Orquestar funciones Lambda a través de Step Functions
  - Hacer uso de funciones Lambda (usando Python3 y boto3)
  - Creación de una tabla en DynamoDB

b. Cada vez que el usuario administrador "admin" de la cuenta cree un usuario IAM se deberá almacenar en la tabla no relacional de DynamoDB los valores del usuario creado, fecha de creación y políticas asignadas al usuario. Si otro usuario administrador crea un usuario IAM estos valores no deberán almacenarse en DynamoDB

c. En la orquestación del Step Functions, este workflow contendrá dos funciones lambda. El objetivo de la primera función Lambda es parsear el JSON que envía Event Bridge, este parseo obtendrá los valores solicitados (usuario creado, fecha de creación y políticas asignadas al usuario). La segunda función Lambda tiene por objetivo almacenar estos valores en una tabla no relacional de DynamoDB. Entre el primer y el segundo lambda existirá una condicional (recurso proporcionado por Step Functions),si se detecta que el usuario creador es admin, el flujo continua al segundo Lambda. Si el usuario creador no es "admin" el flujo se termina ("admin" es el nombre del usuario administrador en IAM, no un permiso o rol especial en AWS)

<br>

<img src=Reto09.png>

<br>

**2. Principales Servicios/features usados**

  - CloudTrail
  - S3
  - Event Bridge
  - Step Functions
  - Lambda
  - DynamoDB

<br>

**3. Entregables**

<br>

a. Orquestación en estado "Pass" en AWS Step Function
b. Datos almacenados en DynamoDB

<br>

**4. Recomendaciones técnicas al desplegar**

<br>

**CloudTrail:**

 - Habilitar registros en S3
 - Identificar el nombre de la API que permitirá que el flujo de nuestra sistema inicie y nos permita obtener los valores "usuario creado", "fecha de creación" y "políticas asignadas al usuario" 

**Event Bridge**

 - Crear "rule" tipo "Rule with an event pattern"

**Lambda:**

 - Entender los parámetros "event" y "context"
 - Uso de python3 y boto3

**Step Functions:**

 - Entender los parámetros de entrada y salida de un "step"

**DynamoDB**

 - Usar como "Partition Key" el nombre del usuario (String)
 - En los atributos "Read capacity" y "Write capacity" configurar AutoScaling "Off". En ambos casos indicar "Provisioned capacity units" como 5 (valor por defecto)


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

**DynamoDB**

 - Configurar cifrado en reposo (Owned by Amazon DynamoDB)
 - Configurar "Point-in-time recovery (PITR)" *(Implementación opcional, se incurre en costos mínimos*)*

<br>
