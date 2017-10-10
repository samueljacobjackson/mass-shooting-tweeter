var AWS = require('aws-sdk');
var Promise = require('bluebird');

AWS.config.update({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT || null
});

var DATA_TABLE_NAME = 'MassShootingData';

var getData = function(year) {
    return new Promise(function(resolve, reject) {
        var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
        var get = Promise.promisify(dynamodbDoc.get, { context: dynamodbDoc });

        var getParams = {
            TableName: DATA_TABLE_NAME,
            Key: { 'Year': year }
        };

        return get(getParams)
        .then(function(data) {
            if(!data.Item) { reject(); }
            else { resolve(data.Item.DataSet); }
        });
    });
}

var updateData = function(year, data) {
    return new Promise(function(resolve, reject) {
        var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
        var update = Promise.promisify(dynamodbDoc.update, { context: dynamodbDoc });

        var updateParams = {
            TableName: DATA_TABLE_NAME,
            Key:{ 'Year': year },
            UpdateExpression: 'set DataSet = :d',
            ExpressionAttributeValues:{ ':d': data },
            ReturnValues:'UPDATED_NEW'
        };

        return update(updateParams)
        .then(function(data) {
            if(!data) { reject(); }
            else { resolve(data); }
        });
    });
}

module.exports.getData = getData;
module.exports.updateData = updateData;