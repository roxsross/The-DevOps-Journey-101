### Challenge-onfire-v3-level300

La empresa ZERO Technology, solicita al Equipo de DevOps Trainer, la contenerizacion de su aplicacion "Products DevOp v3" en la que incluye:

## Instrucciones:
1. Forkear el proyecto desde github repository
2. Open el terminal and cd en la carpeta para del proyecto
    - git clone [_repository link_]
    - cd [_project name_]
3. Ejecute el siguiente comando para abrir la aplicación en Visual Studio Code
    - code .
4. Crear los 6 dockerfile de cada servicio    
5. Ejecute los siguientes comandos después de abrir el proyecto en la carpeta deseada:
    - docker volume create beta-data (generar database)
    - docker-compose build (creates imagenes para los containers)
    - docker-compose up 
6. View the application on http://localhost:3000

```
Deben crear 6 Dockerfile
Front : Node 14 en adelante
back: Python 3.8 en adelante
.
├── collections-api
├── db
├── frontend
│   └── app
|       └── Dockerfile
├── inventory
│   └── api
|       └── Dockerfile
├── sales
│   ├── api
|       └── Dockerfile
│   └── poll
|       └── Dockerfile
└── service
|    ├── api 
|       └── Dockerfile
|    └── poll
|       └── Dockerfile

```

## PORTS and URL Paths
-------------------------------------------------------------------------------------------
[documentacion API](./collections-api/Insomnia_2023-04-13.json)
-------------------------------------------------------------------------------------------

### BD Postgres
Usar:
image: postgres:14.2-bullseye

docker exec -it Challenge-onfire-v3-level300-database-1 sh

> Then running the psql command in the running container with docker exec -ti NAME_OF_CONTAINER psql -U YOUR_POSTGRES_USERNAME

```
docker exec -it final-bootcampdevops-ninja-v2-database-1 sh
# psql -U service

ver listado tablas \dt
ver contendido \d nombre tabla

```
### TIPS
Ejemplo de Docker-compose:

[docker-compose](./docker-compose.yml)

Script de creacion de base de datos:
[db](./db/create-multiple-databases.sh)

### Documentacion 

(posrgressql)[https://www.digitalocean.com/community/tutorials/como-instalar-y-utilizar-postgresql-en-ubuntu-16-04-es]

### Adicional 
- Crear Documentación
- Buenas practicas

## Resultados

"en breve"
