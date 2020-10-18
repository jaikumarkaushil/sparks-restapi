const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['https://sparks-bank-api.herokuapp.com/', 'https://sparks-bank.herokuapp.com/'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) { // this means that if the req.header containig origin field has whitelist array element then indexOf will be greater or equal to 0, otherwise -1
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors(); // this will allow the application to have access with *(all) origins to work on with.
exports.corsWithOptions = cors(corsOptionsDelegate); //this will allow the application to have access with whitelisted origins only to work on with.