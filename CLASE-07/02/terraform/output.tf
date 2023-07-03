output "url" {
    description = "URL invocacion apig"
    value = aws_apigatewayv2_api.example.execution_arn
  
}

output "name" {
  description = "value"
  value = aws_apigatewayv2_api.example.api_endpoint
}