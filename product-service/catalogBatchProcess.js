const { SNS, DynamoDB } = require('aws-sdk');

const dynamoDb = new DynamoDB.DocumentClient();
const sns = new SNS();

const createProduct = async (product) => {
  const params = {
    TableName: 'Products',
    Item: {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    },
  };

  await dynamoDb.put(params).promise();
}

const catalogBatchProcess = async (event) => {
  try {
    for (const record of event.Records) {
      const product = JSON.parse(record.body);

      await createProduct(product);

      const snsParams = {
        TopicArn: {
            Ref: 'createProductTopic'
        },
        Subject: 'Message from AWS',
        Message: JSON.stringify({ product }),
        MessageAttributes: {
          price: {
            DataType: 'Number',
            StringValue: `${product.price}`
          }
        }
      };

      await sns.publish(snsParams).promise();
    }
  } catch (error) {
    console.error('SQS event error:', error);
  }
};


exports.catalogBatchProcess = catalogBatchProcess;