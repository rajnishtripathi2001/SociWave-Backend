const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id:String,
    uID: String,
    orderDate:String,
    orderType:String,
    workLink:String,
    amount:String,
    action:String, 
})

const Order = new mongoose.model("Order",orderSchema);

module.exports = Order;