# Comandos de gestión del entorno

## top

El comando `top` es un comando para monitorizar los procesos en tiempo real. Se utiliza para mostrar un resumen de la información del sistema y el listado de procesos o hilos siendo manejados por el kernel de Linux. En la tabla podemos ver información como:

- Tiempo de actividad.
- Usuarios logueados.
- Media de carga del sistema
- Total de tareas y media de carga
- Estado de la CPU
- Estado de la RAM
- Estado de la SWAP (Memoria virtual)

Por cada proceso se puede ver:

- PID - identificador de proceso.
- USER - login del usuario que ejecutó el proceso.
- PR - prioridad del proceso a nivel de kernel (`rt` significa tiempo real).
- NI - prioridad del proceso a nivel de usuario. El valor más prioritario es `-20` y el menor 19.
- VIRT - cantidad de memoria virtual utilizada por el proceso.
- RES - cantidad de memoria física utilizada por el proceso.
- SHR - memoria compartida.
- S - estado del proceso. Puede ser:
  - D = uninterruptible sleep
  - I = idle
  - R = running
  - S = sleeping
  - T = stopped by job control signal
  - t = stopped by debugger during trace
  - Z = zombie
- %CPU - Porcentaje de CPU usado por el proceso.
- %MEM - Porcentaje de RAM utilizada por el proceso.
- TIME+ - Tiempo total que el sistema ha tenido el proceso activo.
- COMMAND - Comando para iniciar el proceso.

El comando `top` es interactivo y permite al usuario alterar la visualización. Presionando `h` vemos un menú de ayuda.

```
$ top

top - 18:57:15 up  1:39,  2 users,  load average: 0.01, 0.02, 0.00
Tasks:  92 total,   1 running,  91 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1987.8 total,   1466.8 free,     95.6 used,    425.4 buff/cache
MiB Swap:    980.0 total,    980.0 free,      0.0 used.   1737.6 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
      1 root      20   0  101928  11248   8280 S   0.0   0.6   0:00.84 systemd
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kthreadd
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-kblockd
      8 root      20   0       0      0      0 I   0.0   0.0   0:00.44 kworker/u2:0-events_power_efficient
      9 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 mm_percpu_wq

```

## htop

El comando `htop` es otro programa para monitorizar procesos con una interfaz más renovada. Permite además interactuar con el ratón también.

```
$ htop

  CPU[|||                                                                           0.0%]   Tasks: 29, 21 thr; 1 running
  Mem[||||||||||||||||||||||                                               96.3M/1.94G]   Load average: 0.05 0.03 0.00
  Swp[                                                                         0K/980M]   Uptime: 01:40:45

    PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
  13064 vagrant    20   0  100M  3340    16 S  0.0  0.2  0:00.00 (sd-pam)
  13142 vagrant    20   0 11560  4548  3900 S  0.0  0.2  0:00.03 -bash
  13298 root       20   0 13928  9060  7600 S  0.0  0.4  0:00.00 sshd: user1 [priv]
  13311 user1      20   0 18528  9752  8172 S  0.0  0.5  0:00.04 /lib/systemd/systemd --user
  13312 user1      20   0  100M  3356    16 S  0.0  0.2  0:00.00 (sd-pam)
  13412 user1      20   0 13928  6028  4544 S  0.0  0.3  0:00.00 sshd: user1@pts/1
  13413 user1      20   0 10036  4156  3576 S  0.0  0.2  0:00.00 -bash
F1Help  F2Setup F3Search F4Filter F5Tree  F6SortBy F7Nice -F8Nice +F9Kill  F10Quit
```

## free

El comando `free` muestra la cantidad de memoria libre y en uso del sistema.

Admite diferentes flags para mostrar en diferentes base (`-k` en KB, `-m` en MB, `-g` en GB, `-h` _human readable_, etc).

```
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          1.9Gi        95Mi       1.4Gi       0.0Ki       425Mi       1.7Gi
Swap:         979Mi          0B       979Mi
```

## df

El comando `df` muestra un resumen del uso de disco del sistema.

```
$ df -h
Filesystem                  Size  Used Avail Use% Mounted on
udev                        952M     0  952M   0% /dev
tmpfs                       199M  672K  199M   1% /run
/dev/mapper/vgvagrant-root   62G  1.5G   57G   3% /
tmpfs                       994M     0  994M   0% /dev/shm
tmpfs                       5.0M     0  5.0M   0% /run/lock
tmpfs                       994M     0  994M   0% /sys/fs/cgroup
/dev/sda1                   511M  4.0K  511M   1% /boot/efi
vagrant                     1.9T  1.4T  485G  74% /vagrant
tmpfs                       199M     0  199M   0% /run/user/1000
tmpfs                       199M     0  199M   0% /run/user/1001
```

## fdisk

El comando `fdisk` se utiliza para manipular la tabla de particiones de un disco.

Al ser un comando bastante sensible sólo aquellos con permisos de superusuario pueden utilizarlo.

