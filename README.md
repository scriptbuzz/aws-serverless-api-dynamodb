# serverless-api-dynamodb
This is work in progress.

Using AWS Serverless Application Model (SAM), this solution provisions an API Gateway with multiple stages, a DynamoDB table with a primary attribute "id", and deploys Lambda functions in NodeJS. The APIs invoke Lambda functions to retrun a single item or all items from from a DynamoDB table.

The SAM template has two input paramaters: 1) an S3 bucket name paramater that  for the S3 bucket that contains the zip file of the Lambda code, and 2) the path/file name of the code zip package saved in the S3 bucket. 

The template creates CloudWatch Log Groups for the two Lambda functions, with a retention policy of 30 days. It also creates the needed Lambda execution IAM Role with the needed IAM actions.

Once the DynamoDB table is deployed, add test items then invoke the APIs from the respective stage.

How to test the deployment:

Suppose you have a DynamoDB table with Primary Key "id" and you have added 3 items: 1,2,3

If you envoke the following API from the prod stage with the /resource path:

https://abcdefj.execute-api.us-east-1.amazonaws.com/prod/resource

The API will return all items in your DynamoDB table: {"id":{"S":"2"}}{"id":{"S":"1"}}{"id":{"S":"3"}}

If you envoke the following API from the prod stage with the resource/3 path:

https://kcknd9znjc.execute-api.us-east-1.amazonaws.com/prod/resource/3

The API will return the following single item:

{
  "Item": {
    "id": {
      "S": "3"
    }
  }
}

