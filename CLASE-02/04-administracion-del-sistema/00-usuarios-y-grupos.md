# Usuarios y grupos

El concepto de usuario en Linux permite separar entornos de ejecución para diferentes propósitos. Cada usuario tiene un directorio personal diferente y puede trabajar simultáneamente en el mismo sistema junto a otros usuarios.

Existen además usuarios creados con el propósito de restringir el acceso a servicios de sistema (o demonios) de otros usuarios como mecanismo de seguridad. Por lo que si un usuario se vé afectado por un ataque el acceso que tuviese el servicio servirá como contención del ataque y no podrá acceder a otros servicios o ficheros que pertenezcan a otros usuarios.

En un sistema Linux existen varios ficheros que contienen información de los usuarios:

## /etc/passwd

El fichero `/etc/passwd` almacena información de los usuarios y sus características. Cada fila corresponde a un usuario y cada campo está separado por `:`.

```
vagrant:x:1000:1000:vagrant,,,:/home/vagrant:/bin/bash
user1:x:1001:1001::/home/user1:/bin/bash
```

Los campos que presenta son los siguientes:

- Nombre del usuario
- La contraseña del usuario en texto plano, o un asterisco `*` o una `x` si está encriptada.
- _User ID_ o número de identificación único del usuario. Los usuarios pueden cambiar muchos parámetros, incluso su nombre de usuario, pero el UID no debe cambiar nunca. El UID del usuario root es `0`. Los usuarios que ejecutan servicios y demonios tienen los UIDs más bajos mientras que los usuarios finales comienzan en el valor definido en `UID_MIN` del fichero `/etc/login.defs` y terminan por el valor `UID_MAX`.
- _Group ID_ o número de identificación único de grupo. Los usuarios pueden compartir un mismo grupo, aunque por defecto al crear un usuario se genera un grupo con el mismo nombre del usuario salvo que se especifique lo contrario. Los datos del grupo aparecen en el fichero `/etc/groups` y los valores posibles están entre `GID_MIN` y `GID_MAX` del fichero `/etc/login.defs`.
- _General Comprehensive Operating System_ o campo de comentarios, incluye información extra sobre el usuario (nombre real, dirección, teléfono, etc). Informalmente se le llama información _finger_.
- _Home directory_ o directorio de inicio del usuario. Los usuarios finales suelen tener el directorio personal dentro de `/home`.
- La shell que utiliza por defecto el usuario. Suele ser `/bin/bash`. Los usuarios que tienen el valor `/sbin/nologin` o `/usr/bin/false` no tienen permiso para iniciar sesión en el sistema, lo cuál es común en demonios como medida de seguridad.

## /etc/shadow

El fichero `/etc/shadow` contiene información sobre contraseñas de los usuarios definidos en `/etc/passwd` que se almacena de forma cifrada. El formato es el mismo, una serie de columnas separadas por `:`.

```
vagrant:$6$5Nl7vlFx8.WGzceB$V3wSTv0pwh6X6tR5.Ifcxs7g7QqwBEYOS7SGu0g56TF0tZFiMragbovJHFfHWyZK66yTRJ8qBhdX0LpI5UGQx/:18490:0:99999:7:::
user1:.7M92ZpjDEDc.:18527:0:99999:7:::
```

La información de las columnas es la siguiente:

- Nombre del usuario.
- Contraseña encriptada. La función _hash_ utilizada para encriptar la contraseña se indica al comienzo. El valor `*` indica que la cuenta nunca ha tenido contraseña. El valor `!` significa que la cuenta se ha deshabilitado para loguearse mediante contraseña.
- Días transcurridos desde el último cambio de contraseña.
- Mínimo de días hasta que se pueda volver a cambiar la contraseña.
- Máximo de días hasta que el sistema obliga a cambiar la contraseña del usuario.
- Número de días previos a _Max_ en los que se le avisa al usuario de que debe cambiar su contraseña.
- Campo reservado para futuros usos.

