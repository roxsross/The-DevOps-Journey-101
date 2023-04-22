# Comandos básicos:

Para trabajar con el sistema de ficheros en los servidores desde una terminal utilizamos **comandos**.

Un comando no es más que un programa que invocamos. Este programa puede ser tanto un fichero localizado en el sistema de archivos como un _built in command_. Para ejecutar un comando en la terminal tenemos que escribir el nombre del comando, seguido opcionalmente por una serie de argumentos separados por espacios.

> Los siguientes ejemplos vienen prefijados con un `$`. Históricamente una terminal de comandos mostraba este símbolo al usuario para indicar que estaba preparada para interpretar y ejecutar los comandos escritos con el teclado.

## man

El comando `man` se utiliza para mostrar la ayuda del comando que le pasemos como argumento.

```shell
$ man echo
```

## pwd

El comando `pwd` significa `print working directory` y se utiliza para mostrar la ruta absoluta al directorio donde nos encontramos.

```shell
$ pwd
/root
```

## cd

El comando `cd` también conocido como `chdir` se utiliza para cambiar el directorio actual donde nos encontramos. El nombre proviene de _change directory_.

```shell
$ pwd
/root
$ cd /etc
$ pwd
/etc
```

## ls

El comando `ls` se utiliza para listar el contenido de un directorio. El nombre del comando `ls` proviene de _list directory_.

```shell
$ ls /usr
bin  games  include  lib  lib32  lib64  libx32  local  sbin  share  src
```

Podemos combinar múltiples flags para mostrar información adicional:

- `-l`: Muestra permisos, propietario, grupo y fecha de modificación del fichero o directorio.
- `-p`: Añade un `/` al final del nombre de los directorios.
- `-a`: Muestra directorios y ficheros ocultos.
- `-h`: Muestra el tamaño humanamente legible (KB, MB, GB..)

## mkdir

El comando `mkdir` se utiliza para crear directorios. El nombre del comando `mkdir` proviene de _make directory_

```shell
$ mkdir myfolder
$ ls
myfolder
```

Se pueden crear directorios anidados utilizando el flag `-p`:

```shell
$ mkdir -p myfolder/level2/level3
$ ls
myfolder
$ ls myfolder
level2
$ ls myfolder/level2
level3
```

## rmdir

El comando `rmdir` se utiliza para eliminar directorios vacíos. El nombre del comando `rmdir` proviene de _remove directory_.

```shell
$ rmdir myfolder/level2/level3
```

Podemos utilizar el flag `-p` para eliminar de forma recursiva directorios vacíos:

```shell
$ rmdir -p myfolder/level2
$ ls

```

## touch

El comando `touch` originalmente se utiliza para cambiar las fechas de modificación de un fichero a la fecha actual, aunque un uso muy común es para crear ficheos vacíos:

```shell
$ touch file.txt
$ ls
file.txt
```

Otra forma de generar ficheros vacío consiste en utilizar el operador de redirección y el nombre del fichero:

```shell
$ > file1.txt
$ ls
file.txt  file1.txt
```

## cp

El comando `cp` se utiliza para copiar ficheros y/o directorios de una ruta origen a una ruta destino. El nombre viene de _copy_.

```shell
$ cp /var/log/syslog ./
$ ls
file.txt  file1.txt  syslog
```

Podemos indicar otro nombre del fichero destino:

```shell
$ cp /var/log/syslog ./other-log
$ ls
file.txt  file1.txt  other-log  syslog
```

Si queremos copiar directorios tenemos que indicar el flag `-r` para copiar de forma recursiva, de otra forma se copiará el directorio pero no su contenido:

```shell
$ mkdir folder1
$ touch folder1/file1.txt folder1/file2.txt folder1/file3.txt
$ ls
file.txt  file1.txt  folder1  other-log  syslog
$ ls folder1
file1.txt  file2.txt  file3.txt
$ cp folder1 folder2
cp: -r not specified; omitting directory 'folder1'
$ ls
file.txt  file1.txt  folder1  other-log  syslog
$ cp -r folder1 folder2
$ ls
file.txt  file1.txt  folder1  folder2  other-log  syslog
$ ls folder2
file1.txt  file2.txt  file3.txt
```

Flags interesantes de mencionar:

- `-p`: Preservar propietarios, permisos y fechas de acceso
- `-v`: Mostrar listado de ficheros copiados

## mv

El comando `mv` se utiliza para mover y/o renombrar ficheros y directorios. Su uso es muy similar al comando `cp`. El nombre viene de _move_.

