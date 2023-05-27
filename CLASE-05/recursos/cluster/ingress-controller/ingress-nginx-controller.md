Nginx

Documentación [nginx](https://github.com/kubernetes/ingress-nginx)

Helm

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```
```
helm install ingress-nginx ingress-nginx/ingress-nginx
```

Manifiesto 

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.4.0/deploy/static/provider/cloud/deploy.yaml
```

### Lets check the status of Nginx Ingress Controller
```
kubectl get po -n ingress-nginx
kubectl get svc -n ingress-nginx
kubectl get ingressClass nginx -o yaml
```