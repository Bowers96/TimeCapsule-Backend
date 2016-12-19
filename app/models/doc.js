'use strict';

const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
});

docSchema.virtual('filterDate').get(function filterDate() {
  return this.createdAt.toISOString().split('T')[0];
});

const Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;
