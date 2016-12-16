'use strict';

require('dotenv').load();

const s3Upload = require('../lib/aws-s3-upload.js');
const mongoose = require('../app/middleware/mongoose');
const Upload = require('../app/models/upload');

// const mime = require('mime');

let file = {
  path: process.argv[2],
  title: process.argv[3]
};

// let contentType = mime.lookup(file.path);

s3Upload(file)
  .then(function(response){
    console.log("inside then block");
    console.log("data is ", response);
    console.log("url is ", response.Location);
    // Upload.create returns a promise so we can just return it here
    return Upload.create({
      url: response.Location,
      // don't need a random title when we upload to mongo, only when we upload
      // to AWS so we can use file.title here
      title: file.title
    });
  })
  .catch(console.error)
  .then(function(){
    mongoose.connection.close();
  });
