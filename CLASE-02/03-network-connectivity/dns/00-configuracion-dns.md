# Configuración DNS

## Resolución de nombres local

Podemos añadir entradas de resolución de DNS al fichero `/etc/hosts`. Este fichero sirve como una tabla estática para la resolución de nombres.

```shell
$ cat /etc/hosts
127.0.0.1       localhost
127.0.1.1       vagrant.vm      vagrant

## The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
127.0.2.1 ubuntu-client ubuntu-client
```

Podemos observar que el nombre `localhost` apuntan a la IP `127.0.0.1` y `vagrant.vm` además de `vagrant` apuntan a la `127.0.1.1`.

> Las IPs dentro del rango de red `127.0.0.0/8`, es decir desde `127.0.0.1` a `127.255.255.254` apuntan a la interfaz `LO` o `loopback`. Esta **interfaz de red virtual** existe con el propósito de mantener la conexión entre servicios locales sin depender de otras interfaces de red externas que puedan estar activas o no basándose en dispositivos de hardware.

La tabla de resoluciones tiene el siguiente formato:

```
IP_ADDRESS-1  HOSTNAME-1  HOSTNAME-2  ... HOSTNAME-N
IP_ADDRESS-2  HOSTNAME-1  HOSTNAME-2  ... HOSTNAME-N
...
IP_ADDRESS-N  HOSTNAME-1  HOSTNAME-2  ... HOSTNAME-N
```

Cuando un servicio requiere una resolución de nombres primero busca en esta tabla antes de realizar peticiones a servidores DNS externos.

Vamos a añadir el siguiente registro:

```
127.0.1.2   myvirtualmachine.com
```

Una vez añadido vamos a verificar su resolución y conectividad:

```shell
$ nslookup myvirtualmachine.com
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   myvirtualmachine.com
Address: 127.0.1.2

$ ping -c 3 myvirtualmachine.com
PING myvirtualmachine.com (127.0.1.2) 56(84) bytes of data.
64 bytes from myvirtualmachine.com (127.0.1.2): icmp_seq=1 ttl=64 time=0.014 ms
64 bytes from myvirtualmachine.com (127.0.1.2): icmp_seq=2 ttl=64 time=0.025 ms
64 bytes from myvirtualmachine.com (127.0.1.2): icmp_seq=3 ttl=64 time=0.035 ms

--- myvirtualmachine.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2044ms
rtt min/avg/max/mdev = 0.014/0.024/0.035/0.008 ms
```

## Resolución de nombres remota

La configuración de DNS viene establecida en el fichero `/etc/resolv.conf`. En sistemas Linux modernos que utilizan **systemd** la resolución de nombres de DNS es establecida por el servicio **systemd-resolved**.

Por defecto este servicio opera sobre el fichero `/run/systemd/resolve/stub-resolv.conf` y es usado como enlace simbólico para el fichero `/etc/resolv.conf`:

```shell
$ ls -l /etc/resolv.conf
lrwxrwxrwx 1 root root 39 Aug 16 03:29 /etc/resolv.conf -> ../run/systemd/resolve/stub-resolv.conf
```

Si inspeccionamos el contenido de `/etc/resolv.conf` podemos ver comentarios sobre el servicio _systemd-resolved_.

Las entradas de servidores DNS configuradas tienen la siguiente sintaxis

```
nameserver <ip_address1>
nameserver <ip_address2>
...
nameserver <ip_addressN>
```

El servidor `127.0.0.53` que vemos como servidor de nombre en el fichero `/etc/resolv.conf` es un servidor falso sobre la interfaz local loopback.

Este fichero no debería de ser manipulado directamente ya que es regenerado cuando el sistema inicia. Si queremos añadir servidores DNS tenemos varias alternativas. Una de ellas es instalar `resolvconf`.

El servicio `resolvconf` interopera con `systemd-resolve` añadiendo a `/etc/resolv.conf` las entradas que necesitemos de forma automática.

Primero debemos instalarlo:

```shell
# apt-get install resolvconf
```

Este servicio está disponible como demonio de sistema. Podemos ver su estado mediante:

```shell
$ vagrant@ubuntu-client:~$ systemctl status resolvconf
● resolvconf.service - Nameserver information manager
     Loaded: loaded (/lib/systemd/system/resolvconf.service; enabled; vendor preset: enabled)
     Active: active (exited) since Sun 2020-09-27 21:10:02 UTC; 11s ago
       Docs: man:resolvconf(8)
   Main PID: 1722 (code=exited, status=0/SUCCESS)
      Tasks: 0 (limit: 1074)
     Memory: 0B
     CGroup: /system.slice/resolvconf.service

Aug 27 21:10:02 ubuntu-client systemd[1]: Started Nameserver information manager.
Aug 27 21:10:02 ubuntu-client resolvconf[1730]: /etc/resolvconf/update.d/libc: Warning: /etc/resolv.conf is not a symbolic link to /run/resolvconf/resolv.conf
```

Vemos que el servicio está iniciado y configurado para que inicie al arrancar el sistema, pero detecta que el fichero `/etc/resolv.conf` sigue apuntando a `/run/systemd/resolve/stub-resolv.conf` y no a `/run/resolvconf/resolv.conf`. Para arreglarlo reiniciamos el servicio `resolvconf`:

```shell
# systemctl restart resolvconf
```

Vemos ahora que el fichero `/etc/resolv.conf` es manejado ahora por el servicio **resolvconf**:

```shell
$ ls -l /etc/resolv.conf
lrwxrwxrwx 1 root root 29 Aug 27 21:10 /etc/resolv.conf -> ../run/resolvconf/resolv.conf
```

Los ficheros de configuración se encuentran en `/etc/resolvconf/resolv.conf.d/`. En ellos tenemos:

- `base`: El contenido no es incluido en `/etc/resolv.conf`. Este fichero contiene información básica del _resolver_ en uso.
- `head`: El contenido se añadirá al principio de `/etc/resolv.conf`
- `original`: Enlace a `/run/systemd/resolve/stub-resolv.conf`
- `tail`: El contenido se añadirá al final de `/etc/resolv.conf`

El fichero `/etc/resolvconf/resolv.conf.d/head` añadiremos las entradas que necesitemos. Vamos a añadir un par de servidores DNS:

```
# Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
#     DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
# 127.0.0.53 is the systemd-resolved stub resolver.
# run "systemd-resolve --status" to see details about the actual nameservers.

nameserver 8.8.8.8
nameserver 1.1.1.1
```

Aplicaremos la configuración mediante:

```
# resolvconf -u
```

Si observamos el fichero `/etc/resolv.conf` vemos que ha sido actualizado con la información nuestra y se antepone al servidor falso local:

```
$ cat /etc/resolv.conf
# Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
#     DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
# 127.0.0.53 is the systemd-resolved stub resolver.
# run "systemd-resolve --status" to see details about the actual nameservers.

nameserver 8.8.8.8
nameserver 1.1.1.1

nameserver 127.0.0.53
options edns0
```

Verificamos que se utilizan los servidores:

```
$ nslookup google.com
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
Name:   google.com
Address: 216.58.209.78
Name:   google.com
Address: 2a00:1450:4003:801::200e
```
