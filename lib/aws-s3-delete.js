'use strict';

const fs = require('fs');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const path = require('path');

const s3delete = function(file) {
  let bucket = process.env.AWS_S3_BUCKET_NAME;
  let ext = path.extname(file.originalname);
  let folder = new Date().toISOString().split('T').shift().split('-').join('/');

  // start with newPromise?
  return new Promise(function(resolve, reject){

    // define params
    function(filename){
      const params = {
        ACL: 'public-read',
        Bucket: bucket,
        Key: folder + '/' + filename + ext,
      };

      // resolve newPromise?
      if (error) {
        reject(error);
      } else {
        resolve(buffer.toString('hex'));
      }
    })

    // execute AWS delete
    return new Promise(function(resolve, reject){
      s3.upload(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
};

// just exports what you tell it to
// below only exports one function so we can call it without dot notation in the other script
// if we were exporting multiple things we'd put it in an object and need to use dot notation
module.exports = s3Upload;
