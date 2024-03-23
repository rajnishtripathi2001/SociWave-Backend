const Contact = require("../Model/contacts");

exports.Contact = async (req, res) => {
    const {name,email,subject,message} = req.body;

    await Contact.create({
        _id: Date.now(),
        name,
        email,
        subject,
        message
    });

    res.status(201).json({
        success: true
    });
};