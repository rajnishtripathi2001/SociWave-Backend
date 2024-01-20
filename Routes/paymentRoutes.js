const nodemailer = require("nodemailer");
const Transaction = require("../Model/Transactions");

exports.CreateOrder = (req, res) => {
  const { upi, name, email, id } = req.body;
  const mail = `
  <center>
    <h2>Money Added to wallet</h2>
  </center>
  <ul>
    <li><b>UPI Transaction ID: </b>${upi}</li>
    <li><b>Name : </b>${name}</li>
    <li><b>Email : </b>${email}</li>
    <li><b>User ID : </b>${id}</li>
  <hr>
  <center>
    <b>Thanks for being a great customer. We received your payment and soon it will be added to your wallet.</b>
  </center>

  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSW,
    },
  });

  const message = {
    from: process.env.SENDER_EMAIL,
    to: `${process.env.PROVIDER_EMAIL},${email}`,
    subject: "Money Added to wallet",
    text: "Simple text",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("mail sent scucessfully");
    })
    .catch(() => {
      console.log("Error in sending mail");
    });

  // adding transaction to database (name, email, upi, id) Testing left below code 

  const date = new Date();
  const options = { timeZone: "Asia/Kolkata" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const transactionData = {
    _id: Date.now(),
    uID: id,
    name: name,
    email: email,
    transactionID: upi,
    transactionDate: formattedDate,
    
  };

  Transaction.create(transactionData);

  res.json({
    success: true,
    message: "Order Created",
  });
};
