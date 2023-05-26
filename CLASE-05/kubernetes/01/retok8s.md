# Reto a k8s

__pensando que es simple Xd nada más un pod.

Es un reto aprender sobre Objetos de k8s y cómo se interactúa con ellos y definirlos, pero a modo de resumen, podemos enumerar sus principales
funciones en la siguiente lista:

* Pods: ejecutan los contenedores
* ReplicaSets:
  * Se encargan de que no haya caída del servicio
  * Gestionan la tolerancia a fallos
  * Proporcionan escalabilidad dinámica
* Deployments:
  * Gestionan las actualizaciones continuas
  * Realizan despliegues automáticos
* Services:
  * Gestionan el acceso a los pods
  * Balancean la carga entre los Pods disponibles
* Ingress:
  * Gestionan el acceso desde el exterior a través de nombre
