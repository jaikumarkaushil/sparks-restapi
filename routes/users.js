const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose'); 
const cors = require('./cors');
var Users = require('../models/dummyUsers');
const usersRouter = express.Router();
usersRouter.use(bodyParser.json());

/* GET users listing. */
usersRouter.route('/')
.options(cors.cors, (req, res) => { res.statusCode(200)})
.get(cors.cors, (req, res, next) => {
  
  Users.find(req.query)
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);  // this will put the users collection/ document in the message body of the get request
    }, (err) => next(err)) // with this I will pass the error to the error handling that will take care of it.
    .catch((err) => next(err));
})
.post(cors.cors, (req, res, next) => {
  Users.create(req.body)
  .then((user) => {
      console.log('User Created ', user);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /users');
})
.delete(cors.cors, (req, res, next) => {
  Users.deleteMany({})
  .then((resp) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

usersRouter.route('/:userId')
.options(cors.cors, (req, res) => { res.statusCode(200)})
.get(cors.cors, (req, res, next) => {
    Users.findById(req.params.userId)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);  
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
    res.end('POST operation is not supported on /users/' + req.params.userId);
})
.put(cors.cors, (req, res, next) => {
    Users.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, {new: true})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);  
    }, (err) => next(err)) 
    .catch((err) => next(err));

})
.delete(cors.cors, (req, res, next) => {
    Users.findByIdAndRemove(req.params.userId)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);  
    }, (err) => next(err)) 
    .catch((err) => next(err));
});

module.exports = usersRouter;
