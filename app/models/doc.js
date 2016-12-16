'use strict';

const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;
