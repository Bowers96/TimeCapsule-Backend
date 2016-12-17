'use strict';

require('dotenv').load();

const s3Delete = require('../lib/aws-s3-delete');
const mongoose = require('../app/middleware/mongoose');
const Doc = require('../app/models/doc');

let key = process.argv[2];

console.log("key looks like ", key);

s3Delete(key)
  .then(function(response){
    console.log(response);
    // return Doc.destroy({
    //   url: response.Location,
    //   title: file.title,
    //   category: file.category,
    });
  })
  // .then(function(doc){
  //   console.log("mongo create was successful");
  //   console.log("upload is ", doc);
  // })
  .catch(console.error)
  .then(function(){
    mongoose.connection.close();
  });
