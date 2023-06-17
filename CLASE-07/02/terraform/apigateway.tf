resource "aws_apigatewayv2_api" "example" {
  name          = "${var.app_id}-${var.app_env}-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "example" {
  api_id      = aws_apigatewayv2_api.example.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "example" {
  api_id                 = aws_apigatewayv2_api.example.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.test_lambda.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "route1" {
  api_id    = aws_apigatewayv2_api.example.id
  route_key = "DELETE /items/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.example.id}"
}

resource "aws_apigatewayv2_route" "route2" {
  api_id    = aws_apigatewayv2_api.example.id
  route_key = "GET /items/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.example.id}"
}

resource "aws_apigatewayv2_route" "route3" {
  api_id    = aws_apigatewayv2_api.example.id
  route_key = "GET /items"
  target    = "integrations/${aws_apigatewayv2_integration.example.id}"
}

resource "aws_apigatewayv2_route" "route4" {
  api_id    = aws_apigatewayv2_api.example.id
  route_key = "PUT /items"
  target    = "integrations/${aws_apigatewayv2_integration.example.id}"
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowMyDemoAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.test_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.example.execution_arn}/*/*"
}