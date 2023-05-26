# Alternativas de k8s

Kubernetes es un software pensado para poner en producción
aplicaciones más o menos complejas que se ejecutan sobre contenedores,
garantizando su disponibilidad, escalabilidad y actualización sin
interrupciones. 

### Presento alguna de sus Alternativas:

# minikube

Minikube permite desplegar localmente un "cluster" de Kubernetes con
un solo nodo. Minikube es un proyecto oficial de Kubernetes y es
probablemente la solución más adecuada para aprender a usar k8s, ya
que es un proyecto maduro y muy sencillo de instalar. Los requisitos
mínimos para instalar minikube en nuestro equipo son:

* 2 CPUs
* 2GiB de memoria
* 20GiB de espacio libre en disco
* Un sistema de virtualización o de contenedores instalado:
  * Docker
  * Hyperkit
  * Hyper-V
  * KVM
  * Parallels
  * Podman
  * VirtualBox
  * VMWare

Minikube instalará un nodo de Kubernetes en el sistema de
virtualización/contenedores que prefiramos, siendo unas opciones más adecuadas que otras dependiendo del sistema operativo de nuestro equipo, tal como se muestra
en
[https://minikube.sigs.k8s.io/docs/drivers/](https://minikube.sigs.k8s.io/docs/drivers/). En
versiones recientes, es posible aumentar el número de nodos del
cluster de minikube, aunque para el objetivo de este curso no es
necesario y haremos la instalación estándar de un solo nodo.

Los detalles para la instalación local de minikube los explicamos en
la siguiente sección, ya que va a ser el método recomendado para
realizar este curso.

# kubeadm

kubeadm es una solución más realista que minikube si se
instala un cluster de Kubernetes con varios nodos. Su instalación no es especialmente compleja, pero no está tan automatizada
como minikube y necesita más recursos y tiempo para
configurarlo. kubeadm es una opción muy interesante cuando queremos
ver de forma detallada la diferencia entre lo que se ejecuta en el
nodo controlador y en los nodos workers, que no se puede apreciar en
minikube.

La instalación de kubeadm se realiza típicamente en varias máquinas
virtuales o varias instancias de nube y dejamos un par de enlaces para
quienes estén más interesados en indagar en este software:

* [https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)


# kind

kind (kubernetes in docker) es un proyecto oficial de Kubernetes más
reciente que los dos anteriores y que permite desplegar un cluster de
Kubernetes con varios nodos sobre docker. Es también muy interesante
como opción de instalación local y de forma análoga al anterior,
dejamos un par de enlaces para quienes estén interesados en probarlo:

* [https://kind.sigs.k8s.io/docs/user/quick-start/](https://kind.sigs.k8s.io/docs/user/quick-start/)

# k3s

A diferencia de las opciones anteriores, k3s es una distribución de
Kubernetes que sí está pensada para poner en producción
k3s no es un proyecto oficial de Kubernetes, sino que lo comenzó a desarrollar la empresa [Rancher](https://rancher.com/) y hoy en día lo mantiene la [Cloud
Native Computing Foundation](https://www.cncf.io/).

Los pasos para la instalaciónde k3s están disponibles en:

* [https://rancher.com/docs/k3s/latest/en/installation/](https://rancher.com/docs/k3s/latest/en/installation/)
