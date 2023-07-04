vagrant up
cd syncd
kubectl create namespace challenge03
kubectl apply -f 03/deploy.yaml -n challenge03
kubectl -n challenge03 get deploy,rs,pods
kubectl -n challenge03 describe deployment deploy-challenge03
kubectl -n challenge03 port-forward --address 0.0.0.0 deployment/deploy-challenge03 8080:80
kubectl -n challenge03 logs deployment/deploy-challenge03
kubectl -n challenge03 delete deployment deploy-challenge03
kubectl -n challenge03 get deploy,rs,pods