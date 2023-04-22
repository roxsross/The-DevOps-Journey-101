# Conexión mediante claves públicas

OpenSSH permite la autentificación mediante clave pública. Para usar este método necesitaremos generar en el cliente un par de claves. El comando `ssh-keygen` es una utilidad que nos permite generar nuevas claves de autenticación.

Existen varios tipos de claves, cada una utiliza un método diferente de generación. La más común y compatible es RSA.

Al ejecutar el comando `ssh-keygen` se nos presentará un formulario interactivo donde especificaremos una ruta para guardar la clave y opcionalmente una contraseña:

```bash
vagrant@ubuntu-client:~$ ssh-keygen
```

Salida:

```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/vagrant/.ssh/id_rsa): /home/vagrant/.ssh/vagrant_ubuntu-server
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/vagrant/.ssh/vagrant_ubuntu-server
Your public key has been saved in /home/vagrant/.ssh/vagrant_ubuntu-server.pub
The key fingerprint is:
SHA256:+Y6itY+e8pbqoIDAuqBjljOZGN9Fm/PnJWvL8nCr1gk vagrant@ubuntu-client
The key's randomart image is:
+---[RSA 3072]----+
|                 |
|                 |
|                 |
|.     .  .       |
|..   . oS        |
|=     = E.       |
|*o=. ..+.o+..    |
|*@..o.+++*==     |
|*.o.+B*++BO.     |
+----[SHA256]-----+
```

Se creará la carpeta `.ssh` dentro de nuestro `$HOME` y añadirá las dos claves creadas:

- `vagrant_ubuntu-server`: Es la clave privada. Debe mantenerse oculta y lo más segura posible.
- `vagrant_ubuntu-server.pub`: Es la clave pública. Es la clave que será usada como identidad y que utilizarán los servidores para comprobar en su lista de claves permitidas.

Una vez tengamos las claves creadas debemos añadir nuestra clave pública (`vagrant_ubuntu-server.pub`) a la lista de claves permitidas en el servidor. Para ello desde el servidor añadiremos el contenido de nuestra clave pública al fichero `.ssh/authorized_keys` dentro de la carpeta del usuario al que queremos acceder.

Para ver el contenido de la clave pública utilizaremo `cat`:

```bash
vagrant@ubuntu-client:~$ cat .ssh/vagrant_ubuntu-server.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC2d7Z+F8/SIFMmM7n8AIdnc/uWfP5ExtRk7gdQ7XvoE2uEpnzMsKAVHf0AM3jO8ZBUmq6EtM+lAsVnJbPP0eH0zgtq4vNAZ+irYGadIgF0uWtDvgucttbVV+rLeJqEJ781RLFqnSIIrGLgDN65Z06oGds1tHMJKnSs4WyILtRoMGmERl+Ozjfj8Z6uH+cQa4TkSMAV7B6m5mKA5YSB91vgtXrzX/vNOG0xs0ReVbzK54i6425aICdkQtR3VQKEhf4RV0Pt/I8Tr3Ft/X5sxdU8WipZE33AAbIaF2qMdwWG8f0pgu4r/ii0hlCwrRQV54s7zqLukwXw5vHuAHLQdDNXti1SJc8AznhvNsGk94tUwMn6PJi98V4g9JgEc0PYJ/Bk6M81j0qaTx6iGxHJJJYKWh0KL2oVW7/Xf+2P3XZiMDceSj1Zm4utP0xlHuAMe7a2RLxKnWQtzrWcOOSKIUGK8XTM9bTgrPxIEH3nWzOgRxlHR4OZLtgPmZo5v8VCp/8= vagrant@ubuntu-client
```

Para añadir el contenido de la clave pública al fichero `.ssh/authorized_keys` del servidor podemos hacerlo utilizando `echo` y redirección:

