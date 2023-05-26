# Instalación de kubectl

**kubectl** es la herramienta de línea de comandos utilizada para
interactuar con la API de Kubernetes. Es por tanto la herramienta
fundamental que vamos a utilizar durante todo el curso para gestionar
nuestros objetos en el cluster recién creado con minikube.

kubectl está escrito en Go y de nuevo su instalación es muy simple, ya
que se trata de un binario enlazado estáticamente y sin
dependencias. Las instrucciones para su instalación están disponibles
en la [documentación de
k8s](https://kubernetes.io/es/docs/tasks/tools/install-kubectl/). A
continuación veremos algunas de las opciones que tenemos para
instalarlo.

## Configuración kubectl

Una vez instalado `kubectl` podemos comprobar que está disponible y cuál es su
versión, con la instrucción:

```
kubectl version --client
Client Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.6", GitCommit:"ad3338546da947756e8a88aa6822e9c11e7eac22", GitTreeState:"clean", BuildDate:"2022-04-14T08:49:13Z", GoVersion:"go1.17.9", Compiler:"gc", Platform:"darwin/amd64"}
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```
