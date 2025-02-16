# E-commerce Application

## Infrastructure Design

### Infrastructure as Code (IaC)

The infrastructure for this e-commerce application is designed using Infrastructure as Code (IaC) tools to ensure consistency, repeatability, and scalability. The following tools are used:

- **Terraform**: Used for provisioning and managing AWS resources.
- **AWS CloudFormation**: Used for defining and provisioning AWS infrastructure using code.
- **AWS CDK**: Used for defining cloud infrastructure using familiar programming languages.

### Provisioning Infrastructure

To provision the infrastructure, follow the steps below:

#### Using Terraform

1. Install Terraform from [terraform.io](https://www.terraform.io/).
2. Navigate to the `terraform` directory.
3. Run `terraform init` to initialize the configuration.
4. Run `terraform apply` to provision the resources.

#### Using AWS CloudFormation

1. Install the AWS CLI from [aws.amazon.com/cli](https://aws.amazon.com/cli/).
2. Navigate to the `cloudformation` directory.
3. Run `aws cloudformation deploy --template-file template.yaml --stack-name ecommerce-stack` to deploy the stack.

#### Using AWS CDK

1. Install the AWS CDK from [aws.amazon.com/cdk](https://aws.amazon.com/cdk/).
2. Navigate to the `cdk` directory.
3. Run `cdk deploy` to deploy the infrastructure.

### CI/CD Pipeline

A CI/CD pipeline is implemented to automate the application deployment process. The pipeline includes the following stages:

1. **Source**: Code is pushed to a GitHub repository.
2. **Build**: Code is built using AWS CodeBuild.
3. **Test**: Automated tests are run to ensure code quality.
4. **Deploy**: The application is deployed to AWS using AWS CodeDeploy.

### Evidence of CI/CD Pipeline Implementation

Below are screenshots demonstrating the implementation of the CI/CD pipeline automation:

![CI/CD Pipeline - Source Stage](./screenshots/source_stage.png)
*Source stage showing code pushed to GitHub.*

![CI/CD Pipeline - Build Stage](./screenshots/build_stage.png)
*Build stage showing code being built using AWS CodeBuild.*

![CI/CD Pipeline - Test Stage](./screenshots/test_stage.png)
*Test stage showing automated tests being run.*

![CI/CD Pipeline - Deploy Stage](./screenshots/deploy_stage.png)
*Deploy stage showing application being deployed using AWS CodeDeploy.*

