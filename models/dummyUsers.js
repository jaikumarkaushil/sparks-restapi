const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    image: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true,
        default: ''
    },
    mobNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
        default: ''
    },
    accountNumber: {
        type: Number,
        unique: true
    },
    accountType: {
        type: String,
        required: true
    },
    credit: {
        type:  Currency,
        required: true,
        min: 0
    },
    debit: {
        type:  Currency,
        required: true,
        min: 0
    },
    balance: {
        type:  Currency,
        required: true,
        min: 0
    }
}, 
{
    timestamps: true
});

// Model for the schema
var Users = mongoose.model('User', userSchema);

module.exports = Users;