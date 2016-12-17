'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const s3Delete = function(key) {
  let bucket = process.env.AWS_S3_BUCKET_NAME;

  const params = {
    Bucket: bucket,
    Key: key,
  };

  // execute AWS delete
  return new Promise(function(resolve, reject){
    s3.deleteObject(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = s3Delete;
