# Gestión de paquetes

## Introducción

En los sistemas Linux existen varios métodos para instalar programas en el sistema. La opción más primitiva y abierta es descargar el código fuente del programa, compilarlo e instalarlo asegurándonos previamente que tenemos todas las dependencias instaladas. Este método de instalación provee generalmente de un fichero `Makefile` con el listado de instrucciones para ser usadas por el comando `make` para compilar e instalar.

La otra opción para manejar la gestión de aplicaciones es usar un gestor de paquetes. Un gestor de paquetes es un conjunto de programas que se encargan de instalar, actualizar y eliminar aplicaciones del sistema de forma automática.

Los programas en Linux vienen empaquetados (y comprimidos) en un único fichero donde además de la funcionalidad del programa trae información sobre sí mismo, dependencias, hash de verificación, distribuidor, versión, etc. Existen diferentes formatos de paquetes que están enfocados en distribuciones específicas como `.deb` o `.rpm`. Las más generales utilizan `.tar.gz` o `.tar.xz`

El gestor de paquetes puede variar en función de la distribución que estemos usando, pero todos cumplen la misma funcionalidad común.

Ejemplos de gestores de paquetes:

- `zypper` - utilizados en sistemas SUSE y openSUSE entre otros.
- `dpkg`, `apt-get` y compañía - utilizados en sistemas basados en Debian (existen muchos basados en estos como `snap`, `aptitude`, `synaptic`, etc).
- `pacman` - utilizados en sistemas basados en Arch (`yay` y derivados para el repositorio AUR).
- `rpm`, `yum` y su sucesora `dnf` - utilizados en sistemas basados en Red Hat Enterprise Linux.
- `nix` - gestor de paquetes sin distribución específica
- `portage` - utilizados en sistemas basadaos en Gentoo

Las distribuciones que utilizan gestores de paquetes obtienen sus paquetes de **repositorios**. Los repositorios son servidores públicos cuyo objetivo es almacenar paquetes a disposición de los usuarios. Existen repositorios oficiales y no oficiales. Los paquetes que provienen de repositorios oficiales son mantenidos por las entidades que crearon la distribución. Los repositorios no oficiales son mantenidos por la comunidad para aportar paquetes que los creadores de la distribución no admiten como paquetes core por diversos motivos (por ejemplo, filosofía OpenSource).

> Los siguientes ejemplos están basados sobre una máquina Ubuntu, cuyo gestor de paquetes oficial más utilizado es `apt`.
> Todos los ejemplos de comandos precedidos con un `#` indican que requieren de permisos de superusuario para ser ejecutados. Los que empiezan por `$` pueden ser ejecutados por cualquier usuario común.

## Gestión de paquetes en Ubuntu.

El gestor de paquetes `apt` está separado en diferentes programas independientes:

- `apt-get`: Encargado de instalar, desinstalar, actualizar paquetes y sincronizar la lista de paquetes con los repositorios.
- `apt-cache`: Encargado de servir información relacionada con los paquetes (buscar paquetes, mostrar información de paquetes, etc).
- `apt`: Sucesor de `apt-get` y `apt-cache` cuya API aún no es del todo estable, pero es bastante funcional.
- `apt-key`: Encargado de manipular la lista de claves para autenticar paquetes. Útil si utilizamos repositorios externos, ya que las claves de los repositorios oficiales son manejadas automáticamente. Cuando descargamos un paquete está firmado digitalmente para asegurar su autenticifidad.
- `add-apt-repository`: Encargado de añadir o eliminar un repositorio de la lista de repositorios.

El listado de repositorios habilitados se encuentra en `/etc/apt/sources.list`.

### Sincronizar caché de paquetes con los repositorios

Para saber qué paquetes están disponibles en los repositorios junto con sus versiones hace falta sincronizarse con los repositorios que tengamos configurados. Este proceso es importante a la hora de instalar paquetes ya que sin él podríamos requerir un paquete que ya no exista o sea demasiado antiguo.

