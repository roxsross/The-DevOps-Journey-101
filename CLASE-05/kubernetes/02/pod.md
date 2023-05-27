# Pod

La unidad más pequeña que puede utilizar Kubernetes es el [*Pod*](https://kubernetes.io/es/docs/concepts/workloads/pods/pod/), en
inglés Pod significa "vaina", y podemos entender un Pod como una
envoltura que contiene uno o varios contenedores (en la mayoría de los
casos un solo contenedor). De forma genérica, un Pod representa un
conjunto de contenedores que comparten almacenamiento y una única
IP.

Un aspecto muy importante que hay que ir asumiendo es que los Pods son
efímeros, se lanzan y en determinadas circunstancias se paran o se
destruyen, creando en muchos casos nuevos Pods que sustituyan a los
anteriores. Esto tiene importantes ventajas a la hora de realizar
modificaciones en los despliegues en producción, pero tiene una
consecuencia directa sobre la información que pueda tener almacenada
el Pod, por lo que tendremos que utilizar algún mecanismo adicional
cuando necesitemos que la información sobreviva a un Pod. Por lo
tanto, aunque Kubernetes es un orquestador de contenedores, **la
unidad mínima de ejecución es el Pod**, que contendrá uno a más
contenedores según las necesidades:

* En la mayoría de los casos y siguiendo el principio de un proceso
  por contenedor, evitamos tener sistemas (como máquinas virtuales)
  ejecutando docenas de procesos, por lo que lo más habitual será
  tener un Pod en cuyo interior se define un contenedor que ejecuta un
  solo proceso.
* En determinadas circunstancias será necesario ejecutar más de un
  proceso en el mismo "sistema", como en los casos de procesos
  fuertemente acoplados, en esos casos, tendremos más de un
  contenedor dentro del Pod. Cada uno de los contenedores ejecutando
  un solo proceso, pero pudiendo compartir almacenamiento y una misma
  dirección IP como si se tratase de un sistema ejecutando múltiples
  procesos.

Existen además algunas razones que hacen que sea conveniente tener
esta capa adicional por encima de la definición de contenedor:

* Kubernetes puede trabajar con distintos sistemas de gestión de
  contenedores (docker, containerd, rocket, cri-o, etc) por lo que es
  muy conveniente añadir una capa de abstracción que permita utilizar
  Kubernetes de una forma homogénea e independiente del sistema de
  contenedores interno asociado.
* Esta capa de abstracción añade información adicional necesaria en
  Kubernetes como por ejemplo, políticas de reinicio, comprobaciones
  de que la aplicación esté inicializada (readiness probe) o
  comprobaciones de que la aplicación haya realizado alguna acción
  especificada (liveness probe).

## Pod con un solo contenedor

En la situación más habitual, se definirá un Pod con un contenedor en
su interior para ejecutar un solo proceso y este Pod estará
ejecutándose mientras lo haga el correspondiente proceso dentro del
contenedor. Algunos ejemplos pueden ser: ejecución en modo demonio
de un servidor web, ejecución de un servidor de aplicaciones Java,
ejecución de una tarea programada, ejecución en modo demonio de un
servidor DNS, etc.

## Pod multicontenedor

En algunos casos la ejecución de un solo proceso por contenedor no es
la solución ideal, ya que existen procesos fuertemente acoplados que
no pueden comunicarse entre sí fácilmente si se ejecutan en diferentes
sistemas, por lo que la solución planteada en esos casos es definir un
Pod multicontenedor y ejecutar cada proceso en un contenedor, pero que
puedan comunicarse entre sí como si lo estuvieran haciendo en el mismo
sistema, utilizando un dispositivo de almacenamiento compartido si
hiciese falta (para leer, escribir archivo entre ellos) y
compartiendo externamente una misma dirección IP. Un ejemplo típico de
un Pod multicontenedor es un servidor web nginx con un servidor de
aplicaciones PHP-FPM, que se implementaría mediante un solo Pod, pero
ejecutando un proceso de nginx en un contenedor y otro proceso de
php-fpm en otro contenedor.