```bash
vagrant@ubuntu-server:~$ echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC2d7Z+F8/SIFMmM7n8AIdnc/uWfP5ExtRk7gdQ7XvoE2uEpnzMsKAVHf0AM3jO8ZBUmq6EtM+lAsVnJbPP0eH0zgtq4vNAZ+irYGadIgF0uWtDvgucttbVV+rLeJqEJ781RLFqnSIIrGLgDN65Z06oGds1tHMJKnSs4WyILtRoMGmERl+Ozjfj8Z6uH+cQa4TkSMAV7B6m5mKA5YSB91vgtXrzX/vNOG0xs0ReVbzK54i6425aICdkQtR3VQKEhf4RV0Pt/I8Tr3Ft/X5sxdU8WipZE33AAbIaF2qMdwWG8f0pgu4r/ii0hlCwrRQV54s7zqLukwXw5vHuAHLQdDNXti1SJc8AznhvNsGk94tUwMn6PJi98V4g9JgEc0PYJ/Bk6M81j0qaTx6iGxHJJJYKWh0KL2oVW7/Xf+2P3XZiMDceSj1Zm4utP0xlHuAMe7a2RLxKnWQtzrWcOOSKIUGK8XTM9bTgrPxIEH3nWzOgRxlHR4OZLtgPmZo5v8VCp/8= vagrant@ubuntu-client" >> .ssh/authorized_keys
```

En este caso hemos añadido la clave al usuario `vagrant` del servidor. Para realizar la conexión al servidor utilizando la clave añadiremos el parámetro `-i ~/.ssh/vagrant_ubuntu-server` al comando `ssh`:

```bash
vagrant@ubuntu-client:~$ ssh -i ~/.ssh/vagrant_ubuntu-server vagrant@192.168.33.10
```

Si todo ha ido bien estaremos dentro del servidor SSH.

Sin embargo si queremos iniciar sesión con el usuario `user1` ignorará la clave y nos pedirá su contraseña debido a que nuestra clave no está en la lista de claves permitidas para ese usuario:

```bash
vagrant@ubuntu-client:~$ ssh -i ~/.ssh/vagrant_ubuntu-server user1@192.168.33.10
user1@192.168.33.10's password:
```

Vamos a generar una clave SSH para el usuario `user1` pero esta vez no utilizaremos una clave RSA. Vamos a generar una clave del tipo Ed25519 con _passphrase_:

```bash
vagrant@ubuntu-client:~$ ssh-keygen -a 100 -t ed25519
```