```
$ sudo fdisk -l /dev/sda
Disk /dev/sda: 64 GiB, 68719476736 bytes, 134217728 sectors
Disk model: VBOX HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xce75c88c

Device     Boot   Start       End   Sectors  Size Id Type
/dev/sda1  *       2048   1050623   1048576  512M  b W95 FAT32
/dev/sda2       1052670 134215679 133163010 63.5G  5 Extended
/dev/sda5       1052672 134215679 133163008 63.5G 8e Linux LVM
```

## iotop

El comando `iotop` se utiliza para monitorizar la información de I/O (entrada / salida) del kernel.

No está instalado por defecto y se instala mediante el gestor de paquetes añadiendo el paquete `iotop`.
Requiere de permisos de superusuario.

```
$ sudo iotop
Total DISK READ:         0.00 B/s | Total DISK WRITE:         0.00 B/s
Current DISK READ:       0.00 B/s | Current DISK WRITE:       0.00 B/s
    TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
      1 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % init
      2 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [kthreadd]
      3 be/0 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [rcu_gp]
      4 be/0 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [rcu_par_gp]
      6 be/0 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [kworker/0:0H-kblockd]
      8 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [kworker/u2:0-events_power_efficient]
      9 be/0 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [mm_percpu_wq]
     10 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [ksoftirqd/0]
     11 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [rcu_sched]
  keys:  any: refresh  q: quit  i: ionice  o: active  p: procs  a: accum
  sort:  r: asc  left: SWAPIN  right: COMMAND  home: TID  end: COMMAND
```

## netstat

El comando `netstat` se utiliza para mostrar las conexiones de red, tablas de enrutamiento, estadísticas de interfaces de red, etc.
Tiene muchos flags para filtrar según nuestras necesidades:

- `-u` para mostrar puertos UDP
- `-t` para mostrar puertos TCP
- `-x` para mostrar los sockets UNIX
- `-l` para mostrar sólo los sockets a la escucha.
- `-n` para mostrar puertos numéricos
- `-s` para mostrar estadísticas
- `-p` para mostrar el PID del proceso (requere de permisos de superusuario)
- `-r` para mostrar la tabla de enrutamiento (similar al comando `route`)

```
$ netstat -ltn
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp6       0      0 :::111                  :::*                    LISTEN
tcp6       0      0 :::22                   :::*                    LISTEN
```

## ps

El comando `ps` muestra un reporte de los procesos actuales del sistema.
Tiene una gran variedad de opciones. Varios ejemplos de combinaciones de flags:

- `ps aux` - Muestra información detallada de todos los procesos
- `ps -fu &lt;username&gt; - Lista los procesos de varios usuarios separados por coma.
- `ps --forest -fC &lt;command&gt; - Lista los procesos relacionados con el comando en árbol.
- `ps -p &lt;pid&gt; - Lista los procesos en base al PID o PIDs separados por coma

```
$ ps -fu vagrant
UID          PID    PPID  C STIME TTY          TIME CMD
vagrant    13063       1  0 17:18 ?        00:00:00 /lib/systemd/systemd --user
vagrant    13064   13063  0 17:18 ?        00:00:00 (sd-pam)
vagrant    13141   13046  0 17:18 ?        00:00:01 sshd: vagrant@pts/0
vagrant    13142   13141  0 17:18 pts/0    00:00:00 -bash
vagrant    13527   13442  0 19:07 ?        00:00:00 sshd: vagrant@pts/2
vagrant    13528   13527  0 19:07 pts/2    00:00:00 -bash
vagrant    16167   13528  0 19:38 pts/2    00:00:00 ps -fu vagrant
```

## kill

El comando `kill` se utiliza para enviar señales al _PID_ o _Process ID_ que represente a un proceso. Existen diferentes señales que podemos ver mediante:

```shell
$ kill -L
```

Para enviar señales a un proceso podemos escribirlo de varias formas:

- `-<ID-SEÑAL>`: `kill -15 229`
- `-SIG<SEÑAL>`: `kill -SIGTERM 229`
- `<SEÑAL>`: `kill SIGTERM 229`
- `-s <SEÑAL>`: kill -s SIGTERM 229

Para ver el objetivo de cada señal podemos verlos con `man 7 signal`. También un programa puede actuar de una forma u otra dependiendo de la señal que enviemos, por ejemplo, la señal `SIGHUP` en un proceso Nginx recarga su configuración o `SIGQUIT` espera a que todas las conexiones establecidas sean cerradas antes de abortar el proceso, a diferencia de `SIGTERM` que corta las conexiones y sale directamente.

Si no especificamos una señal por defecto se enviará `TERM`.

```shell
$ yes > /dev/null &
[3] 13402
$ ps 13402
    PID TTY      STAT   TIME COMMAND
  13402 pts/0    R      0:03 yes
$ kill -SIGSTOP 13402
$ ps 13402
    PID TTY      STAT   TIME COMMAND
  13402 pts/0    T      0:17 yes

[3]+  Stopped                 yes > /dev/null
$ kill -SIGCONT 13402
$ ps 13402
    PID TTY      STAT   TIME COMMAND
  13402 pts/0    R      0:18 yes
$ kill -SIGTERM 13402
$ ps 13402
    PID TTY      STAT   TIME COMMAND
[3]-  Terminated              yes > /dev/null
$ ps 13402
    PID TTY      STAT   TIME COMMAND
```
