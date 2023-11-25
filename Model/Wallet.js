const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    _id: String,
    balance:Number,
    spending:Number, 
    razorpay_payment_id : String,
    razorpay_order_id : String,   
})

const Wallet = new mongoose.model("Wallet",walletSchema);

module.exports = Wallet;