Salida:

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/vagrant/.ssh/id_ed25519): /home/vagrant/.ssh/user1_ubuntu-server
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/vagrant/.ssh/user1_ubuntu-server
Your public key has been saved in /home/vagrant/.ssh/user1_ubuntu-server.pub
The key fingerprint is:
SHA256:qABMKlE0AoKqPK0z2H13qSfInSdfpyEX0jFom1JEMEo vagrant@ubuntu-client
The key's randomart image is:
+--[ED25519 256]--+
|B++   E ooo      |
|*o . . . o .     |
|=.    .   + o    |
|o.     . o + o   |
|o o   . S + o    |
|.o o .   . . .   |
|..o... o ...+ .  |
|.+. . + * =+ +   |
|  o  . ..O. .    |
+----[SHA256]-----+
```

Esta vez hemos utilizado el flag `-a 100` para incrementar el número de rondas utilizadas para generar la clave. A más grande el número más lenta será la verificación del _passphrase_ y mayor la resistencia contra ataques de fuerza bruta para desencriptar el _passphrase_.

> NOTA: Las claves ECDSA, Ed25519 y derivados tienen longitud fija por lo que el flag `-a` es útil para incrementar la seguridad de la clave. Para claves de tipo RSA, DSA o ECDSA se puede incrementar el número de bits utilizados utilizando el flag -b. Por defecto la clave que generamos anteriormente utiliza 3072 bits. Podemos crear una clave un poco más segura incrementando sus bits a 4096. Ejemplo:
>
> ```bash
> vagrant@ubuntu-client:~$ ssh-keygen -t rsa -b 4096
> ```
>
> Más información sobre los diferentes tipos de claves y su seguridad [en este enlace](https://medium.com/risan/upgrade-your-ssh-key-to-ed25519-c6e8d60d3c54).

Añadiremos nuestra nueva clave Ed25519 al fichero `authorized_keys` del usuario `user1`. Para ello entraremos con el usuario `user1` y añadiremos nuestra nueva clave

Desde el cliente mostraremos el contenido de la clave **pública**:

```bash
vagrant@ubuntu-client:~$ cat ~/.ssh/user1_ubuntu-server.pub
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKZonEU9JAtjdkdwSN8ycL9FvqhQ7JBAaHY4qOVJgtTi vagrant@ubuntu-client
```

Desde el servidor realizaremos los siguientes pasos:

- Nos autentificaremos como `user1`
- Crearemos la carpeta `.ssh/` dentro del `$HOME` de `user1`
- Volcaremos el contenido de la clave pública del cliente en el fichero `authorized_keys`
- Saldremos de la sesión de `user1`

```bash
vagrant@ubuntu-server:~$ su user1
Password:
user1@ubuntu-server:/home/vagrant$ cd
user1@ubuntu-server:~$ ls .ssh
ls: cannot access '.ssh': No such file or directory
user1@ubuntu-server:~$ mkdir .ssh
user1@ubuntu-server:~$ echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKZonEU9JAtjdkdwSN8ycL9FvqhQ7JBAaHY4qOVJgtTi vagrant@ubuntu-client" >> ~/.ssh/authorized_keys
user1@ubuntu-server:~$ exit
exit
vagrant@ubuntu-server:~$
```

Probaremos nuestra nueva clave para autenticarnos como `user1` en el servidor:

```bash
vagrant@ubuntu-client:~$ ssh -i ~/.ssh/user1_ubuntu-server user1@192.168.33.10
Enter passphrase for key '/home/vagrant/.ssh/user1_ubuntu-server':
```

Si todo ha ido bien estaremos dentro del servidor SSH.

Si queremos eliminar la clave pública del servidor bastará con eliminar la clave del fichero `authorized_keys`.

## Fichero de configuración SSH en cliente

Cuando tenemos muchas máquinas a las que acceder, cada una con diferentes puertos y claves es muy común perderse con qué clave y puerto se tiene que acceder a qué servidor. En la máquina cliente es posible crear un fichero de configuración de SSH donde se pueden generar entradas de conexiones para que el comando SSH sepa con qué opciones conectar al servidor. El cliente SSH comparará el host con todas las entradas de conexiones en dicho fichero y elegirá la primera que coincida. Vamos a generar el fichero `.ssh/config` con el siguiente valor:

```
vagrant@ubuntu-client:~$ echo '
Host 192.168.33.10
  HostName 192.168.33.10
  IdentityFile ~/.ssh/vagrant_ubuntu-server
' > ~/.ssh/config
```

> La sentencia `Host` se utiliza para diferenciar a un host de otro. Es simplemente una serie de nombres o IPs separadas por espacios.

Vamos a establecer una conexión especificando únicamente el host:

```
vagrant@ubuntu-client:~$ ssh 192.168.33.10
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-42-generic x86_64)
...
vagrant@ubuntu-server:~$
```

Vamos a añadir un nuevo patrón a la cláusula `Host` con el nombre de `ubuntu-server`. El fichero `config` quedará de la siguiente manera:

```
Host 192.168.33.10 ubuntu-server
  HostName 192.168.33.10
  IdentityFile ~/.ssh/vagrant_ubuntu-server
```

Podemos conectanos ahora utilizando `ssh ubuntu-server`:

```
vagrant@ubuntu-client:~$ ssh ubuntu-server
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-42-generic x86_64)
...
vagrant@ubuntu-server:~$
```

Si intentamos acceder con el usuario `user1` veremos que nos pedirá la contraseña:

```
vagrant@ubuntu-client:~$ ssh user1@ubuntu-server
user1@192.168.33.10's password:
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-42-generic x86_64)
...
user1@ubuntu-server:~$
```

Podemos añadir la clave que generamos para `user1` a nuestro fichero `.ssh/config` para que la utilice de forma automática. El fichero quedará de la siguiente manera:

```
Host 192.168.33.10 ubuntu-server
  HostName 192.168.33.10
  IdentityFile ~/.ssh/vagrant_ubuntu-server
  IdentityFile ~/.ssh/user1_ubuntu-server
```

Probamos ahora a conectarnos con `user1`:

```
vagrant@ubuntu-client:~$ ssh user1@ubuntu-server
Enter passphrase for key '/home/vagrant/.ssh/user1_ubuntu-server':
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-42-generic x86_64)
...
user1@ubuntu-server:~$
```
