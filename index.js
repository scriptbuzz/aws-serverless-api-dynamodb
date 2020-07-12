
console.log('Loading function......');
console.log('mbx demo july 11, 2020')

var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const tableName = process.env.TABLE_NAME;
console.log("tableName: " + tableName);

const createResponse = (statusCode, body) => {
    return {
        "statusCode": statusCode,
        "body": body || ""
    }
};

exports.get = (event, context, callback) => {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));

    var params = {
        TableName: tableName,
        Key: {
            id: {
                S: event.pathParameters.resourceId
            }
        }
    };

    console.log('params: ', params);

    dynamo.getItem(params, (err, data) => {
        var response;
        if (err)
            response = createResponse(500, err);
        else
            response = createResponse(200, JSON.stringify(data, null, 2) );
        console.log('response: ', JSON.stringify(data, null, 2));
        console.log('data: ', data);
        callback(null, response);
    });

};

exports.getall = (event, context, callback) => {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));

    var params = {
        TableName: tableName,
    };
    
    console.log('params: ', params);
    
    console.log("Scanning table.");
    dynamo.scan(params, onScan);
    
    function onScan(err, data) {
        var response='';
        var resp='';
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function(id) {
               console.log("json id: ",JSON.stringify(id));
               resp = resp + JSON.stringify(id);
            });
            console.log("resp: ",resp)
            response = createResponse(200, resp );
            callback(null, response);
    }
 };
};

