# SCP

El comando SCP se utiliza para copiar ficheros entre hosts en una red. Utiliza el protocolo SSH para transferir la información y provee la misma seguridad que `ssh` ya que utiliza el mismo sistema de autentificación. SCP pedirá tanto contraseñas como _passphrases_ si son requeridas para la autenticación.

Partiremos creando un fichero en el cliente con datos de forma aleatoria:

```
vagrant@ubuntu-client:~$ base64 /dev/urandom | head -c $((20 * 1024)) > file1.txt
```

Para copiar el fichero al servidor especificamos primero la ruta de nuestro fichero local y tras la cadena de conexión al servidor la ruta destino precedida de `:`:

```
vagrant@ubuntu-client:~$ scp ./file.txt ubuntu-server:/home/vagrant/
file.txt                             100%   20KB   7.0MB/s   00:00
vagrant@ubuntu-client:~$
```

Podemos ver si existe en servidor directamente utilizando `ls`:

```
vagrant@ubuntu-client:~$ ssh ubuntu-server ls
file.txt
vagrant@ubuntu-client:~$
```

También podemos verificar la integridad del fichero mediante hashing:

```
vagrant@ubuntu-client:~$ sha1sum file.txt
d70fc9e8b3751a775ffd687458801e984890ca3d  file.txt
vagrant@ubuntu-client:~$ ssh ubuntu-server sha1sum file.txt
d70fc9e8b3751a775ffd687458801e984890ca3d  file.txt
vagrant@ubuntu-client:~$
```

Podemos copiar el fichero desde el servidor a nuestro local utilizando otro nombre destino:

```
vagrant@ubuntu-client:~$ scp ubuntu-server:/home/vagrant/file.txt ./file-from-server.txt
file.txt                             100%   20KB   9.9MB/s   00:00
vagrant@ubuntu-client:~$ ls
file-from-server.txt  file.txt
vagrant@ubuntu-client:~$
```

Vamos a generar más ficheros en cliente:

```
vagrant@ubuntu-client:~$ for i in {1..3}; do base64 /dev/urandom | head -c $((20 * 1024)) > file${i}.txt; done
vagrant@ubuntu-client:~$ ls
file-from-server.txt  file.txt  file1.txt  file2.txt  file3.txt
vagrant@ubuntu-client:~$
```

Para copiar múltiples ficheros basta con referenciarlos separándolos por espacios:

```
vagrant@ubuntu-client:~$ scp ./file1.txt ./file2.txt ./file3.txt ubuntu-server:/home/vagrant/
file1.txt                             100%   20KB  11.1MB/s   00:00
file2.txt                             100%   20KB  14.0MB/s   00:00
file3.txt                             100%   20KB  13.4MB/s   00:00
vagrant@ubuntu-client:~$
```

Podemos copiar estructuras de directorios de forma recursiva utilizando el flag `-r`. Vamos a hacer
la prueba copiando los logs del servidor al cliente:

```
vagrant@ubuntu-client:~$ scp -r ubuntu-server:/var/log/ ./
wtmp                                                        100%   18KB  11.6MB/s   00:00
system.journal                                              100% 8192KB  82.5MB/s   00:00
user-1000.journal                                           100% 8192KB  80.6MB/s   00:00
user-1001.journal                                           100% 8192KB  81.6MB/s   00:00
system.journal                                              100% 8192KB  79.0MB/s   00:00
user-1000.journal                                           100% 8192KB  83.9MB/s   00:00
dmesg.0                                                     100%    0     0.0KB/s   00:00
faillog                                                     100%   31KB  22.7MB/s   00:00
vboxadd-setup.log                                           100%   61   100.9KB/s   00:00
syslog                                                      100%   42KB  24.0MB/s   00:00
auth.log                                                    100%   54KB  29.2MB/s   00:00
scp: /var/log/ubuntu-advantage.log: Permission denied
scp: /var/log/boot.log: Permission denied
dmesg                                                       100%   42KB  26.0MB/s   00:00
syslog.1                                                    100% 7446     7.7MB/s   00:00
scp: /var/log/btmp: Permission denied
vboxadd-install.log                                         100%    0     0.0KB/s   00:00
lastlog                                                     100%  286KB  52.1MB/s   00:00
vboxadd-setup.log.1                                         100%    0     0.0KB/s   00:00
syslog.2.gz                                                 100%   20KB  18.1MB/s   00:00
vboxadd-setup.log.2                                         100%    0     0.0KB/s   00:00
alternatives.log                                            100%    0     0.0KB/s   00:00
bootstrap.log                                               100%    0     0.0KB/s   00:00
sysinfo.log                                                 100%    0     0.0KB/s   00:00
dpkg.log                                                    100% 1419     1.9MB/s   00:00
history.log                                                 100%  317   519.4KB/s   00:00
term.log                                                    100% 1654     1.9MB/s   00:00
eipp.log.xz                                                 100%   21KB  17.9MB/s   00:00
scp: /var/log/private: Permission denied
kern.log                                                    100%   48KB  23.6MB/s   00:00
vagrant@ubuntu-client:~$ ls log
alternatives.log  auth.log       dist-upgrade  dmesg.0   faillog  kern.log   lastlog  syslog.1     vboxadd-install.log  vboxadd-setup.log.1  wtmp
apt               bootstrap.log  dmesg         dpkg.log  journal  landscape  syslog   syslog.2.gz  vboxadd-setup.log    vboxadd-setup.log.2
```
