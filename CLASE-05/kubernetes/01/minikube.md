## Instalación de minikube 

Accedemos a
[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
y seleccionamos el método que prefiramos para instalar, eligiendo
nuestro sistema operativo, arquitectura, etc.

Minikube se instala, como otras aplicaciones de Go, como un binario
enlazado estáticamente (autoconsistente), que no tiene dependencias de
nada y que tenemos que ubicar en algún directorio del PATH de nuestro
sistema.

Comprobamos que se ha instalado correctamente con:

    minikube version

    minikube version: v1.25.0
	commit: 76b94fb3c4e8ac5062daf70d60cf03ddcc0a741b

## Creación del cluster de k8s

El siguiente paso consiste en lanzar minikube para que cree el cluster
de Kubernetes de un solo nodo (master+worker). Minikube puede crear
este cluster en diversos sistemas de virtualización o sobre docker, lo
recomendable es visitar la página de
["drivers"](https://minikube.sigs.k8s.io/docs/drivers/) y seleccionar
el método más adecuado para nuestro sistema.

De forma general, se creará el cluster de Kubernetes a través de
minikube, mediante la instrucción:

    minikube start

Aunque de forma más concreta, especificaremos el "driver" a utilizar,
por ejemplo:

    minikube start --driver=kvm2

Esto creará de forma automática una máquina virtual o un contenedor en
el sistema escogido e instalará Kubernetes en ella. Por último, se
configura kubectl si está instalado (el cliente de línea de comandos
de k8s) para que utilice el cluster recién instalado. Podemos ver una
salida típica de la instalación del cluster a continuación:

```
😄  minikube v1.24.0 en Debian 11.2
✨  Using the kvm2 driver based on user configuration
👍  Starting control plane node minikube in cluster minikube
🔥  Creando kvm2 VM (CPUs=2, Memory=3900MB, Disk=20000MB) ...
🐳  Preparando Kubernetes v1.22.3 en Docker 20.10.8...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Complementos habilitados: default-storageclass, storage-provisioner
💡  kubectl not found. If you need it, try: 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

En la última línea de la salida podemos ver que se ha intentado
configurar apropiadamente kubectl, a pesar de que no está instalado en
el equipo, paso que haremos en el siguiente apartado.

Podemos comprobar en cualquier momento el estado de minikube con la
instrucción:

```
minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

## Parada y reinicio de minikube

Podemos parar y volver a arrancar minikube cuando sea preciso, ya que
no se trata de un cluster de k8s en producción, sino de uno instalado
en un equipo convencional. Esto se realiza mediante las instrucciones:

```
minikube stop
✋  Stopping node "minikube"  ...
🛑  1 nodes stopped.
```

```
minikube start
😄  minikube v1.24.0 en Debian 11.2
✨  Using the kvm2 driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🔄  Restarting existing kvm2 VM for "minikube" ...
🐳  Preparando Kubernetes v1.22.3 en Docker 20.10.8...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Complementos habilitados: storage-provisioner, default-storageclass
💡  kubectl not found. If you need it, try: 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```
