const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id:String,
    fname:String,
    lname:String,
    email:String,
    password:String,
    status:String, 
})

const User = new mongoose.model("User",userSchema);

module.exports = User;