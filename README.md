# serverless-api-dynamodb
This is work in progress.

Using AWS Serverless Application Model (SAM), this solution provisions an API Gateway with multiple stages, a DynamoDB table, and deploys Lambda functions in NodeJS. The APIs invoke Lambda functions to retrun a single item or all items from from a DynamoDB table.

The SAM template has two input paramaters: 1) an S3 bucket name paramater that  for the S3 bucket that contains the zip file of the Lambda code, and 2) the path/file name of the code zip package saved in the S3 bucket. 

The template creates CloudWatch Log Groups for the two Lambda functions, with a retention policy of 30 days. It also creates the needed Lambda execution IAM Role with the needed IAM actions.

Once the DynamoDB table is deployed, add test items then invoke the APIs from the respective stage.

