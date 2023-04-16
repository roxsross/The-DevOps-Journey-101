# Introducción a scripting

Cuando hablamos de _scripting_ en Linux por lo general nos referimos a _BASH scripting_ aunque en la realidad un script no es más que una serie de instrucciones ejecutadas por un itérprete y ese intérprete no tiene por que ser BASH.

Cuando ejecutamos un script (o programa) Linux carga el contenido del script y sus instrucciones en memoria por lo que se crea un proceso que representa la instancia de ese programa.

Por convención solemos darle una extensión específica para representar el lenguaje de su contenido como `.js`, `.py`, `.html` aunque para Linux las extensiones no son obligatorias para crear un fichero ejecutable. Sí es cierto que algunos entornos (e.j. GUI) sí asocian extensiones a programas para determinar cómo ejecutarlos.

En este apartado nos centraremos en la shell BASH y BASH scripting

## ¿Cómo ejecutar un script BASH?

Vamos a crear el 'Hola mundo' en BASH. Para ello crearemos un fichero `helloworld` con el siguiente contenido:

```bash
echo "Hello world!"
```

Para ejecutarlo un script en BASH, invocaremos al comando bash pasándole como argumento la ruta a nuestro script. Ejemplo:

```shell
$ bash ./helloworld
Hello world!
```

Otra opción es utilizar el _built in command_ `.` (dot) pasándole como argumento la ruta a nuestro script:

```shell
$ . ./helloworld
Hello world!
```

O incluso con el comando `source`:

```shell
$ source ./helloworld
Hello world!
```

Sí es cierto que en la práctica cuando invocamos algunos comandos no necesitamos anteponer su intérprete como, por ejemplo, el comando `egrep` que es otro BASH script. Esto es posible debido a dos motivos:

- El script tiene **permisos de ejecución**.
- El script sabe qué intérprete usar.

Para poder hacer un script ejecutable necesitamos darle permisos de ejecución. En apartados posteriores veremos cómo funcionan el sistema de permisos en Linux. Por ahora para hacer nuestro script ejecutable haremos lo siguiente:

```shell
$ chmod +x ./helloworld
```

Por último nos falta añadir el **_shebang_**. Es una instrucción que debe de ir al principio del fichero e indica el intérprete que debe de ejecutar. Se indica mediante `#!` seguido de la ruta absoluta del intérprete, en nuestro caso el intérprete es `/bin/bash`:

```shell
#!/bin/bash

echo "Hello world!"
```

Ahora podemos ejecutarlo sin el comando `bash` directamente mediante su ruta y nombre de archivo:

```shell
$ ./helloworld
Hello world!
```

Gracias a este _shebang_ podemos crear scripts no sólo de BASH si no de cualquier otro lenguaje interpretado, veamos un ejemplo en python creando el fichero `helloworld.py`:

```py
#!/usr/bin/python3

def say(message):
  print(message)

say("Hello world from Python")
```

Volvemos a darle permisos de ejecución y probamos su ejecución:

```shell
$ chmod +x ./helloworld.py
$ ./helloworld.py
Hello world from Python
```

También es posible utilizar el comando `/usr/bin/env` pasándole el nombre del intérprete como argumento:

```py
#!/usr/bin/env python3

def say(message):
  print(message)

say("Hello world from Python")
```

Existen muchas variables que están preestablecidas al utilizar una shell BASH. Muchas de ellas son estáticas y unas pocas cambian conforme interactuamos con el sistema. Para ver el listado de todas las variables disponibles podemos utilizar el comando `env` sin argumentos.

```shell
$ env
SHELL=/bin/bash
LANGUAGE=en_US:
PWD=/home/vagrant
LOGNAME=vagrant
XDG_SESSION_TYPE=tty
MOTD_SHOWN=pam
HOME=/home/vagrant
LANG=C.UTF-8
...
```

```shell
$ echo Mi usuario es $USER
Mi usuario es vagrant
$ echo Mi usuario es USER
Mi usuario es USER
```

> También podemos utilizar el comando `printenv <varname>` para mostrar el contenido de una variable. Sin argumentos mostrará t

En apartados posteriores de _scripting_ veremos cómo trabajar con variables.
