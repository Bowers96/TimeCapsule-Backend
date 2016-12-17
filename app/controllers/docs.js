'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Doc = models.doc;
const Category = models.category;

const s3Upload = require('../../lib/aws-s3-upload.js');

const multer = require('multer');
const multerUpload = multer({ dest: '/tmp/'});

const authenticate = require('./concerns/authenticate');

const isValidCategory = (category, resolve, reject, res) => {
  console.log('category is ', category);
  let search = { text: category };
  Category.findOne(search)
    .then(function(result) {
      if (result) {
        resolve(result);
      } else {
        reject(result);
        return res.sendStatus(422);
      }
    });
};

const index = (req, res, next) => {
  console.log("inside index, req._parsedUrl.query is ", req._parsedUrl.query);
  console.log("inside index, req.currentUser is ", req.currentUser);
  if (req._parsedUrl.query === "restrict=true") {
    Doc.find( {'_owner': req.currentUser._id} )
    .then(docs => res.json({ docs }))
    .catch(err => next(err));
  } else {
    Doc.find()
    .then(docs => res.json({ docs }))
    .catch(err => next(err));
  }
};

const show = (req, res, next) => {
  Doc.findById(req.params.id)
    .then(doc => doc ? res.json({ doc }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  return new Promise(function(resolve, reject) {
    return isValidCategory(req.body.doc.category, resolve, reject, res);
  })
  .then(function() {
    s3Upload(req.file)
      .then(function(s3Response) {
        return Doc.create({
          title: req.body.doc.title,
          url: s3Response.Location,
          category: req.body.doc.category,
          _owner: req.currentUser._id
        });
      })
      .then(function(doc){
        res.json({
          body: doc
        });
      })
      .catch(function(error){
        next(error);
      });
  });
};

const update = (req, res, next) => {
  return new Promise(function(resolve, reject) {
    return isValidCategory(req.body.doc.category, resolve, reject, res);
  })
  .then(function() {
    let search = { _id: req.params.id, _owner: req.currentUser._id };
    Doc.findOne(search)
      .then(doc => {
        if (!doc) {
          return next();
        }

        delete req.body._owner;  // disallow owner reassignment.
        return doc.update(req.body.doc)
          .then(() => res.sendStatus(200));
      })
      .catch(err => next(err));
  });
};

const destroy = (req, res, next) => {
  // let search = { _id: req.params.id };
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Doc.findOne(search)
    .then(doc => {
      if (!doc) {
        return next();
      }

      return doc.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['show'] },
  { method: multerUpload.single('doc[file]'), only: ['create'] },
], });
