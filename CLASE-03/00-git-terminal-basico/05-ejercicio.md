# Introducción

En este ejercicio vamos a simular que creas un proyecto desde cero, para ello
te indicaremos el nombre del proyecto, los ficheros a añadir y una serie de situaciones que tendrás que resolver.

Entregable: El entregable de esta documento es un fichero de texto en el que 
indicas la secuencia de comandos que has empleado para completar el ejercicio
y un enlace al repositorio creado en Github.

# Enunciado

Empezamos a trabajar en un proyecto en local desde cero.

## Arranque

Dentro de una carpeta vamos a añadir ficheros con documentación:

_principal.md_

```md
# Principal

Este es el fichero principal
```

Nos damos cuenta de que es buena idea empezar a trabajar con Git, pero
de momento no queremos subir nada a la nube.

Pon aquí que comando usarias para crear el repositorio en local:

__________________________________________________________

Queremos guardar lo que llevamos de proyecto (el fichero _principal.md_)
en la base de datos de Git que tenemos en local ¿Qué comandos podemos ejecutar
para hacer esto?

__________________________________________________________


__________________________________________________________


Nota(*) Si lo prefieres hacer en un comando también vale

## Ignorar

Resulta que la herramienta que usamos para editar ficheros va
creando ficheros temporales con extension _.bak_, vamos a simular
esto, creamos dos ficheros nuevos:

_./detalle.md_

```md
Esto es un texto de detalle
```

_./detalle.md.bak_

```md
Esto es un texto de detal
```

Antes de subir a staging los cambios queremos ver en que estado
están los ficheros, para ello ejecutamos el comando:

__________________________________________________________

¡Anda! Queremos hacer commit del fichero _detalle.md_ pero no queremos que
se suban los ficheros con extension _.bak_, así que decidimos añadir una
entrada al .gitignore ¿Qué contenido tendríamos que añadir?

Indica aquí tu _.gitignore_

__________________________________________________________

Pista: para la extensión te va a hacer falta usar un patrón, más 
info: https://www.atlassian.com/es/git/tutorials/saving-changes/gitignore

Ahora que lo tenemos vamos a meter los cambios en la base de datos de git
(el fichero _detalle.md_), ¿Que comandos o comando te harían falta?

__________________________________________________________


__________________________________________________________


Nota(*) Si lo prefieres hacer en un comando también vale

## Subida a la nube

Toca subir esto a un repositorio en la nube, no queremos que se nos pierda
el trabajo si se rompe nuestro portatil.

Así que:

- Crea un repositorio público  en tu cuenta de Github, pon aquí el enlace
al mismo:

__________________________________________________________

- Enlace tu local a ese servidor, pon aquí el comando:

__________________________________________________________

- Sube el contenido al servidor, pon aquí el comando:

__________________________________________________________






