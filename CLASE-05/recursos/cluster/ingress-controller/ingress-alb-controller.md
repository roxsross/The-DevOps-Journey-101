# Ingress ALB Controller

AWS Workshop [EKS Workshop](https://www.eksworkshop.com/beginner/130_exposing-service/ingress_controller_alb/)

Documentacion [AWS Load Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/annotations/)

### Create your OIDC identity provider for the cluster
```
eksctl utils associate-iam-oidc-provider --region=us-east-1 \
  --cluster test-cluster  \
  --approve
```

```
curl -o alb_iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/release-2.4/docs/install/iam_policy.json 
```
### Crear Policy del ALB
```
aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://alb_iam_policy.json
```

### Crear Iam Service Account
```
eksctl create iamserviceaccount \
  --cluster nombre_cluster \
  --namespace kube-system \
  --name aws-load-balancer-controller \
  --attach-policy-arn arn:aws:iam::ACCOUNT:policy/AWSLoadBalancerControllerIAMPolicy \
  --override-existing-serviceaccounts \
  --approve
```

```
kubectl get sa aws-load-balancer-controller -n kube-system
```

```
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"
```
```
export VPC_ID=$(aws eks describe-cluster \
                --name nombre_cluster \
                --query "cluster.resourcesVpcConfig.vpcId" \
                --output text)
echo $VPC_ID
```
```
export LBC_VERSION="v2.4.1"
export LBC_CHART_VERSION="1.4.1"
```
```
helm upgrade -i aws-load-balancer-controller \
    eks/aws-load-balancer-controller \
    -n kube-system \
    --set clusterName=nombre_cluster \
    --set serviceAccount.create=false \
    --set serviceAccount.name=aws-load-balancer-controller \
    --set image.tag="v2.4.1" \
    --set region=us-east-1 \
    --set vpcId=vpc-0ca5f3efb58c41e2c \
    --version="1.4.1"
```