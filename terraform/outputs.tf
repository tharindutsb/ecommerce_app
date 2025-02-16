output "instance_id" {
  description = "The ID of the app server instance"
  value       = aws_instance.app_server.id
}

output "s3_bucket_name" {
  description = "The name of the S3 bucket"
  value       = aws_s3_bucket.static_content.bucket
}

output "dynamodb_table_name" {
  description = "The name of the DynamoDB table"
  value       = aws_dynamodb_table.product_catalog.name
}
