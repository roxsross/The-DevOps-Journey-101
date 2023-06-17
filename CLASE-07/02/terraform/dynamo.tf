resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "${var.app_id}-${var.app_env}-db"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name        = "${var.app_id}-${var.app_env}-db"
    Environment = "${var.app_env}"
  }
}