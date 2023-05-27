# Trabajando con Namespaces

Para obtener la lista de Namespaces ejecutamos:
```
kubectl get namespaces
NAME          STATUS    AGE
default       Active    1d
kube-public   Active    1d
kube-system   Active    1d
```
default: Espacio de nombres por defecto.
kube-system: Espacio de nombres creado y gestionado por Kubernetes.
kube-public: Espacio de nombres accesible por todos los usuarios, reservado para uso interno del cluster.

Para crear un nuevo Namespace:

```
kubectl create ns proyecto1
namespace "proyecto1" created
```

Otra forma de crear un Namespace es a partir de un Archivo yaml con su definición:

```
apiVersion: v1
kind: Namespace
metadata:
  name: proyecto1
```
Podemos ver las características del nuevo espacio de nombres:

```
kubectl describe ns proyecto1
Name:         proyecto1
Labels:       <none>
Annotations:  <none>
Status:       Active

No resource quota.

No resource limits.
```
Y su definición yaml:

```
kubectl get ns proyecto1 -o yaml
apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: 2018-05-23T16:19:58Z
  name: proyecto1
  resourceVersion: "152566"
  selfLink: /api/v1/namespaces/proyecto1
  uid: 2306825c-5ea5-11e8-ab66-fa163e99cb75
spec:
  finalizers:
  - kubernetes
status:
  phase: Active
````
