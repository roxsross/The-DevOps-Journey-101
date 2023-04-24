# Sistema de ficheros

En Linux y Unix todo es un fichero. Los directorios son ficheros y los dispositivos son ficheros. Los ficheros están organizados en un árbol jerárquico donde existe la relación padre-hijos (los directorios pueden contener otros directorios u otros ficheros). Todos los ficheros parten de una ruta raíz que se representa con el carácter `/`. Cualquier fichero puede ser referenciado por un nombre de ruta. El directorio `/` sirve como punto de montaje para el resto de directorios del sistema. Un punto de montaje no es más que un directorio vacío que sirve para que sean montados otros directorios de una partición de un disco.

Un nombre de ruta absoluto comienza con el carácter `/` del que siguen todos los directorios hijos que deben ser atravesados para llegar al fichero, cada uno separado por el signo `/`.

Un nombre de ruta relativo es aquel que no comienza por `/`. En este caso el árbol de directorios se recorre a partir de un punto determinado que cambia según el directorio actual donde nos encontremos (contexto). En cada directorio hay dos directorios especiales: `.` que representa el contexto o directorio actual, y `..` que representa al directorio padre del contexto.

Este es un ejemplo de un directorio representado por su ruta absoluta:

```
/var/lib/
```

Este es un ejemplo de un fichero representado por su ruta absoluta:

```
/usr/bin/echo
```

Este es un ejemplo del directorio anterior representado por ruta relativa tomando `/home/myusername` como contexto actual:

```
../../var/lib/
```

Este es un ejemplo del fichero anterior representado por ruta relativa tomando `/usr/` como contexto actual:

```
./bin/echo
```

El carácter especial `~` representa el directorio _home_ en forma de ruta absoluta del usuario actual. El directorio _home_ para usuarios finales suelen estar localizados dentro de `/home/` seguidos de una carpeta que representa el _login_ del usuario. Si tenemos un usuario `alfredo` su directorio _home_ será `/home/alfredo`. Esto suele ser diferente de otros usuarios del sistema que son utilizados para ejecutar demonios o procesos en segundo plano. El _home_ del usuario `root` es `/root/`.

Este es un ejemplo de una ruta absoluta de un fichero dentro del directorio `Downloads` de mi _home_ siendo un usuario cuyo login es _alfredo_:

```
~/Downloads/file.txt
```

Es equivalente a:

```
/home/alfredo/Downloads/file.txt
```

Los ficheros o directorios pueden contener espacios y otros caracteres especiales. Estos caracteres deben escaparse con una `\` a la hora de acceder a ellos o estar encerrados entre comillas.

Los siguientes ejemplos representan directorios con espacios:

```
~/My\ Videos/
"~/My Videos/"
~/"My Videos"/
```

## Directorios especiales del sistema

La estructura de ficheros del sistema suelen seguir el [Estandar de Jerarquía de Sistema de Ficheros](https://www.pathname.com/fhs/pub/fhs-2.3.html) aunque algunos directorios pueden variar ligeramente según la distribución:

- `/bin` contiene los comandos de terminal más comunes.
- `/boot` contiene los ficheros necesarios para arrancar el sistema, incluyendo el kernel, la imagen disco RAM y los ficheros de configuración del gestor de arranque.
- `/dev` contiene todos los ficheros que representan los dispositivos. Estos son tipos de ficheros especiales que apuntan a diferentes.dispositivos hardware en el sistema, incluyendo discos duros.
- `/etc` contiene los ficheros de configuración del sistema, que afectan al comportamiento del sistema para todos los usuarios.
- `/home` contiene los directorios principales de los usuarios.
- `/lib` contiene entre otras cosas módulos de kernel y librerías dinámicas muy importantes
- `/media` está pensado para ser utilizado como punto de montaje de dispositivos externos (discos duros, CDs, DVDs, etc).
- `/mnt` también está pensado para ser utilizado como punto de entrada de montaje de dispositivos externos, concretamente los temporales (sistema de ficheros en red, dispositivos extraíbles, etc).
- `/opt` está pensado para contener software adicional del sistema que no esté manejado por el gestor de paquetes.
- `/proc` es un sistema de ficheros virtuales que utiliza el kernel como mecanismo para enviar información a los procesos.
- `/root` es el directorio del usuario administrador.
- `/run` es un sistema de ficheros temporal para almacenar información de procesos pasajeros.
- `/sbin` contiene comandos administrativos importantes que suelen ser utilizados por el superusuario.
- `/srv` está pensado para contener directorios de servicios de sistema como HTTP, FTP, etc.
- `/sys` es otro sistema de ficheros virtuales del que se puede obtener o establecer configuraciones para el kernel.
- `/tmp` está concebido para ser un directorio de ficheros temporales para las aplicaciones.
- `/usr` contiene la mayoría de aplicaciones y utilidades a la que los usuarios tienen acceso.
- `/var` está dedicado a contener datos variables de aplcaciones como logs, bases de datos, correos.
