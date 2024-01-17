const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    _id: String,
    uID: String,
    balance:Number,
    spending:Number, 
    lastTransaction: Number,
    lastTransactionDate: String,   
    walletstatus: String,
})

const Wallet = new mongoose.model("Wallet",walletSchema);

module.exports = Wallet;