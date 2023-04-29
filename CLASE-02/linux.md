# Linux
<p align="center"><img src="../assets/linux.png" width="200"/></p>

# Linux en DevOps

Linux es el sistema operativo open-source más popular en el mundo. Su capacidad para su personalización y poder de ser realmente modificable para las exigencias únicas de software y aplicaciones no tiene par. Aparte de su legendaria estabilidad, manejo súper eficiente de recursos de memoria, procesadores y almacenamiento; sus diferentes tipos de distribuciones para cada escenario lo hacen un elemento imprescindible para albergar las más exigentes y peculiares aplicaciones o plataformas de software.

### He aquí algunos puntos específicos por los que Linux es crucial en DevOps:

- Linux se usa en todo

Desde que Linux fue creado por Linus Torvalds a principios de los años 1990s ha ido ganando popularidad de manera constante. Hoy en día Linux está detrás de muchas de las tecnologías que son el corazón de muchos dispositivos y servicios, desde teléfonos inteligentes, aplicaciones de los principales proveedores de servicios de contenido, herramientas de productividad personal, redes sociales de diversos tipos como Facebook, Twitter y otros.

Una meta primordial de  DevOps es realizar una entrega rápida de los productos de software, eso lo más seguro es que signifique que se deba construir sobre infraestructura existente de Linux.

Es muy claro que saber Linux es esencial para ser un excelente DevOps, pero no se necesita ser un gran experto, sino conocer bien las Distribuciones (comúnmente llamadas Distros) más usadas de Linux en los ambientes de infraestructuras locales y de nube.

- Linux, por ser un sistema operativo de código abierto u open-source, es altamente maleable y flexible

Una de las ventajas más poderosas de Linux sobre sus competidores es su apertura de código, que permite ser modificado a placer dándole un poder casi camaleónico para poderse convertir en lo que necesita cualquier aplicación o plataforma. Se puede instalar en cualquier dispositivo y personalizarlo como se desee. Desde el diseño de un flujo de trabajo en particular, las aplicaciones que necesite servir, o protocolos de seguridad específicos que se deseen implementar.

Linux es un sistema operativo tan versátil que se pueden usar servidores Linux para hacer la función de Routers o inclusive hacer la función de un sistema de respaldo redundante mediante un Arreglo de Discos o RAID (Redundant Array of Inexpensive Disks por sus siglas en inglés). Sin la necesidad de gastar en un Router o una tarjeta RAID.

- Linux es Altamente Escalable

La Escalabilidad es clave para que la filosofía CI/CD o Integración Continua / Entrega Continua sea llevada a la práctica en la operación DevOps. En otros sistemas operativos de Código Cerrado o Privado, esto no es posible sin gastar mucho dinero en licencias e implica también un gasto en tiempo. Afortunadamente Linux es escalable.

El Kernel de Linux puede guardar y procesar grandes cantidades de información en memoria y puede combinar varias tecnologías de almacenamiento de diferentes tecnologías en una sola unidad lógica de almacenamiento. En él se pueden correr tanto aplicaciones muy pequeñas, como por ejemplo en contenedores Docker, como plataformas grandes que demandan un mainframe enorme como es el caso de supercomputadoras.

- Linux es Altamente Compatible con Las Principales Herramientas DevOps

Muchas Herramientas poderosas DevOps usan Linux como base integral de su tecnología y son primariamente compatibles con este sistema operativo más que con cualquier otro sistema operativo existente. Podemos citar cuatro ejemplos claros de la ventaja de esta gran compatibilidad en estas herramientas DevOps ampliamente usadas:

**Docker:** Esta plataforma de contenedores de aplicaciones es altamente compatible con Sistemas Operativos Linux al grado de que su implementación es prácticamente transparente y mucho más fácil de echar a andar que en otros sistemas operativos. Inclusive muchos comandos que se usan para echar a andar contenedores, tirar de imágenes para proveer redundancia de servicios y otro tipo de configuraciones, tienen mucha similitud con ciertos comandos de Linux, lo que hace que su sintaxis se aprenda más rápidamente por un usuario de Linux.

**Kubernetes:** El ambiente de trabajo de Kubernetes que sirve para llevar a cabo la orquestación de contenedores usa Linux de manera casi nativa. En cambio, para poder implementar estos mismos ambientes de trabajos en otras plataformas se requiere de más configuraciones y preparación adicionales.

**Ansible y Puppet:** Tanto Ansible como Puppet, y otras plataformas DevOps que se usan para realizar configuraciones u operaciones masivas en cientos o miles de servers en paralelo mediante IaaS (Infrastructure as a Service en inglés), piden en sus requerimientos que las máquinas principales encargadas de llevar a cabo los despliegues de configuraciones masivas sean servidores Linux exclusivamente, ningún otro sistema operativo es aceptado. El despliegue de configuraciones u operaciones se puede hacer en nodos de diferentes sistemas operativos, pero las máquinas que tienen el rol de Controladores o Masters solo pueden recaer en servers Linux.

### Distribuciones de Linux más apropiadas para DevOps

Existen hoy por hoy dos vertientes principales de Linux que tienen ya muchos años de estar en el entorno IT y son reconocidas mundialmente: la vertiente Red Hat y la vertiente Debian. Red Hat y Debian son Sistemas Operativos Linux que son muy famosos, son legendariamente estables.

En base a estas vertientes se han dado Distribuciones de Linux que se derivan de estas y tienen una presencia muy grande en todo tipo de infraestructuras, además de un soporte técnico y comunidades muy fuertes.

---
# Recursos

- [00_tutorial_bash](./00_tutorial_bash/)
- [01-entornos-linux](./01-entornos-linux/00-sistema-de-ficheros.md)
- [02-trabajando-con-la-cli](./02-trabajando-con-la-cli/00-comandos-basicos.md)
- [03-network-connectivity](./03-network-connectivity/00-comandos-de-red.md)
- [04-administracion-del-sistema](./04-administracion-del-sistema/00-usuarios-y-grupos.md)

---
### Material complementario: 
- [Instalar VM](https://www.youtube.com/watch?v=XfCaHcOdBL8)
- [Comandos basicos de linux](https://www.youtube.com/watch?v=0BA4k3jweaE)
- [Curso terminal y linea de comandos](https://www.youtube.com/watch?v=3gRhwwkeiog)
- [Bash](https://www.youtube.com/watch?v=4_ub6614dwY)

Nos vemos en la siguiente clase.
