provider "aws" {
  region     = "us-east-1"
  access_key = ""
  secret_key = ""
}

#######
# resource "aws_s3_bucket" "demo-s3" {
#   bucket = "demo-s3-terraform-clase2"
#   tags = {
#     Name        = "My bucket"
#     Environment = "Dev"
#   }
# }