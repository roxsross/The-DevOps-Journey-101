#Globals
aws_region = "us-east-1"
environment = "k8s-vpc"
#VPC
azs = ["us-east-1a", "us-east-1b"]
vpc_cidr = "10.220.0.0/20"
cidr_public_blocks = ["10.220.0.0/22", "10.220.4.0/23"]
cidr_private_blocks = ["10.220.8.0/22", "10.220.12.0/23"]

