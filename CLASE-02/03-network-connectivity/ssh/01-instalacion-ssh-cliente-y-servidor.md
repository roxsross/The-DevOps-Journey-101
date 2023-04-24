# Instalación de SSH en cliente y servidor

> Todos los ejemplos se han ejecutado sobre Ubuntu 20.04 Focal utilizando un usuario no `root` capaz de ejecutar comandos de forma privilegiada.

Tanto el cliente como el servidor de SSH son aplicaciones tan comunes en sistemas Linux que están disponibles dentro de los repositorios de paquetes de las distribuciones para su rápida instalación. En algunas distribuciones el cliente SSH suelen venir instaladas de forma predeterminada al instalar el sistema.

## Cliente

Para instalar el cliente de SSH primero nos aseguraremos de tener actualizados los repositorios de paquetes:

```bash
$ sudo apt-get update
```

A continuación instalaremos el cliente SSH. El nombre del paquete es `openssh-client`:

```bash
$ sudo apt-get install -y openssh-client
```

## Servidor

Para instalar el servidor SSH primero nos aseguraremos de tener actualizados los repositorios de paquetes:

```bash
$ sudo apt-get update
```

A continuación instalaremos el servidor SSH. El nombre del paquete es `openssh-server`:

```bash
$ sudo apt-get install -y openssh-server
```

Al instalar el servidor de SSH se añade la configuración del servicio para ser activado por el gestor de sistema (en nuestro caso `systemd`). Para ver el estado del servicio ejecutamos:

```bash
$ systemctl status ssh.service
```

Este servicio (o demonio) deben estar disponibles en todo momento mientras la máquina esté activa por lo que debemos indicar al administrador de sistema que inicialice el servicio al iniciar el sistema. Si no realizamos esta operacion y el servicio SSH no será arrancado al reiniciar el sistema:

```bash
$ sudo systemctl enable ssh.service
```

Para arrancar el servicio SSH utilizamos el siguiente comando:

```bash
$ sudo systemctl start ssh.service
```

Finalmente podemos ver si el servicio está levantado utilizando el siguiente comando:

```bash
$ systemctl status ssh.service
```

Salida:

```
• ssh.service - OpenBSD Secure Shell Server
    Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
    Active: active (running) since Tue 2020-05-15 18:44:21 UTC: 2min 35s ago
      Docs: man:sshd(8)
            man:sshd_config(5)
  Main PID: 824 (sshd)
     Tasks: 1 (limit: 2282)
    Memory: 3.2M
    CGroup: /system.slice/ssh.service
            └─ 824 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
```