Para actualiza la caché de paquetes utilizamos el comando:

```shell
# apt-get update
```

O con `apt`:

```shell
# apt update
```

### Instalar y actualizar paquetes específicos

Para instalar paquetes utilizamos el comando:

```shell
# apt-get install <package1> <package2> ... <packageN>
```

Ejemplo:

```shell
# apt-get install nodejs npm
```

Admite varias opciones como `-q` para instalación silenciosa, `-s` para realizar simulación de instalacíon sin realmente añadirlo al sistema o `-y` para que no nos pida confirmación de instalación.

Si intentamos instalar un paquete que esté instalado ya en el sistema intentará actualizarlo si existiesen nuevas versiones del mismo. En caso de no haber actualizaciones no realizará cambios en el sistema a menos que utilicemos los flags que empiezan por `--allow` (man apt-get) para forzar una reinstalación. También podemos especificar que sólo actualice paquetes sin añadirlos en caso de que no estuviese previamente instalados con el flag `--only-upgrade`.

También podemos utilizar `apt`:

```shell
# apt install nodejs npm
```

### Actualizar todos los paquetes:

Para actualizar todos los paquetes con versiones nuevas disponibles sin tener que especificar uno por uno utilizaremos el comnado:

```shell
# apt-get upgrade
```

O utilizando `apt`:

```shell
# apt upgrade
```

Para obtener un listado de paquetes con actualizaciones nuevas podemos ejecutar:

```shell
$ apt list --upgradable
```

Con `apt-get` no existe una forma simple de ver este listado, pero una opción es utilizar la opción `-s` para simular la actualización y así ver los paquetes:

```shell
$ apt-get upgrade -s
```

### Eliminar paquetes:

Para eliminar paquetes utilizaremos el comando:

```shell
# apt-get remove <package1> <package2> ... <packageN>
```

Ejemplo:

```shell
# apt-get remove nodejs npm
```

Admite diversos flags como `-y` para no pedir confirmación, `-s` para simular el borrado, etc.

Si añadimos el signo `+` al final del nombre del paquete lo instalará en vez de borrar. Por ejemplo, `nodejs+` instalará `nodejs` en vez de borrarlo.

Es importante saber que `apt-get remove` elimina los paquetes pero deja los ficheros de configuración en el sistema. Para eliminar también sus ficheros de configuración utilizaremos `apt-get purge`:

```shell
# apt-get purge nodejs npm
```

Si utilizamos `apt` tenemos tanto `apt remove` y `apt purge` para las dos operaciones mencionadas.

Si por algún motivo tenemos alguna dependencia _huérfana_ de paquetes, es decir, dependencias que no han sido eliminadas al desinstalar un paquete utilizaremos el siguiente comando para eliminarlas:

```shell
# apt-get autoremove
```

O utilizando `apt`:

```shell
# apt autoremove
```

### Buscar paquetes en los repositorios:

Para buscar paquetes en los repositorios utilizaremos:

```shell
$ apt-cache search <package>
```

Esto buscará en los repositorios los paquetes que tengan relación directa o indirecta con el nombre del paquete que hayamos puesto o paquetes con nombres similares.

Ejemplo:

```shell
$ apt-cache search npm
```

Utilizando `apt`:

```shell
$ apt search npm
```

### Ver datos de un paquete:

Para obtener información de uno o varios paquetes utilizaremos:

```shell
$ apt-cache show <package1> <package2> ... <packageN>
```

Ejemplo:

```shell
$ apt-cache show npm
```

O si utilizamos `apt`:

```shell
$ apt show npm
```

### Mostrar paquetes instalados

La interfaz de `apt-cache` no tiene ningún flag para obtener un listado de paquetes instalado, pero el comando `dpkg` sí:

```shell
$ dpkg -l
```

Todos los paquetes que comiencen por `ii` están instalados en el sistema.

Utilizando `apt`:

```shell
$ apt list --installed
```
