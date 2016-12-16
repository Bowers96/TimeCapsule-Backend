'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Doc = models.doc;

const s3Upload = require('../../lib/aws-s3-upload.js');

const multer = require('multer');
const multerUpload = multer({ dest: '/tmp/'});

const authenticate = require('./concerns/authenticate');

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
  // Doc.find()
  //   .then(docs => res.json({ docs }))
  //   .catch(err => next(err));
};

// def index
//     restrict = params[:restrict]
//
//     @words = if restrict.blank?
//                Word.all
//              else
//                base_query
//              end
//
//     render json: @words
//   end

const show = (req, res, next) => {
  Doc.findById(req.params.id)
    .then(doc => doc ? res.json({ doc }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  s3Upload(req.file)
    .then(function(s3Response) {
      console.log("s3Upload ran, and returned: ", s3Response);
      console.log("req.body is", req.body);
      return Doc.create({
        title: req.body.doc.title,
        url: s3Response.Location,
        category: req.body.doc.category,
        _owner: req.currentUser._id,
      });
    })
    .then(function(doc){
      console.log("inside 2nd then, doc is ", doc);
      res.json({
        body: doc
      });
    })
    .catch(function(error){
      next(error);
    });
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  //let search = { _id: req.params.id };
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
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id };
  // let search = { _id: req.params.id, _owner: req.currentUser._id };
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
