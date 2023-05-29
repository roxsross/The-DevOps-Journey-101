# Gestionando con Namespaces

Para crear un recurso en un namespace debemos indicar el nombre del espacio de nombres en la etiqueta namespace en su definición:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: proyecto1
  ...
```
También podemos crearlos sin el Archivo yaml:

```
kubectl run nginx --image=nginx -n proyecto1
deployment.apps "nginx" created

kubectl get deploy -n proyecto1
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
nginx     1         1         1            1           15s
```

Y creamos el servicio asociado:

```
kubectl expose deployment/nginx --port=80 --type=NodePort -n proyecto1
service "nginx" exposed

kubectl get services -n proyecto1
NAME      TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
nginx     NodePort   10.107.121.169   <none>        80:30352/TCP   10s
```

### Eliminando un namespace

Al eliminar un namespace se borran todos los recursos que hemos creado en él.

```
kubectl delete ns proyecto1
namespace "proyecto1" deleted
```
