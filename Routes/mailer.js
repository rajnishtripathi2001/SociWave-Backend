const nodemailer = require("nodemailer");
const Wallet = require("../Model/Wallet");
const GlobalInfo = require("../Model/globalInfo");
const Order = require("../Model/Order");

exports.Mailer = async (req, res) => {
  const uID = req.body.trans.id;
  const service = req.body.trans.service;
  const link = req.body.trans.link;
  const userEmail = req.body.trans.userEmail;
  const billAmnt = req.body.trans.billAmnt;
  const price = req.body.trans.price;

  const orderDetails = {
    _id: uID,
    orderDate: new Date().toLocaleDateString(),
    orderType: service,
    workLink: link,
    amount: billAmnt,
    action: "Pending",
  };

  const mail = `
  <center>
    <h2>Your Order Is Placed</h2>
  </center>
  <ul>
    <li><b>Service ordered : </b>${service}</li>
    <li><b>Service Work Link : </b>${link}</li>
    <li><b>Subtotal : </b>${price}</li>
    <li><b>Tax : </b>${billAmnt - price}</li>
    <hr>
    <li><b>Total : </b>${billAmnt}</li>
  </ul>
  <hr>
  <center>
    <b>Thanks for being a great customer.</b>
  </center>

  `;

  const update = {
    balance: parseFloat(req.body.trans.balance).toFixed(2),
    spending: parseFloat(req.body.trans.spending).toFixed(2),
  };

  const wallet = await Wallet.findByIdAndUpdate(uID, update);

  // finding and updating Total number of transaction on Sociwave

  const G = await GlobalInfo.findOne();
  const newG = G.totalOrders + 1;
  await GlobalInfo.updateOne({totalOrders:newG});

  // Adding order to Order Collection

  const newOrder = await Order.create(orderDetails);


  //sending mail

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSW,
    },
  });

  const message = {
    from: process.env.SENDER_EMAIL,
    to: `${process.env.PROVIDER_EMAIL},${userEmail}`,
    subject: "New Order Placed",
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

  res.status(200).json({
    success: true,
    wallet,
  });
};

exports.getWallet = async(req,res)=>{
  const uID = req.query.id;
  const walletD = await Wallet.findById(uID);
  res.send(walletD);
}