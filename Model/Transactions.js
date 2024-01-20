const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    _id:String,
    uID: String,
    name:String,
    email:String,
    transactionDate:String,
    transactionID:String,
});

const Transaction = new mongoose.model("Transactions",transactionSchema);

module.exports = Transaction;