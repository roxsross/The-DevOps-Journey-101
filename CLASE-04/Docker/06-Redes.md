# Redes en Docker

## Tipos de redes en Docker

Cuando instalamos docker tenemos las siguientes redes predefinidas:

```bash
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
ec77cfd20583        bridge              bridge              local
69bb21378df5        host                host                local
089cc966eaeb        none                null                local
```

* Por defecto los contenedores que creamos se conectan a la red de tipo **bridge** llamada `bridge` (por defecto el direccionamiento de esta red es 172.17.0.0/16). Los contenedores conectados a esta red que quieren exponer algún puerto al exterior tienen que usar la opción `-p` para mapear puertos.

    Este tipo de red nos van a permitir: 

    * Aislar los distintos contenedores que tengo en distintas subredes docker, de tal manera que desde cada una de las subredes solo podremos acceder a los equipos de esa misma subred.
    * Aislar los contenedores del acceso exterior.
    * Publicar servicios que tengamos en los contenedores mediante redirecciones que docker implementará con las pertinentes reglas de iptables.


    Veamos un ejemplo:

    Vamos a crear un contenedor interactivos con la imagen `debian`:

    ```bash
    $ docker run -it --name contenedor1 --rm debian bash
    ```
    **Nota: Hemos usado la opción `--rm` para al finalizar de ejecutar el proceso, el contenedor se elimina.**

    En otra pestaña, podemos ejecutar esta instrucción para obtener la ip que se le ha asignado:
    {% raw %}
    ```
    $ docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' contenedor1
    172.17.0.2
    ```
    {% endraw %}
    Obtenemos información del contenedor filtrando el json de salida para obtener la IPv4 que se le ha asignado.

    Observamos que el contenedor tiene una ip en la red `172.17.0.0/16`. Además podemos comprobar que se ha creado un `bridge` en el host, al que se conectan los contenedores:

    ```bash
    $ ip a
    ...
    5: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
        link/ether 02:42:be:71:11:9e brd ff:ff:ff:ff:ff:ff
        inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
           valid_lft forever preferred_lft forever
        inet6 fe80::42:beff:fe71:119e/64 scope link 
           valid_lft forever preferred_lft forever
    ...
    ```

    Además podemos comprobar que se han creado distintas cadenas en el cortafuegos para gestionar la comunicación de los contenedores. Podemos ejecutar como administrador: `iptables -L -n` y `iptables -L -n - t nat` y comprobarlo.


* Si conecto un contenedor a la red **host**, el contenedor ofrece el servicio que tiene configurado en el puerto de la red del anfitrión. No tiene ip propia, sino es cómo si tuviera la ip del anfitrión. Por lo tanto, los puertos son accesibles directamente desde el host. Por ejemplo:

    ```bash
    $ docker run -d --name mi_servidor --network host josedom24/aplicacionweb:v1
        
    $ docker ps
    CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS               NAMES
    135c742af1ff        josedom24/aplicacionweb:v1   "/usr/sbin/apache2ct…"   3 seconds ago       Up 2 seconds                                  mi_servidor
    ```
    
    Prueba acceder directamente al puerto 80 del servidor para ver la página web.

* La red **none** no configurará ninguna IP para el contenedor y no tiene acceso a la red externa ni a otros contenedores. Tiene la dirección loopback y se puede usar para ejecutar trabajos por lotes.