'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Category = models.category;

const index = (req, res, next) => {
  Category.find()
    .then(categories => res.json({
      categories
    }))
    .catch(err => next(err));
};

module.exports = controller({
  index,
});
