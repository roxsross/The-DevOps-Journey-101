# Comandos de gestión de red

## ping

El comando ping se utiliza para enviar mensajes ICMP a un host (IP o dominio). ICMP (Internet Control Message Protocol) es un protocolo que pertenece al grupo de protocolos de internet como DHCP, FTP, HTTP, etc que se utiliza con fines de diagnóstico o comprobación de respuestas de un equipo. Básicamente utilizaremos ping verificar que la máquina destino responde y su tiempo de respuesta.

```shell
$ ping www.google.com
```

Por defecto envía un mensaje por segundo de forma constante hasta que paremos el proceso utilizando `Ctrl + C`. Podemos especificar el número de paquetes a enviar con `-c <number>`:

```shell
$ ping -c 3 www.google.com
PING www.google.com (172.217.17.4) 56(84) bytes of data.
64 bytes from mad07s09-in-f4.1e100.net (172.217.17.4): icmp_seq=1 ttl=63 time=23.8 ms
64 bytes from mad07s09-in-f4.1e100.net (172.217.17.4): icmp_seq=2 ttl=63 time=23.8 ms
64 bytes from mad07s09-in-f4.1e100.net (172.217.17.4): icmp_seq=3 ttl=63 time=25.0 ms

--- www.google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 23.759/24.188/24.985/0.563 ms
```

Tiene otras opciones interesantes como `-i <number>` para especificar el intervalo de espera entre envíos, `-4` o `-6` para utilizar IPv4 ó IPv6 respectivamente; o `-I <iface>` para indicar desde qué interfaz o IP de red enviar los paquetes.

## traceroute

El comando `traceroute` viene en el paquete `traceroute` que no está instalado en Ubuntu por defecto y proporciona información de los saltos entre nodos de red para llegar a la IP destino:

```shell
$ traceroute www.google.com
traceroute to www.google.com (216.58.211.36), 30 hops max, 60 byte packets
 1  _gateway (10.0.2.2)  0.103 ms  0.067 ms  0.075 ms
 2  192.168.1.1 (192.168.1.1)  0.799 ms  0.789 ms  0.862 ms
 3  10.195.103.1 (10.195.103.1)  19.217 ms  19.209 ms  19.198 ms
 4  10.254.45.33 (10.254.45.33)  11.727 ms  11.712 ms  11.695 ms
 5  10.179.37.89 (10.179.37.89)  32.300 ms 212.166.147.222 (212.166.147.222)  23.803 ms 10.179.37.89 (10.179.37.89)  32.231 ms
 6  108.170.253.225 (108.170.253.225)  23.740 ms 212.166.147.22 (212.166.147.22)  24.775 ms 10.252.37.158 (10.252.37.158)  24.741 ms
 7  108.170.233.246 (108.170.233.246)  27.754 ms 108.170.234.221 (108.170.234.221)  23.404 ms 72.14.233.124 (72.14.233.124)  21.386 ms
 8  72.14.233.124 (72.14.233.124)  21.381 ms 74.125.242.178 (74.125.242.178)  28.102 ms 74.125.253.200 (74.125.253.200)  25.029 ms
 9  mad08s05-in-f4.1e100.net (216.58.211.36)  29.416 ms  24.943 ms 108.170.234.221 (108.170.234.221)  31.983 ms
```

## nslookup

El comando `nslookup` se utiliza para resolver direcciones de nombre a IP:

```shell
$ nslookup as.com
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   as.com
Address: 199.232.194.133
Name:   as.com
Address: 199.232.198.133
```

## ip

El comando `ip` se utiliza para manipular interfaces, redes y enrutamiento. Tiene una gran variedad de sub-comandos (`link`, `route`, `address`, `tunnel`, `rule`, etc), veremos algunos más útiles.

Para ver el listado de interfaces utilizaremos `ip link show`:

```shell
$ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:2f:66:f7 brd ff:ff:ff:ff:ff:ff
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:d4:68:c3 brd ff:ff:ff:ff:ff:ff
```

Para ver el listado de interfaces con sus IPs utilizaremos `ip address show`:

```shell
$ ip address show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:2f:66:f7 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic eth0
       valid_lft 82689sec preferred_lft 82689sec
    inet6 fe80::a00:27ff:fe2f:66f7/64 scope link
       valid_lft forever preferred_lft forever
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:d4:68:c3 brd ff:ff:ff:ff:ff:ff
    inet 192.168.33.20/24 brd 192.168.33.255 scope global eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fed4:68c3/64 scope link
       valid_lft forever preferred_lft forever
```

Para activar o desactivar interfaces de red utilizaremos `ip link set dev <iface> down/up`:

```shell
$ ip link show eth1
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:d4:68:c3 brd ff:ff:ff:ff:ff:ff

# ip link set dev eth1 down

$ ip link show eth1
3: eth1: <BROADCAST,MULTICAST> mtu 1500 qdisc fq_codel state DOWN mode DEFAULT group default qlen 1000
    link/ether 08:00:27:d4:68:c3 brd ff:ff:ff:ff:ff:ff

# ip link set dev eth1 up

$ ip link show eth1
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:d4:68:c3 brd ff:ff:ff:ff:ff:ff
```

Para ver la tabla de enrutamiento utilizaremos `ip route`:

```shell
$ ip route
default via 10.0.2.2 dev eth0 proto dhcp src 10.0.2.15 metric 100
10.0.2.0/24 dev eth0 proto kernel scope link src 10.0.2.15
10.0.2.2 dev eth0 proto dhcp scope link src 10.0.2.15 metric 100
192.168.33.0/24 dev eth1 proto kernel scope link src 192.168.33.20
```

Para añadir una nueva entrada a la tabla de enrutamientos para una interfaz específica haremos: `ip route add <ip_adress> dev <iface>`:

```shell
# ip route add 172.16.0.42 dev eth1

$ ip route
default via 10.0.2.2 dev eth0 proto dhcp src 10.0.2.15 metric 100
10.0.2.0/24 dev eth0 proto kernel scope link src 10.0.2.15
10.0.2.2 dev eth0 proto dhcp scope link src 10.0.2.15 metric 100
172.16.0.42 dev eth1 scope link
192.168.33.0/24 dev eth1 proto kernel scope link src 192.168.33.20
```

Para eliminar la entrada añadida utilizaremos con el subcomando `del`:

```shell
# ip route del 172.16.0.42 dev eth1

$ ip route
default via 10.0.2.2 dev eth0 proto dhcp src 10.0.2.15 metric 100
10.0.2.0/24 dev eth0 proto kernel scope link src 10.0.2.15
10.0.2.2 dev eth0 proto dhcp scope link src 10.0.2.15 metric 100
192.168.33.0/24 dev eth1 proto kernel scope link src 192.168.33.20
```

> [!] Nota importante: las instrucciones realizadas con el comando `ip` como alteraciones de la tabla de enrutamiento o cambios de interfaces desaparecen si la máquina es reiniciada. Para que persistan es mejor traducirlas a otro lenguaje o utilizar otra herramienta como `systemd` o manipular los ficheros de `/etc/network`.
