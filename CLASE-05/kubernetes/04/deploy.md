# Deployment

El despliegue o [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) es la unidad de más alto nivel que podemos gestionar en Kubernetes.

* La creación de un Deployment conlleva la creación de un ReplicaSet que controlará un conjunto de Pods creados a partir de la versión de la imagen que se ha indicado.

* Si hemos desarrollado una nueva versión de la aplicación y hemos creado una nueva imagen con la nueva versión, podemos modificar el Deployment indicando la nueva versión de la imagen. En ese momento se creará un nuevo ReplicaSet que controlará un nuevo conjunto de Pods creados a partir de la nueva versión de la imagen (habremos desplegado una nueva versión de la aplicación).

* Por lo tanto podemos decir que un Deployment va guardando un historial con los ReplicaSet que se van creando al ir cambiado la versión de la imagen. El ReplicaSet que esté activo en un determinado momento será el responsable de crear los Pods con la versión actual de la aplicación.

* Si tenemos un historial de ReplicaSet según las distintas versiones de la imagen que estamos utilizando, podemos, de una manera sencilla, volver a una versión anterior de la aplicación (**Rollback**).

Por la manera de trabajar de un Deployment, podemos indicar las funciones que nos aporta:

* Control de réplicas
* Escalabilidad de pods
* Actualizaciones continuas
* Despliegues automáticos
* Rollback a versiones anteriores

## Arquitectura de nuestras aplicaciones

Tenemos dos clases de aplicaciones que podemos desplegar en un cluster de Kubernetes:

1. Aplicaciones que necesitan varios servicios para ejecutarse: por ejemplo una aplicación escrita en PHP y servida por un servidor web que necesita un servidor de base de datos para guardar la información. En este caso crearemos dos recursos Deployment: uno para desplegar la aplicación PHP y otro para desplegar la base de datos. Por cada servicio que necesite nuestra aplicación crearemos un Deployment para desplegarlo.

2. Aplicaciones construidas con microservicios: cada microservicio se puede desplegar de manera autónoma. Por cada microservicio que forma parte de la aplicación crearemos un recurso Deployment. Por ejemplo, una aplicación que tenga un frontend para ofrecer la información y que haga llamadas a un backend que ofrece un servicio web por medio de una API RESTful.