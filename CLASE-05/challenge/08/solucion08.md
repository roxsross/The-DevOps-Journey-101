# Solución lab08

Primero podemos verificar como el _pod_ `bm-api` no retorna la imagen pedida, abriendo una sesión contra el contenedor del pod:

```
kubectl exec -it -n bm-zero bm-api -- /bin/sh
/app # wget localhost:8080/k8s.png
Connecting to localhost:8080 (127.0.0.1:8080)
wget: server returned error: HTTP/1.1 404 Not Found
/app # exit
```

Nos piden que nos aseguremos de que si el _pod_ se reinicia las imágenes estén copiadas otra vez. Eso sugiere el uso de un _init container_.

Ese _init container_ ejecutará la imagen `ckadexercices/bmseeder:dev` y usará un volumen de tipo `EmptyDir` como directorio de destino. Ese mismo volúmen estará montado en `/images/data` del contenedor principal.

También debemos recordar que se nos dice que este contenedor espera una variable de entorno llamada `BM_PIC_SEEDER_PATH` con el directorio de destino. No te olvides de agregarla en la sección `pod.spec.initContainers.env`:

Para ello, el primer paso es obtener el yaml actual del _pod_:

```
kubectl get pod -n bm-corp bm-api -o yaml > 02-pod.yaml
```

Luego eliminamos todas las líneas superflúas **y agregamos un init container que ejecute `ckadexercices/bmseeder:dev`, así como el volumen**:

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app.kubernetes.io/managed-by: bm-team
  name: bm-api
  namespace: bm-corp
spec:
  # Agregamos toda esa sección (initContainers)
  initContainers:
  - image: ckadexercices/bmseeder:dev
    imagePullPolicy: Always
    name: seeder
    env:
    - name: BM_PIC_SEEDER_PATH      # Variable de entorno que nos indican
      value: /data/images
    volumeMounts:
    - mountPath: /data/images
      name: images-vol
  containers:
  - image: ckadexercices/bm-api:v1
    imagePullPolicy: IfNotPresent
    name: api
    ports:
    - containerPort: 8080
      protocol: TCP
    resources:
      limits:
        cpu: 10m
        memory: 64Mi
      requests:
        cpu: 5m
        memory: 32Mi
    # Agregamos esa sección (volumeMounts)
    volumeMounts:
    - mountPath: /data/images
      name: images-vol
  # Agregamos toda esa sección (volumes)
  volumes:
  - name: images-vol
    emptyDir: {}
```

Finalmente puedes borrar el pod actual y usar este fichero yaml para recrearlo:

```
kubectl delete pod -n bm-corp bm-api
kubectl create -f 02-pod.yaml
```

Una vez inicializado, si lo compruebas, ahora el contenedor te debería servir la imagen en la url `/k8s.png`.

```
/app # wget localhost:8080/k8s.png
Connecting to localhost:8080 (127.0.0.1:8080)
saving to 'k8s.png'
'k8s.png' saved
/app # ls -l
total 6412
-rwxr-xr-x    1 root     root       6532661 Nov 13 16:35 bm-api
-rw-r--r--    1 root     root         31989 Nov 13 17:56 k8s.png
/app # exit
```

¡Perfecto!

[Volver a las soluciones](./readme.md)
[Volver a los ejercicios](../ejercicios.md)