```shell
$ ls
file.txt  file1.txt  folder1  folder2  other-log  syslog
$ mv file.txt file0.txt
$ ls
file0.txt  file1.txt  folder1  folder2  other-log  syslog
```

Podemos también renombrar directorios:

```shell
$ mv folder2 folder0
$ ls
file0.txt  file1.txt  folder0  folder1  other-log  syslog
```

A diferencia de `cp` al utilizar `mv` sobre directorios no hace falta aplicar flags de _recursive_:

```shell
$ ls
file0.txt  file1.txt  folder0  folder1  other-log  syslog
$ mv folder1 subfolder
$ ls
file0.txt  file1.txt  folder0  other-log  subfolder  syslog
```

Si utilizamos un nombre de directorio existente como destino moveremos todo el directorio al directorio destino en vez de renombrarlo:

```shell
$ ls
file0.txt  file1.txt  folder0  other-log  subfolder  syslog
$ mv subfolder folder0
$ ls
file0.txt  file1.txt  folder0  other-log  syslog
$ ls folder0
file1.txt  file2.txt  file3.txt  subfolder
```

## rm

El comando `rm` se utiliza para eliminar ficheros o directorios. El nombre proviene de _remove_.

```shell
$ ls
file0.txt  file1.txt  folder0  other-log  syslog
$ rm syslog
$ ls
file0.txt  file1.txt  folder0  other-log
```

El comando `rm` se utiliza mucho con el flag `-r` para borrar directorios junto con sus ficheros:

```shell
$ ls folder0
file1.txt  file2.txt  file3.txt  subfolder
$ ls folder0/subfolder/
file1.txt  file2.txt  file3.txt
$ rm -r folder0/subfolder/
$ ls folder0/
file1.txt  file2.txt  file3.txt
```

Flags a destacar:

- `-f`: Eliminación a la fuerza sin confirmación previa.
- `-i`: Muestra el fichero o directorio a borrar y pide confirmación

## echo

El comando `echo` se utiliza para mostrar una línea de texto.

```shell
$ echo Hello world!
Hello world!
```

## cat

El comando `cat` se utiliza para volcar el contenido de uno o más ficheros pasados como argumentos a la salida estandar. El nombre viene de _concatenate_.

```shell
$ cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=20.04
DISTRIB_CODENAME=focal
DISTRIB_DESCRIPTION="Ubuntu 20.04.1 LTS"
```

## find

El comando `find` se utiliza para buscar ficheros o directorios atendiendo a los criterios que nosotros especifiquemos.

```shell
$ ls
file0.txt  file1.txt  folder0  other-log
$ find . -name "file1.txt"
./folder0/file1.txt
./file1.txt
```

Podemos buscar ficheros o directorios especificando `-type d` o `type f`:

```shell
$ find . -type d
.
./folder0
./.ssh
./.cache
```

También podemos buscar en el nombre por patrones:

```shell
$ find . -name "file*"
./file0.txt
./folder0/file2.txt
./folder0/file3.txt
./folder0/file1.txt
./file1.txt
```

Podemos excluir directorios utilizando `-path <folder> -prune -false`:

```shell
$ find . -path ./folder0 -prune -false -o -name "file*"
./file0.txt
./file1.txt
```

Podemos añadir el flag `-exec` para poder ejecutar un comando con cada patrón encontrado:

```shell
$ find . -name "file*" -exec echo "File found: {}" \;
File found: ./file0.txt
File found: ./folder0/file2.txt
File found: ./folder0/file3.txt
File found: ./folder0/file1.txt
File found: ./file1.txt
```

## grep

El comando `grep` se utiliza para buscar ocurrencias de cadenas de texto en uno o más ficheros. En este ejemplo vamos a buscar el modelo de CPU del sistema.

```shell
$ grep "model name" /proc/cpuinfo
model name      : Intel(R) Core(TM) i9-8950HK CPU @ 2.90GHz
```

Con el flag -E podemos indicar varios patrones. En este ejemplo vamos a buscar las líneas relacionadas con la memoria y swap de `/proc/meminfo`:

```shell
$ grep -E "^(Mem|Swap)" /proc/meminfo
MemTotal:        2035504 kB
MemFree:         1475044 kB
MemAvailable:    1780960 kB
SwapCached:            0 kB
SwapTotal:       1003516 kB
SwapFree:        1003516 kB
$
```

Con el flag `-v` podemos excluir patrones en los resultados. En este caso vamos a buscar todos a los usuarios que inicien con la terminal `bash` pero excluyendo al usuario vagrant.

