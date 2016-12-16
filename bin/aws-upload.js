'use strict';

require('dotenv').load();

const s3Upload = require('../lib/aws-s3-upload');
const mongoose = require('../app/middleware/mongoose');
const Upload = require('../app/models/upload');

const mime = require('mime');

// Old `file` object =>
// let file = {
//   path: process.argv[2],
//   title: process.argv[3]
// };

// req.file looks like this:
// { fieldname: 'image[file]',
//   originalname: 'payne.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: '/tmp/',
//   filename: '5e215bd26b83220a4c75f5f9d1f7c5cd',
//   path: '/tmp/5e215bd26b83220a4c75f5f9d1f7c5cd',
//   size: 26116 }

// new `file` object
let file = {
  path: process.argv[2],
  originalname: process.argv[2],
  title: process.argv[3],
};

let contentType = mime.lookup(file.originalname);

file.mimetype = contentType;

console.log("file looks like", file);

s3Upload(file)
  .then(function(response){
    console.log("inside then block");
    console.log("response is ", response);
    console.log("url is ", response.Location);
    return Upload.create({
      url: response.Location,
      title: file.title,
    });
  })
  .then(function(upload){
    console.log("mongo create was successful");
    console.log("upload is ", upload);
  })
  .catch(console.error)
  .then(function(){
    mongoose.connection.close();
  });
