# Describiendo un ReplicaSet

En este caso también vamos a definir el recurso de ReplicaSet en un archivo [`nginx-rs.yaml`](files/nginx-rs.yaml), por ejemplo como este:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: replicaset-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - image: nginx
          name: contenedor-nginx
```

Algunos de los parámetros definidos ya lo hemos estudiado en la definición del Pod. Los nuevos parámetros de este recurso son los siguientes:

* `replicas`: Indicamos el número de Pods que siempre se deben estar ejecutando.
* `selector`: Seleccionamos los Pods que va a controlar el ReplicaSet por medio de las etiquetas. Es decir este ReplicaSet controla los Pods cuya etiqueta `app` es igual a `nginx`.
* `template`: El recurso ReplicaSet contiene la definición de un Pod. Fíjate que el Pod que hemos definido en la sección `template` tiene indicado la etiqueta necesaria para que sea seleccionado por el ReplicaSet (`app: nginx`).

## Documentación

* Para más información acerca de los ReplicaSet puedes leer: la [documentación de la API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#replicaset-v1-apps) y la [guía de usuario](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).

