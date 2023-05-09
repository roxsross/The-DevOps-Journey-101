# Dockerizar una app con Node.js y Postgres
## Ejecución

Instalacion:

```bash
$ cd src
$ npm install
```

Probar que la Base de datos de PostgreSQL recibe conexiones

```bash
$ docker run -it -e "POSTGRES_HOST_AUTH_METHOD=trust" -p 5432:5432 postgres
```
Abrir Base de datos y ejecutar el siguiente script para la creacion de tablas:
```bash
-- public."People" definition
-- Drop table
-- DROP TABLE public."People";

CREATE TABLE public."People" (
	id varchar NULL,
	"firstName" varchar NULL,
	"lastName" varchar NULL,
	"createdAt" date NULL DEFAULT now(),
	"updatedAt" date NULL DEFAULT now()
);

INSERT INTO public."People" ("id","firstName","lastName","createdAt","updatedAt") VALUES
	 ('1','MARIA','VELASCO','2022-11-12','2022-11-12'),
	 ('2','CAROLINA','LLANO','2022-11-12','2022-11-12');
```

Construir applicacion:

```bash
$ docker-compose up -d
```

Ejecutar aplicacion

https://localhost:3000/

Obtener campos de la tabla:

http://localhost:3000/persons/all/

Obtener campos por ID de usuario:

http://localhost:3000/persons/:id/

### Entrega

- Documentación
- Print de Pantalla de la solución
- Dockerfile
- Docker-compose