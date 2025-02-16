provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "ecommerce_app_bucket" {
  bucket = "ecommerce-app-bucket"
  acl    = "private"
}

resource "aws_s3_bucket" "static_content" {
  bucket = "ecommerce-app-static-content"

  tags = {
    Name = "StaticContentBucket"
  }
}

resource "aws_dynamodb_table" "ecommerce_app_table" {
  name           = "ecommerce-app-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "product_catalog" {
  name           = "ProductCatalog"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ProductId"

  attribute {
    name = "ProductId"
    type = "S"
  }

  tags = {
    Name = "ProductCatalogTable"
  }
}

resource "aws_iam_role" "ecommerce_app_role" {
  name = "ecommerce-app-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecommerce_app_policy_attachment" {
  role       = aws_iam_role.ecommerce_app_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_role_policy_attachment" "ecommerce_app_dynamodb_policy_attachment" {
  role       = aws_iam_role.ecommerce_app_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

// Add Application Load Balancer
resource "aws_lb" "ecommerce_app_alb" {
  name               = "ecommerce-app-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = aws_subnet.public.*.id
}

resource "aws_lb_target_group" "ecommerce_app_tg" {
  name     = "ecommerce-app-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_lb_listener" "ecommerce_app_listener" {
  load_balancer_arn = aws_lb.ecommerce_app_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecommerce_app_tg.arn
  }
}

// Add EC2 instances
resource "aws_instance" "ecommerce_app_instance" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  security_groups = [aws_security_group.ec2_sg.id]

  tags = {
    Name = "ecommerce-app-instance"
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0" // Example AMI ID, replace with your own
  instance_type = "t2.micro"

  tags = {
    Name = "AppServer"
  }
}

// Add Lambda function
resource "aws_lambda_function" "ecommerce_app_lambda" {
  function_name = "ecommerce-app-lambda"
  role          = aws_iam_role.ecommerce_app_role.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = "lambda_function_payload.zip"
}

// Add EventBridge rule
resource "aws_cloudwatch_event_rule" "ecommerce_app_event_rule" {
  name        = "ecommerce-app-event-rule"
  description = "Event rule for ecommerce app"
  event_pattern = jsonencode({
    source = ["aws.ec2"]
  })
}

// Add SNS topic
resource "aws_sns_topic" "ecommerce_app_sns_topic" {
  name = "ecommerce-app-sns-topic"
}

// Add CloudWatch log group
resource "aws_cloudwatch_log_group" "ecommerce_app_log_group" {
  name              = "/aws/lambda/ecommerce-app-log-group"
  retention_in_days = 14
}
