# CURL

El comando `curl` es una herramienta para transferir datos de cliente a servidor o servidor a cliente. Admite una gran variedad de protocolos como FTP, HTTP, IMAP, LDAP, POP3, SCP, SMTP, etc, por lo que soporta características como uso de proxies, autenticación, subida de ficheros, conexiones SSL, cookies y muchas otras más.

Vamos a ver casos prácticos enfocados a peticiones HTTP y HTTPS.

Para ejecutar una petición GET a un servidor y mostrar su respuesta ejecutaremos el comando `curl` seguido de la URL del servidor. Ejemplo:

```shell
$ curl https://www.google.es
```

Si queremos guardar la respuesta utilizaremos el flag `-o` (`--output`) indicando la ruta de un fichero:

```shell
$ curl -o ./google-response.txt https://www.google.es
```

> Alternativamente podemos utilizar el comando redirección (`>` o `>>`) para redirigir la salida a la ruta del fichero que queremos guardar.

Si queremos descargarnos un fichero con el nombre de la URL podemos utilizar el flag `-O` (`--remote-name`) para indicar a curl que descargue el contenido de la respuesta en un fichero con el mismo nombre que el de la URL. Ejemplo para descargar una imagen:

```shell
$ curl -O https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg
```

> Podemos utilizar el flag `-L` (`--location`) junto a `-O` para seguir redirecciones.

Si descargamos un fichero grande podemos cortar la descarga y continuarla más adelante utilizando el flag `-C` (`--continue-at <offset>`) con el valor `-` para utilizar el fichero existente:

```shell
## Limitamos la velocidad de descarga a 1Mbps (el fichero pesa 18MB)
$ curl -O --limit-rate 1M https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4

## Cortamos la descarga con Ctrl + C
^C

## Continuamos la descarga añadiendo "-C -"
$ curl -O --limit-rate 1M -C - https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4
```

> Si no queremos mostrar barra de progreso al descargar un fichero añadiremos el flag `-s` (`--silent`).

Podemos hacer debugging de las cabeceras y conexión utilizando el flag `-v` (`--verbose`):

```shell
curl -v https://www.google.es
```

Si queremos mostrar sólo las cabeceras de respuesta podemos utilizar el flag `-I`:

```shell
$ curl -I https://www.google.es
```

Podemos cambiar el _user agent_ utilizando el flag `-A` (`--user-agent`):

```shell
## Comprueba las respuestas con y sin el flag. Esta API es capaz de detectar peticiones curl.
$ curl -A "None" https://wttr.in/
```

Podemos modificar las headers de petición utilizando el flag `-H <header>: <value>` por cada cabecera. Ejemplo:

```shell
## La siguiente API es capaz de responder en diferentes formatos (JSON, XML, HTML, YAML).
$ curl -H "Accept: application/xml" mockbin.org/request
$ curl -H "Accept: application/json" mockbin.org/request
```

Para realizar peticiones con diferente verbo HTTP (POST, PUT, DELETE, PATCH, etc) utilizaremos el flag `-X <method>`. El siguiente ejemplo realiza una petición POST con datos enviados como JSON utilizando el flag `-d` (`--data`):

```shell
curl -X POST -d '{"title": "Post title", "body": "Post content", "userId": 1}' -H 'Content-Type: application/json' https://jsonplaceholder.typicode.com/posts
```

> Podemos especificar si utilizar HTTP1.1 o HTTP2 mediante los flags `--http1.1` y `--http2` respectivamente.

Si necesitamos guardar las cabeceras de respuesta podemos utilizar el flag `-D` (`--dump-header <filename>`) y el nombre de un fichero.

```shell
$ curl -D mockbin-response-headers.txt mockbin.org/request
```

> Si utilizamos `-D -` volcará las cabeceras en la salida de consola.
