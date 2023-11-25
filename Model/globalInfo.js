const mongoose = require("mongoose");

const globalInfoSchema = new mongoose.Schema({
    totalOrders:Number,
})

const GlobalInfo = new mongoose.model("GlobalInfo",globalInfoSchema);

module.exports = GlobalInfo;