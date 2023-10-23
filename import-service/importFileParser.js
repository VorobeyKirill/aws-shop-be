'use strict';

const aws = require('aws-sdk');
const csv = require('csv-parser');

const s3 = new aws.S3();

const importFileParser = async (event) => {
  const bucketName = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;

  console.log(`Processing S3 object: s3://${bucketName}/${key}`);
  try {
    const parseS3File = () => {
        return new Promise((resolve, reject) => {
            const results = [];

            console.log('Start reading file from S3 Bucket');

            try {
                const readStream = s3.getObject({ Bucket: bucketName, Key: key }).createReadStream();
                readStream.pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                    console.log('Finish parsing file from S3 Bucket');
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    const results = await parseS3File();
    console.log({results});

    const parsedKey = `parsed/${key.replace('uploaded/', '')}`;

    await s3.copyObject({ Bucket: bucketName, CopySource: `${bucketName}/${key}`, Key: parsedKey }).promise();

    await s3.deleteObject({ Bucket: bucketName, Key: key }).promise();

    console.log(`File was moved to the parsed folder`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File was successfull parsed and moved to the parsed folder' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    }
  }
};

exports.importFileParser = importFileParser;
