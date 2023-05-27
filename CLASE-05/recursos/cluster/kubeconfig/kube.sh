#!/bin/bash
#1-Establezca los valores de unas cuantas variables sustituyendo los example values con el suyo y, a continuación, ejecutando los comandos modificados.
export region_code=region-code
export cluster_name=my-cluster
export account_id=111122223333

##2- Recupere el punto de conexión del clúster y almacene el valor en una variable.
cluster_endpoint=$(aws eks describe-cluster \
    --region $region_code \
    --name $cluster_name \
    --query "cluster.endpoint" \
    --output text)

## 3- Recupere los datos de certificados codificados en Base64 necesarios para comunicarse con el clúster y almacene el valor en una variable.
certificate_data=$(aws eks describe-cluster \
    --region $region_code \
    --name $cluster_name \
    --query "cluster.certificateAuthority.data" \
    --output text)

## 4- cree el directorio ~/.kube predeterminado si aún no existe.
mkdir -p ~/.kube

read -r -d '' KUBECONFIG <<EOF
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: $certificate_data
    server: $cluster_endpoint
  name: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
contexts:
- context:
    cluster: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
    user: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
  name: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
current-context: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
kind: Config
preferences: {}
users:
- name: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      command: aws
      args:
        - --region
        - $region_code
        - eks
        - get-token
        - --cluster-name
        - $cluster_name
        # - "- --role-arn"
        # - "arn:aws:iam::$account_id:role/my-role"
      # env:
        # - name: "AWS_PROFILE"
        #   value: "aws-profile"
EOF
echo "${KUBECONFIG}" > ~/.kube/config

##5- Agregue la ruta del archivo a la variable de entorno KUBECONFIG para que kubectl sepa dónde encontrar la configuración del clúster.

export KUBECONFIG=$KUBECONFIG:~/.kube/config

##6- Pruebe la configuración.

kubectl get svc