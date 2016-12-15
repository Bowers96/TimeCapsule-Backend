'use strict';

const testDatabase = 'mongodb://localhost/TimeCapsule-Backend-test';

module.exports = {
  options: {
    env: {
      MONGODB_URI: testDatabase,
      NODE_PATH: process.env.PWD,
    },
  },
  all: ['<%= paths.src.spec %>'],
};
