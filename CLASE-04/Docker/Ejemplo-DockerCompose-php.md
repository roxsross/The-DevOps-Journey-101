#### Entorno de Desarrollo para php usando Docker :whale:

<h1>Entorno de Desarrollo para php usando Docker :whale:</h1>

Quieres aprender php, pero las configuraciones te han abrumado y el deseo de aprender van mermando. **No, no detengas tu aprendizaje**, siempre existe una solución a los problemas. Instalar php, configurar un servidor web en Windows es muy sencillo, en Linux y macOS es otra situación. Debes conocer sobre la terminal, un editor de código, vim, nano, ser avanzado... y mucho más. 

La herramienta que vamos a utilizar y que permite trabajar con php, un servidor web y la terminal es `Docker`.

[**Docker:**](https://www.docker.com/) Es una plataforma de software que permite crear, probar e implementar aplicaciones rápidamente.

**Docker-compose:** Es una herramienta para definir y ejecutar aplicaciones; es multicontenedor que permite simplificar el uso de Docker a partir de archivos YAML, de esta forma es más sencillo generar contendores que se relacionen entre sí, conectarlos, habilitar puertos, volúmenes, etc.

**Servidor web:** software que permite a los usuarios ver una página web en su navegador. Servidores más utilizados `Apache` y `Nginx`.

## Configuración de `docker-compose.yml`

Crear el archivo `docker-compose.yml` con la siguiente configuración:

```sh
# Los archivos docker-compose.yml son versionados, lo que significa que es muy importante indicar la versión de las instrucciones que queremos darle.
version: "3.3"

# Servidor nginx
services:
  web:
  	# versión
    image: nginx:latest
    # Puerto 8080 
    ports:
      - "8080:80"
    volumes:
      - ./src:/var/www/html
      - ./default.conf:/etc/nginx/conf.d/default.conf
    links:
      - php-fpm

  # Configuración de php-fpm
  php-fpm:
    image: php:8-fpm
    volumes:
      - ./src:/var/www/html
```

Creamos un nuevo archivo con el nombre `default.conf` con la siguiente configuración, al nivel que `docker-compose.yml`.

```php
# No te preocupes, por las configuraciones. 
server {
  index index.php index.html;
  server_name phpfpm.local;
  error_log  /var/log/nginx/error.log;
  access_log /var/log/nginx/access.log;
  root /var/www/html;

  location ~ \.php$ {
    try_files $uri =404;
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_pass php-fpm:9000;
    fastcgi_index index.php;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param PATH_INFO $fastcgi_path_info;
  }
}
```

## Comandos de `docker-compose`

Crea e Iniciar el contenedor:

```sh
# Crea e inicia el contenedor
# -d inicia los contenedores en segundo plano y los deja en ejecución.
➜ docker-compose up -d
```


```sh
# Crea e inicia el contenedor en primer plano
➜ docker-compose up
```

Para que la interacción sea efectiva y el aprendizaje una experiencia positiva, los archivos `.php` se crean dentro del directorio `src`.

```sh
# directorio principal
├── docker-php
│   ├── default.conf
│   ├── docker-compose.yml
│   ├── README.md
│   └── src       # Directorio
│       ├── holi.php
└──     └── index.php

# Dentro de la carpte src, crear el archivo index.php
```

Crear el archivo `index.php` en el directorio `src`, 

```php
# contenido de index.php
<?php
  echo phpinfo();
```

Ir al navegador favorito, visitar el siguiente enlace `http://localhost:8080`. Surge algún un error con la conexión al servidor local, agregar en la dirección `php-fpm.` a `localhost:8080`. La dirección queda de la siguiente forma:

```sh
http://php-fpm.localhost:8080/
```


Listo, tienes corriendo tu primer servidor `nginx`, junto a `php` utilizando `docker-compose`.

### Interactuar con la terminal de docker-compose

Ingresar a `bash` de `docker-compose`

```sh
➜ docker-compose exec php-fpm bash
```


Crea el archivo `variables.php`

```sh
# crear archivo
touch variables.php
```

`variables.php`

```php
<?php
// Definir variables
$numero_1 = 8;
$numero_2 = 7;

// Definir constantes
define("NUMERO_PI", 3.14);
// define("NUMERO_PI", 14);

echo NUMERO_PI;

echo "\n";

echo $numero_1 + $numero_2;

echo "\n";%    
```


Ejecutamos el archivo `php` en terminal:

```sh
php variables.php
```


Con el comando `exit`, cerramos bash.

Detener el contenedor que se ejecuta en segundo plano

```sh
# Segundo plano
docker-compose down
```

Detener contenedor en primer plano

```sh
# Primer plano
ctl + c
```


Utilizar Docker para aprender un lenguaje de programación, es una oportunidad de no para de aprender. 

**Nunca pares de aprender**
