const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const transactionSchema = new Schema({
    
    transferTo: {
        type: String,
        required:true
    },
    transferFrom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        min: 11,
        max: 17
    },
    debitedAmount: {
        type:  Currency,
        required: true,
        min: 1
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
var Transactions = mongoose.model('Transaction', transactionSchema);

module.exports = Transactions;