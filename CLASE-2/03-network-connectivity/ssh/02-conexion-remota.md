# Conexión remota

Para establecer una conexión SSH al servidor nos hará falta al menos:

- Login del usuario remoto (por defecto el usuario actual)
- IP o dominio del servidor
- Puerto (22 por defecto)

## Prerrequisitos

Para esta demo se han aprovisionado dos máquinas virtuales utilizando el fichero de configuración de Vagrant.

Para inicializar las máquinas virtuales nos situaremos desde una terminal en el directorio donde tenemos el fichero `Vagrantfile` y ejecutaremos:

```bash
$ vagrant up
```

El usuario a iniciar es `vagrant` con contraseña `vagrant`.

## Establenciendo conexión

Desde el cliente ejecutaremos el siguiente comando:

```bash
vagrant@ubuntu-client:~$ ssh user1@192.168.1.10
```

La primera vez que nos conectemos el servidor nos mostrará un aviso sobre la identidad del servidor:

```
The authenticity of host '192.168.33.10 (192.168.33.10)' can't be established.
ECDSA key fingerprint is SHA256:PRKtsYe7kZnpTU8+G7+a9KEMhRSsiyGXK2dOXQnJBQY.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Continuaremos escribiendo `yes`. El cliente SSH añadirá el servidor al fichero `$HOME/.ssh/known_hosts` y procederá el establecimiento de la conexión.

Es ahora cuando el servidor comprueba la disponibilidad del usuario `user1` y pide al cliente que escriba la contraseña del usuario `user1`. Si la hemos escrito correctamente se habilitará una shell en el servidor remoto donde habremos iniciado sesión con el usuario `user1`:

```
user1@192.168.33.10's password:
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-42-generic x86_64)

...

user1@ubuntu-server:~$
```

A partir de aquí podemos ejecutar cualquier comando que necesitemos en la máquina remota. Para salir de la sesión podemos escribir el comando `exit` o pulsar la combinación de teclas `Ctrl + D`:

```bash
$ exit
```

Salida:

```
logout
Connection to 192.168.33.10 closed.
vagrant@ubuntu-client:~$
```

En el cliente, dentro de el directorio `$HOME` del nuestro usuario (`/home/vagrant`) tendremos creado el directorio `.ssh` con un fichero especial llamado `known_hosts` que contendrá aproximadamente lo siguiente:

```bash
cat ~/.ssh/known_hosts
192.168.33.10 ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEsI3GUBDyp4SX5aoBK19dv1Kp6NmvCLS6nDLMJ5vPKYeWPp7QEGA1zEZ9qIZsEgwQjiI79L+5px9uUDMdn+gK4=
```

Este fichero se encarga de almacenar las identidades de todos los servidores a los que nos hemos conectado. Cada línea contiene el nombre de host o un hash que lo representa, el algoritmo de encriptación de la clave pública del servidor, la clave pública del servidor y, opcionalmente un comentario.

En el servidor, las claves SSH del servicio SSH están almacenadas en `/etc/ssh`. Suelen tener generadas varias claves utilizando diferentes algoritmos de encriptación para soportar una mayor compatibilidad con los clientes:

```bash
vagrant@ubuntu-server:~$ ls /etc/ssh
moduli      ssh_config.d  sshd_config.d       ssh_host_ecdsa_key.pub  ssh_host_ed25519_key.pub  ssh_host_rsa_key.pub
ssh_config  sshd_config   ssh_host_ecdsa_key  ssh_host_ed25519_key    ssh_host_rsa_key          ssh_import_id
```

Podemos ver que tiene los pares de claves con los algoritmos RSA, ED25519 y ECDSA. Estas claves son añadidas por defecto mediante la directiva `HostKey` del fichero de configuración `/etc/ssh/sshd_config`:

```
HostKey
        Specifies a file containing a private host key used by SSH.  The defaults are /etc/ssh/ssh_host_ecdsa_key, /etc/ssh/ssh_host_ed25519_key and
        /etc/ssh/ssh_host_rsa_key.
```

> Información recogida de `man sshd_config`

## Comandos remotos

Hasta ahora hemos visto conexiones remotas donde el servidor SSH nos aprovisiona una terminal remota para ejecutar lo que queramos. Es muy común realizar conexiones SSH desatendidas donde el cliente establece una conexión para realizar varios comandos y salir inmediatamente de forma automática. Para ejecutar un comando remoto basta con escribir el comando a continuación de la conexión SSH.

Vamos a ver un ejemplo donde veremos el nombre de máquina del servidor SSH:

```
vagrant@ubuntu-client:~$ ssh vagrant@192.168.33.10 hostname
vagrant@192.168.33.10's password:
ubuntu-server
vagrant@ubuntu-client:~$
```

Podemos ejecutar múltiples comandos si los encerramos en una cadena de texto. En este ejemplo recopilamos datos del servidor y los almacenamos en `server-info.txt` en el cliente:

```
vagrant@ubuntu-client:~$ ssh vagrant@192.168.33.10 '
echo "Server IPs: `hostname --all-ip-addresses`"
echo "Server name: `hostname`"
echo "Server uptime: `uptime -p`"
' > server-info.txt
vagrant@192.168.33.10's password:
vagrant@ubuntu-client:~$ cat server-info.txt
Server IPs: 10.0.2.15 192.168.33.10
Server name: ubuntu-server
Server uptime: up 2 days, 48 minutes
```
