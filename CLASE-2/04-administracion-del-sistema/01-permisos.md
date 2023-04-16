# Gestión de permisos

En linux cada fichero y directorio tienen permisos de:

- **Usuario**: El _UID_ del usuario propietario.
- **Grupo**: El _GID_ del grupo propietario.
- **Otros**: El resto de de usuarios que no tienen ni el _UID_ del usuario propietario ni el _GID_ de del grupo propietario.

El comando `ls -l` lista los archivos y directorios incluyendo información de sus permisos:

```shell
$ touch file.txt
$ ls -l
total 0
-rw-rw-r-- 1 vagrant vagrant 0 Aug 24 20:12 file.txt
```

El primer carácter indica si el fichero es un archivo regular:

- `-` para fichero regulares.
- `d` para directorios.
- `l` para enlaces simbólicos.

El resto de los carácteres indican los permisos de lectura, escritura y ejecución para el propietario, grupo y otros respectivamente:

- `r` indica que el fichero tiene permisos de lectura.
- `w` indica que el fichero tiene permisos de escritura.
- `x` indica que el fichero tiene permisos de ejecución.

> El permiso de ejecución en directorios significa que se puede acceder dentro del mismo y listar su contenido. Un usuario sin permiso de lectura a un directorio no podrá ver su contenido. Un usuario sin permiso de ejecución a un directorio podrá ver el nombre de los ficheros pero no su información.

## Cambio de permisos

Para modificar los permisos de un fichero o directorio se utiliza el comando `chmod`.

Se puede cambiar los permisos de forma relativa o absoluta.

### Modo relativo

Cambiar permisos de forma relativa significa cambiar uno de los campos de forma aislada sin alterar el resto de permisos. Para ello:

- Se indica a quién se va a cambiar el permiso (se puede poner varios):
  - `u`: usuario
  - `g`: grupo
  - `o`: otros
  - `a`: todos (equivalente a `ugo`, también se puede dejar en blanco)
- Se indica el tipo de operación:
  - `+`: añadir permisos
  - `-`: quitar permisos
- Tipo de permiso:
  - `r`: lectura
  - `w`: escritura
  - `x`: ejecución

Ejemplos:

```shell
$ # Añadir permiso de lectura a otros
$ chmod o+r file.txt
$ # Eliminar todos los permisos de escritura y ejecución para todos excepto el propietario
$ chmod go-wx file.txt
$ # Añadir permiso de ejecución para todos
$ chmod +x file.txt
```

### Modo absoluto

Cambiar permisos de forma absoluta significa establecer los permisos de lectura, escritura y ejecución para el propietario, grupo y otros de una. Los permisos se establecen en octal aunque son fácilmente representables en binario

```
-rw-rw-r-- 1 vagrant vagrant 0 Aug 24 20:12 file.txt
```

Si Augaramos los permisos del fichero `file.txt` en cada contexto obtenemos:

- `rw-` para el propietario
- `rw-` para el grupo
- `r--` para otros

Si los transformamos en binario obtenemos:

- `110` para el propietario
- `110` para el grupo
- `100` para otros

Si los transformamos a octal:

- `6` para el propietario
- `6` para el grupo
- `4` para otros

El fichero `file.txt` tiene permisos `664`. Vamos a cambiarle los permisos para que sólo el propietario sea capaz de leer y ejecutar:

- propietario: `rw-` en binario es `110` y en octal `6`
- grupo: `---` en binario es `000` y en octal `0`
- otros: `---` en binario es `000` y en octal `0`

```shell
$ chmod 600 file.txt
$ ls -l file.txt
-rw------- 1 vagrant vagrant 0 Aug 24 20:12 file.txt
```

Vamos a cambiar sus permisos para que el propietario tenga todos los permisos, el grupo pueda leer y ejecutar pero no editar y el resto sólo puedan leer:

- propietario: `rwx` en binario es `111` y en octal `7`
- grupo: `r-x` en binario es `101` y en octal `5`
- otros: `r--` en binario es `100` y en octal `4`

```shell
$ chmod 600 file.txt
$ ls -l file.txt
-rwxr-xr-- 1 vagrant vagrant 0 Aug 24 20:12 file.txt
```

## Cambio de propietario y grupo

Para cambiar el propietario de un fichero se utiliza el comando `chown` y para el grupo `chgrp`.

Ambos comandos admiten el flag `-R` en directorios para que realice la operación de foma recursiva.

```shell
$ ls -l file.txt
-rwxr-xr-- 1 vagrant vagrant 0 Aug 24 20:12 file.txt
$ sudo chgrp user1 file.txt
$ ls -l file.txt
-rwxr-xr-- 1 vagrant user1 0 Aug 24 20:12 file.txt
$ sudo chown user1 file.txt
$ ls -l file.txt
-rwxr-xr-- 1 user1 user1 0 Aug 24 20:12 file.txt
$ sudo chown vagrant:vagrant file.txt
$ ls -l file.txt
-rwxr-xr-- 1 vagrant vagrant 0 Aug 24 20:12 file.txt
```

## Sudoers

En Linux se pueden ejecutar determinados comandos con permisos de superusuario mediante `sudo <comando>`. Si el usuario intenta ejecutar algo con `sudo`, se comprueba si tiene permisos para ejecutar el comando y, si no los tiene, no lo ejecuta y el intento queda registrado en el sistema.

Se puede configurar los privilegios de los usuarios para ejecutar ciertos comandos en el fichero `/etc/sudoers`. Las modificaciones sobre este archivo no se deben realizar como si fuese un fichero normal, sino que hay que modificarlos con el comando `visudo`.

Especificación de privilegios:

```
usuario host = (usuario_privilegiado_opcional:especificación) comandos
```

Ejemplos:

```shell
# Permitir al grupo `sudo` en cualquier definición de host ejecutar cualquier comando
%sudo ALL=(ALL) ALL

# Permitir al usuario `user1` poder ver el fichero de auth.log sin requerir contraseña.
user1 ALL=(ALL:NOPASSWD) /usr/bin/less /var/log/auth.log

# Permitir al grupo `developers` poder ejecutar el comando `ls` con contraseña
%developers ALL=(ALL:PASSWD) /usr/bin/ls
```
