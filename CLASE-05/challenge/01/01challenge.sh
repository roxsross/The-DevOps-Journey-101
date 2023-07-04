vagrant up
cd syncd
kubectl create namespace challenge01
kubectl apply -f 01/pod.yaml -n challenge01
kubectl -n challenge01 get pod
kubectl -n challenge01 describe pod pod-challenge01
kubectl -n challenge01 exec -it pod-challenge01 -- sh
exit
kubectl -n challenge01 port-forward --address 0.0.0.0 pod-challenge01 8888:80
kubectl -n challenge01 logs pod-challenge01
