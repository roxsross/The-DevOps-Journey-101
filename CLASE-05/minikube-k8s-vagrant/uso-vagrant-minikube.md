# Minikube Vagrant by RoxsRoss

---
*Vagrant* es una herramienta o aplicación de líneas de comando utilizada en el sector IT, especialmente por desarrolladores. Permite la creación de entornos de desarrollo virtualizados que pueden ser reproducidos y compartidos de una forma muy fácil.


*Minikube* es una distribución reducida de Kubernetes que permite alcanzar el máximo rendimiento funcional de esta herramienta con el mínimo esfuerzo. Esto no solo es interesante para quienes se están iniciando en el uso de contenedores, sino también, y sobre todo, en el mundo del edge computing y el del Internet de las cosas. En este artículo, descubrirás qué es Minikube, para qué se utiliza esta herramienta y cómo puede prescindir de grandes infraestructuras.

*k9s* es una herramienta para la terminal, que nos permite administrar recursos dentro de nuestro clúster kubernetes, brinda una usabilidad fácil y rápida de aprender. 

---
Minikube usando virtualbox. Sin tener que instalar ningún binario en el host.

El clúster de Kubernetes se expondrá al host mediante una red privada.

```
+------------------------------------------------------+
| Host (private_network_ip)                            |
|     +-----------------------------------+            |
|     | Vagrant box                       |            |
|     |    +------------------------------+            |
|     |    | Minikube                     |            |
|     |    |   +--------------------------+            |
|     |    |   | Pods/Services/foo...     |            |
|     |    |   |                          |            |
|     |    |   |                          | <--+curl   |
|     |    |   |                          |     browser|
|     |    |   |                          |            |
|     |    |   |                          |            |
|     |    |   |                          |            |
|     |    |   |                          |            |
+-----+----+---+--------------------------+------------+
```


## Pre-requisitos

Vagrant (https://www.vagrantup.com/docs/installation/)



## Opciones

Edita las variables en el Vagrantfile


| Option              | Description   | Default                 |
| -------------       | ------------- | -------------           |
| KUBERNETES_VERSION  | Kubernetes version to install           | 1.26
| CONTAINER_RUNTIME   | Runtime to use (containerd, docker)     | docker
| CLUSTER_NODES       | Number of nodes to setup                | 1
| PRIVATE_NETWORK_IP  | Prefered private network ip (from host) | 172.20.128.2

# Como usamos Vagrant

### Install

```
vagrant up
```

### Suspend / resume

```
vagrant suspend
vagrant resume
```

### Gestionar el Cluster de Kubernetes "minikube"

```
vagrant ssh
kubectl get pods -A
```

### Accediendo al kubernetes dashboard desde el host
```
vagrant ssh -c 'bash -ci dashboard'

http://PRIVATE_NETWORK_IP:9999/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/#/workloads?namespace=default
```

### Acceder al servicio que se expone desde el host
```
vagrant ssh -c 'bash -ci tunnel'

curl PRIVATE_NETWORK_IP:80/exposed-svc
```

### Uso de K9s
Documentación oficial de [k9s](https://github.com/derailed/k9s)

```
k9s
```

### Más informacion sobre uso de minikube

Documentación oficial [minikube](https://minikube.sigs.k8s.io/docs/start/)

# Ejemplo de uso

[Archivo Ejemplo](ejemplo.yaml)

Este ejemplo va crear un ingress (foo-ingress) qur trabaja con el port 80 y se conecta con el servicio (foo-service) entutado con el pod (foo-app) en el port 8080.

```
vagrant ssh

kubectl apply -f ejemplo.yaml

```

Desde el host

```
vagrant ssh -c 'bash -ci tunnel'

curl http://172.20.128.2/foo

============================================
Request desde foo-app

HTTP/1.1 GET /foo

Host: 172.20.128.2
Accept: */*
User-Agent: curl/7.58.0
X-Forwarded-For: 10.244.0.1
X-Forwarded-Host: 172.20.128.2
X-Forwarded-Port: 80
```

```
kubectl port-forward --address 0.0.0.0 pod/foo-app 7080:80
```