Cuando una cuenta de usuario es bloqueada la contraseña del usuario no es borrada, sino que se le añade un `!` extra al inicio del hash de su contraseña para indicar que está bloqueado. Al desbloquear el usuario se elimina dicha exclamación.

## /etc/group

El fichero `/etc/group` contiene la información sobre los grupos del sistema. La estructura es similar a los otros dos ficheros mencionados.

```
root:x:0:
vagrant:x:1000:
user1:x:1001:
```

Los campos que presenta son los siguientes:

- Nombre del grupo
- Contraseña que permite a un usuario cambiar de grupo. Si está vacío no requiere contraseña, si tiene una `x` significa que está encriptada en el fichero `/etc/gshadow`. El tener contraseña es útil para crear grupos privilegiados.
- _Group ID_ o identificador único del grupo.
- Lista separada por comas con los nombres de usuarios que pertenecen a ese grupo.

## Gestión de usuarios

Los ficheros `/etc/passwd` y `/etc/shadow` no están pensados para ser manipulados directamente. Existen una serie de comandos de gestión de usuarios para cambiar sus parámetros.

### useradd

El comando `useradd` se utiliza para crear usuarios. Acepta numerosas opciones como la ruta al directorio personal, fecha de expiración, inactividad, _UID_, _GID_, grupos, contraseña, _shell_, etc.

```shell
# useradd -m -s /bin/sh user2
```

Cuando se crea un usuario se le añaden una serie de ficheros y configuraciones. Los ficheros parten de una plantilla que, por defecto es `/etc/skel`. La configuración que se utiliza para establecer valores de _UID_, _GID_, creación de la _home_ por defecto, etc, se lee del fichero `/etc/login.defs`.

### userdel

El comando `userdel` se utiliza para borrar usuarios. Admite varios parámetros como borrar su directorio personal, etc.

```shell
# userdel -r user2
```

### usermod

El comando `usermod` se utiliza para modificar parámetros de un usuario como su nombre, la pista para contraseña, la ruta de su directorio personal, fecha de expiración, inactividad, _UID_, etc.

```shell
# usermod user1 -l user
$ ls -la /home/user1
total 20
drwxr-xr-x 2 user user1 4096 Aug 24 18:34 .
drwxr-xr-x 4 root root  4096 Aug 24 19:04 ..
-rw-r--r-- 1 user user1  220 Feb 25  2020 .bash_logout
-rw-r--r-- 1 user user1 3771 Feb 25  2020 .bashrc
-rw-r--r-- 1 user user1  807 Feb 25  2020 .profile
```

### chsh

El comando `chsh` se utiliza para cambiar la shell de inicio del usuario. El listado de shells válidas se encuentran en el fichero `/etc/shells` y los cambios de la shell se aplicarán en el próximo inicio de sesión.

```shell
$ chsh -s /bin/sh
```

### id

El comando `id` ofrece información del usuario y sus grupos.

```shell
$ id -u
1000
$ id -un
vagrant
$ man id
$ id -G
1000 4 24 27 30 46 111 118 119
$ id -Gn
vagrant adm cdrom sudo dip plugdev lxd lpadmin sambashare
```

### passwd

El comando `passwd` se utiliza para cambiar la contraseña. Admite diferentes parámetros para configurar fecha de expiración, bloqueos contra nuevos cambios, etc.

```shell
$ passwd
```

### groupadd

El comando `groupadd` se utiliza para crear grupos. Comparte algunos parámetros con `useradd`.

```shell
# groupadd developers
$ grep developers /etc/group
developers:x:1002:
```

### groupmod

El comando `groupmod` se utiliza para cambiar la definición de un grupo como el nombre, _GID_, contraseña, etc.

```shell
# groupmod -p `openssl passwd -1` developers
```

### groupdel

El comando `groupdel` se utiliza para eliminar grupos.

```shell
# groupdel developers
```
