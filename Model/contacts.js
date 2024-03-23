const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    _id:String,
    name: String,
    email: String,
    subject: String,
    message: String,
})

const Contacts = new mongoose.model("Contacts",contactSchema);

module.exports = Contacts;