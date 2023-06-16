# vagrant-box-bionic64-kind by Roxs
A Vagrantbox ready  for running local Kubernetes clusters with [Kind](https://kind.sigs.k8s.io/) .

## Description
This repository contains everything needed to build the bionic64-kind vagrant box.This box is based on the hashicorp/bionic64, a standard Ubuntu 18.04 LTS 64-bit provided by Hashicorp.

The next tools are included in the box:

* kind
* docker
* kubectl

The cluster created by kind will have an ingres controller (nginx) and a local docker registry.
Also, in the nginx-app-example are the manifests required to deploy an application on top of kubernetes.


## Usage
You can use the base box like any other base box. 

1.Prerequisites:

Install [Vagrant](https://www.vagrantup.com/docs/installation) and [Virtualbox](https://www.vagrantup.com/docs/providers/virtualbox).

2.Clone this repo:
```
https://github.com/roxsross/The-DevOps-Journey-101
```

3.Create the box:
```
$ vagrant up
```

4.Login with ssh:
```
$ vagrant ssh
```

5.Get the k8s details with kubectl:

```
$ kubectl cluster-info
Kubernetes master is running at https://127.0.0.1:46157
KubeDNS is running at https://127.0.0.1:46157/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

Ready to shine! You are ready to deploy applications on kubernetes.


¿Cómo accedo a Kubernetes Dashboard?

kubectl proxy --address 0.0.0.0 --accept-hosts '.*'

http://192.168.50.4:8001/api/v1/namespaces/kube-system/services/kubernetes-dashboard/proxy/#!/node?namespace=default.

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kind-control-plane