```shell
$ grep "/bin/bash" /etc/passwd
root:x:0:0:root:/root:/bin/bash
vagrant:x:1000:1000:vagrant,,,:/home/vagrant:/bin/bash
user1:x:1001:1001::/home/user1:/bin/bash
$ grep "/bin/bash" /etc/passwd | grep -v vagrant
root:x:0:0:root:/root:/bin/bash
user1:x:1001:1001::/home/user1:/bin/bash
```

Podemos combinar múltiples flags. En este caso vamos a buscar todas las opciones de configuración del servidor SSH pero excluyendo comentarios y líneas vacías:

```shell
$ grep -vE "^#|^$" /etc/ssh/sshd_config
Include /etc/ssh/sshd_config.d/*.conf
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding yes
PrintMotd no
AcceptEnv LANG LC_*
Subsystem       sftp    /usr/lib/openssh/sftp-server
UseDNS no
GSSAPIAuthentication no
```

El flag `-i` se utiliza para ignorar _casing_ y poder obtener resultados tanto en mayúscula como minúscula:

```shell
$ grep -i "ubuntu" /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_DESCRIPTION="Ubuntu 20.04.1 LTS"
```

Con el flag `-n` mostramos el número de línea de la coincidencia encontrada:

```shell
$ grep -n "Ubuntu" /etc/lsb-release
1:DISTRIB_ID=Ubuntu
4:DISTRIB_DESCRIPTION="Ubuntu 20.04.1 LTS"
```

Con el flag `-H` mostramos el nombre del fichero de la coincidencia encontrada:

```shell
$ grep -H "Ubuntu" /etc/lsb-release
/etc/lsb-release:DISTRIB_ID=Ubuntu
/etc/lsb-release:DISTRIB_DESCRIPTION="Ubuntu 20.04.1 LTS"
```

El flag `-R` nos permite buscar sobre directorios de forma recursiva:

```shell
$ grep -R "^Aug 20 15:17" /var/log/
/var/log/syslog:Aug 20 15:17:01 vagrant CRON[14602]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
/var/log/auth.log:Aug 20 15:17:01 vagrant CRON[14601]: pam_unix(cron:session): session opened for user root by (uid=0)
/var/log/auth.log:Aug 20 15:17:01 vagrant CRON[14601]: pam_unix(cron:session): session closed for user root
```

El comando `grep` acepta diferentes tipos de tokens para utilizar expresiones regulares. [Aquí](https://linuxize.com/post/regular-expressions-in-grep/) se recopilan varios ejemplos sobre expresiones regulares.

## head

El comando `head` se utiliza para mostrar líneas del principio de un fichero. Por defecto muestra las 10 primeras líneas, pero podemos especificar cuántas utilizando el flag `-n <number>` o `-<number>`:

```shell
$ head /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
```

```shell
$ head -n 3 /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
```

```shell
$ head -3 /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
```

## tail

El comando `tail` se utiliza para mostrar las últimas líneas de un fichero. Por defecto muestra las últimas 10 líneas pero podemos especificar cuántas utilizando el flag `-n <number>` o `-<number>`:

```shell
$ tail /etc/passwd
tcpdump:x:108:114::/nonexistent:/usr/sbin/nologin
landscape:x:109:116::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:110:1::/var/cache/pollinate:/bin/false
sshd:x:111:65534::/run/sshd:/usr/sbin/nologin
_rpc:x:112:65534::/run/rpcbind:/usr/sbin/nologin
statd:x:113:65534::/var/lib/nfs:/usr/sbin/nologin
vagrant:x:1000:1000:vagrant,,,:/home/vagrant:/bin/bash
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
vboxadd:x:998:1::/var/run/vboxadd:/bin/false
user1:x:1001:1001::/home/user1:/bin/bash
```

```shell
$ tail -n 3 /etc/passwd
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
vboxadd:x:998:1::/var/run/vboxadd:/bin/false
user1:x:1001:1001::/home/user1:/bin/bash
```

```shell
$ tail -3 /etc/passwd
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
vboxadd:x:998:1::/var/run/vboxadd:/bin/false
user1:x:1001:1001::/home/user1:/bin/bash
```

Otro flag útil es `-f` para mostrar las líneas nuevas que se hayan añadido al fichero en tiempo real.

## less

El comando `less` se utiliza para visualizar el contenido de un fichero. El contenido es mostrado de forma interactiva y podemos navegar por el fichero utilizando las flechas del teclado. Presionando la tecla `h` podemos ver el menú de ayuda con sus atajos disponibles.

```shell
$ less /etc/passwd
```
