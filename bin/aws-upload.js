'use strict';

require('dotenv').load();

const s3Upload = require('../lib/aws-s3-upload');
const mongoose = require('../app/middleware/mongoose');
const Doc = require('../app/models/doc');

const mime = require('mime');

let file = {
  path: process.argv[2],
  originalname: process.argv[2],
  title: process.argv[3],
  category: process.argv[4],
};

let contentType = mime.lookup(file.originalname);

file.mimetype = contentType;

console.log("file looks like", file);

s3Upload(file)
  .then(function(response){
    console.log("inside then block");
    console.log("response is ", response);
    console.log("url is ", response.Location);
    return Doc.create({
      url: response.Location,
      title: file.title,
      category: file.category,
    });
  })
  .then(function(doc){
    console.log("mongo create was successful");
    console.log("upload is ", doc);
  })
  .catch(console.error)
  .then(function(){
    mongoose.connection.close();
  });
