const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

// we have defined the schema her
const transactionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required:true,
    },
    transferTo: {
        type: String,
        required: true,
        unique: true,
    },
    accountNumber: {
        type: Number,
        min: 11,
        max: 17
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
})


// Model for the schema
var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;