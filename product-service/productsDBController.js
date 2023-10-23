const aws = require('aws-sdk');

exports.getAllProducts = async function getAllProducts() {
    const dynamo = new aws.DynamoDB.DocumentClient();

    const results = await dynamo.scan({
        TableName: 'Products',
        }).promise()

    return results.Items;
};

exports.getProductById = async function getProductById(id) {
    const dynamo = new aws.DynamoDB.DocumentClient();

    const result = await dynamo.query({
        TableName: 'Products',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': id }
    }).promise()

    return result.Items;
};

exports.addProduct = async function addProduct(product) {
    const dynamo = new aws.DynamoDB.DocumentClient();

    return await dynamo.put({
        TableName: 'Products',
        Item: product
    }).promise();
};