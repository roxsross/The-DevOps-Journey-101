resource "aws_lambda_function" "test_lambda" {
  filename         = var.codigo
  function_name    = "${var.app_id}-${var.app_env}-lambda"
  handler          = "index.handler"
  source_code_hash = filesha256("${var.codigo}")
  runtime          = "nodejs16.x"
  role             = aws_iam_role.test_role.arn

  environment {
    variables = {
      table = "${var.app_id}-${var.app_env}-db"
    }
  }
}

resource "aws_iam_role" "test_role" {
  name = "${var.app_id}-${var.app_env}-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    tag-key = "${var.app_id}-${var.app_env}-role"
  }
}

resource "aws_iam_policy" "policy" {
  name        = "${var.app_id}-${var.app_env}-policy"
  path        = "/"
  description = "My test policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:BatchGetItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:dynamodb:us-east-1:*:table/*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "test-attach" {
  role       = aws_iam_role.test_role.name
  policy_arn = aws_iam_policy.policy.arn
}
