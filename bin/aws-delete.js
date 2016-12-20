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
    });
  })
  .catch(console.error)
  .then(function(){
    mongoose.connection.close();
  });
