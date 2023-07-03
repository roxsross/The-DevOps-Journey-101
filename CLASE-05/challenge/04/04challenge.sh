vagrant up
cd syncd
#Crear Namespace
kubectl create namespace challenge04
#Deploy Version 1
kubectl apply -f 04/deploy.yaml -n challenge04
kubectl -n challenge04 annotate deployment/deploy-challenge04 kubernetes.io/change-cause="Primer despliegue. Desplegamos versión v1"
kubectl -n challenge04 port-forward --address 0.0.0.0 deployment/deploy-challenge04 8080:80
#Deploy Version 2
sed -i 's/k8s_test_web:v1/k8s_test_web:v2/g' 04/deploy.yaml
kubectl apply -f 04/deploy.yaml -n challenge04
kubectl -n challenge04 annotate deployment/deploy-challenge04 kubernetes.io/change-cause="Primer despliegue. Desplegamos versión v2"
kubectl -n challenge04 get deploy,rs,pods
kubectl -n challenge04 rollout history deployment/deploy-challenge04
kubectl -n challenge04 port-forward --address 0.0.0.0 deployment/deploy-challenge04 8080:80
#Deploy Version 3
sed -i 's/k8s_test_web:v2/k8s_test_web:v3/g' 04/deploy.yaml
kubectl apply -f 04/deploy.yaml -n challenge04
kubectl -n challenge04 annotate deployment/deploy-challenge04 kubernetes.io/change-cause="Primer despliegue. Desplegamos versión v3"
kubectl -n challenge04 get deploy,rs,pods
kubectl -n challenge04 rollout history deployment/deploy-challenge04
kubectl -n challenge04 port-forward --address 0.0.0.0 deployment/deploy-challenge04 8080:80
#Rollback Version 2
kubectl -n challenge04 rollout undo deployment/deploy-challenge04
kubectl -n challenge04 get deploy,rs,pods
kubectl -n challenge04 rollout history deployment/deploy-challenge04
kubectl -n challenge04 port-forward --address 0.0.0.0 deployment/deploy-challenge04 8080:80

kubectl -n challenge04 delete deployment deploy-challenge04
kubectl -n challenge04 get deploy,rs,pods