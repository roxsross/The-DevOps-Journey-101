variable "vpc_id" {
  description = "VPC ID for the Cluster."
}

variable "application_subnets" {
  description = "A list of Subnets to deploy Kubernetes Worker Nodes in."
  type = list
}

variable "cluster_name" {
  description = "Name Cluster"
}
variable "instance_type" {
  description = "AWS EC2 Instance type for Worker Nodes in Auto Scaling Group"
  type = list
}

variable "environment" {
  description = "Environment to deploy. (e.g. `prod` `staging` `testing` `develop` `develop`)"
}
variable "team" {
  description = "Team owner of the Application (e.g. `backend` `frontend` `billing`)"
}
