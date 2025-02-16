provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "ecommerce_app_bucket" {
  bucket = "unique-ecommerce-app-bucket-name"
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

// Declare security groups
resource "aws_security_group" "alb_sg" {
  name        = "alb-sg"
  description = "Allow HTTP traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ec2_sg" {
  name        = "ec2-sg"
  description = "Allow HTTP traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

// Declare VPC and subnets
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

data "aws_availability_zones" "available" {}

resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
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
  ami           = "ami-0241b1d769b029352"  # Replace with a valid AMI ID
  instance_type = "t2.micro"
  security_groups = [aws_security_group.ec2_sg.id]

  tags = {
    Name = "ecommerce-app-instance"
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0241b1d769b029352"  # Replace with a valid AMI ID
  instance_type = "t2.micro"
  security_groups = [aws_security_group.ec2_sg.id]

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
  name              = "/aws/lambda/unique-ecommerce-app-log-group"
  retention_in_days = 14
}
