'use strict';

const aws = require('aws-sdk');

const s3 = new aws.S3();

const importProductsFile = async (event) => {
    console.log(event);
    const { name } = event?.queryStringParameters;
    console.log(name);
    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No Name parameter were provided. Name parameter is required.' }),
      };
    }

    const signedUrlKey = `uploaded/${name}`;
    const params = {
      Bucket: 'kirv-import-service-bucket',
      Key: signedUrlKey,
      Expires: 60,
      ContentType: 'text/csv'
    };

  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT"
      },
      body: JSON.stringify({ signedUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    }
  }
};

exports.importProductsFile = importProductsFile;
