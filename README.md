# serverless-api-dynamodb

Using AWS Serverless Application Model (SAM), this solution provisions an API Gateway with multiple stages, a DynamoDB table with a primary key attribute "id", and deploys two Lambda functions in NodeJS. The APIs invoke Lambda functions to return a single item or all items from from the DynamoDB table.

The SAM template has two input parameters: 
1) an S3 bucket name parameter that for the S3 bucket that contains the zip file of the Lambda code, and 
2) the path/file name of the Lambda code zip package saved in the S3 bucket.

The template also creates CloudWatch Log Groups for the two Lambda functions, with a retention policy of 30 days. It also creates the needed Lambda execution IAM Role with limited IAM actions.

Once the DynamoDB table is deployed, add test items, then invoke the APIs from the respective stage.

# How to test the deployment

NOTE: Your API url will be different from the example's.


1) In the DynamoDB table, added key id items: 1,2,3

2) From a browser, if you invokethe prod API url with the "/resource" path:

https://abcdefg.execute-api.us-east-1.amazonaws.com/prod/resource


The API will return all items in your DynamoDB table: 

{"id":{"S":"2"}}{"id":{"S":"1"}}{"id":{"S":"3"}}


3) If you invoke the prod API url using the "resource/3" path:

https://abcdefg.execute-api.us-east-1.amazonaws.com/prod/resource/3


The API will return the following single item:

{
  "Item": {
    "id": {
      "S": "3"
    }
  }
}

![GitHub Logo](mbx-serverless-api.jpg)


