#!/bin/bash
# Image in My Docker Hub
# wyataco/challenge05-app:1.0
# wyataco/challenge05-consumer:1.0
cp -r ../../../CLASE-04/Challenge/05/ project/
vagrant ssh
eval $(minikube -p minikube docker-env)
cd syncd/05/project
docker compose build
cd
kubectl apply -f ./syncd/05/deployments/flask-app.yaml \
    -f ./syncd/05/deployments/consumer.yaml \
    -f ./syncd/05/services/flask-app.yaml

kubectl get deploy,service,pod
kubectl describe service/service-flask-app
minikube ip
curl ip:port
kubectl logs deployment/app-challenge05
kubectl logs deployment/consumer-challenge05

kubectl delete -f ./syncd/05/deployments/flask-app.yaml \
    -f ./syncd/05/deployments/consumer.yaml \
    -f ./syncd/05/services/flask-app.yaml