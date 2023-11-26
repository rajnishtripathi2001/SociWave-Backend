const Razorpay = require("razorpay");
const Crypto = require('crypto');
const Wallet = require('../Model/Wallet');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

var walletAmount = 0;
var userID = "";
var newBalance = 0;

exports.CreateOrder = (req, res) => {

  const amount = req.body.amount;
  walletAmount = amount;
  userID = req.body.userID;

  // console.log("Wallet amount : "+ walletAmount);
  // console.log("User ID : " + userID);

  try {

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: String(Math.floor(Date.now() / 10000000)),
    };

    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong with if block",
        });
      }
      return res.status(200).json(order);
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong with Try Block",
    });
  }
};

exports.PaymentVerification = async (req,res) =>{
 
  const{razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = Crypto
    .createHmac('sha256',process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if(isAuthentic){

    // Updating the Wallet Status in Database
    const userW = await Wallet.findById(userID);

    // console.log("User Wallet : " + userW);

    newBalance = Number(walletAmount) + Number(userW.balance);
    
    // updating wallet DB with new balance, and last transaction order & payment id
    userW.balance = 
    await Wallet.findByIdAndUpdate( userID,{
      razorpay_payment_id,
      razorpay_order_id,
      balance:newBalance,
    });
     
    res.redirect("http://localhost:3000/"); //update this with your redirect url
  }
  else{
    res.status(400).json({
      sucess:false
    });

  }

};