const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose'); 
const cors = require('./cors');
const Transactions = require('../models/transactions');
const transactionsRouter = express.Router();
transactionsRouter.use(bodyParser.json());

/* GET transactions listing. */
transactionsRouter.route('/')
.options(cors.cors, (req, res) => { res.statusCode(200)})
.get(cors.cors, (req, res, next) => {
  Transactions.find()
    .then((transactions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(transactions);  // this will put the transactions collection/ document in the message body of the get request
    }, (err) => next(err)) // with this I will pass the error to the error handling that will take care of it.
    .catch((err) => next(err));
})
.post(cors.cors, (req, res, next) => {
    Transactions.create(req.body)
        .then((transaction) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(transaction);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /transactions');
})
.delete(cors.cors, (req, res, next) => {
  Transactions.deleteMany({})
  .then((resp) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = transactionsRouter;