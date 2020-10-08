const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

// we have defined the schema her
const accountSchema = new Schema({
    accountNumber: {
        type: Number,
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
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
    account: [accountSchema],
}, 
{
    timestamps: true
});

// Model for the schema
var Users = mongoose.model('User', userSchema);

module.exports = Users;