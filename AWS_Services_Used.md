# AWS Services Used & Justification

## 3.1 Application Load Balancer (ALB)
- **Justification**: ALB efficiently distributes web traffic across EC2 instances, supports HTTPS for secure communication, and integrates seamlessly with Auto Scaling to manage traffic spikes.

## 3.2 Amazon EC2
- **Justification**: EC2 provides scalable computing power for hosting web and application servers. Auto Scaling ensures that EC2 instances scale dynamically based on traffic demand.

## 3.3 Amazon S3
- **Justification**: S3 is ideal for storing static content (e.g., product images, videos) and ensures high durability and availability. It meets GDPR compliance by providing encryption options for sensitive customer data.

## 3.4 AWS Lambda
- **Justification**: Lambda enables event-driven architecture, handling tasks like order status updates or notifications without requiring dedicated servers, reducing costs.

## 3.5 Amazon DynamoDB
- **Justification**: DynamoDB provides fast and scalable storage for real-time transactional data, such as product catalogs and user orders, making it ideal for high-volume applications. DynamoDB is used as the primary database for this project.

## 3.6 AWS CloudFormation
- **Justification**: CloudFormation allows automated provisioning and management of AWS resources using code, ensuring consistency across environments.

## 3.7 AWS CodePipeline, CodeBuild, and CodeDeploy
- **Justification**: These tools automate the CI/CD process, ensuring quick, reliable, and error-free application deployments with minimal downtime.

## 3.8 Amazon CloudWatch
- **Justification**: CloudWatch provides real-time monitoring of AWS resources and application health, enabling proactive issue resolution.

## 3.9 AWS EventBridge
- **Justification**: EventBridge enables event-driven architecture, where Lambda functions can be triggered by specific events, such as product updates or order status changes.

## 3.10 AWS Simple Notification Service (SNS)
- **Justification**: SNS provides a reliable and scalable messaging service, sending notifications about order updates, promotions, and deployment statuses to stakeholders.

## 3.11 Amazon RDS
- **Justification**: Amazon RDS provides a managed relational database service, which simplifies database administration tasks such as backups, patch management, and scaling. It ensures high availability and durability with Multi-AZ deployments and automated backups.

#dynamo db as database