const aws = require('aws-sdk');

exports.getAllStocks = async function getAllStocks() {
    const dynamo = new aws.DynamoDB.DocumentClient();

    const results = await dynamo.scan({
        TableName: 'Stocks',
        }).promise()

    return results.Items;
};

exports.addStock = async function addStock(stock) {
    const dynamo = new aws.DynamoDB.DocumentClient();

    return await dynamo.put({
        TableName: 'Stocks',
        Item: stock
    }).promise();
};