vagrant up
cd syncd
kubectl create namespace challenge02
kubectl apply -f 02/rs.yaml -n challenge02
kubectl -n challenge02 get rs,pods
kubectl -n challenge02 describe rs replicaset-web
kubectl -n challenge02 delete pod <name_pod>
kubectl -n challenge02 get pods
kubectl -n challenge02 scale rs replicaset-web --replicas=6
kubectl -n challenge02 get pods
kubectl -n challenge02 delete rs replicaset-web
kubectl -n challenge02 get rs,pods