const Users = require("../Model/Users");
const Wallet = require("../Model/Wallet");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// creates new user profile
exports.CreateUser = async (req, res) => {
  const checkUser = await Users.findOne({ email: req.body.email });

  if (!checkUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const NEW_USER = {
      _id: req.body._id,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      status: "Active",
    };

    await Users.create(NEW_USER);

    const uID = String(req.body._id);

    // Creating New wallet for new user with 0 balance
    await Wallet.create({
      _id: uID,
      balance: 0,
      spending: 0,
      lastTransaction: 0,
      lastTransactionDate: "",
      walletstatus: "Active",
    });

    res.status(201).json({
      success: true,
    });
  } else {
    res.status(201).json({
      success: false,
    });
  }
};

// fetch user's profile details by email and password for login
exports.GetUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email: email });

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send("Invalid username or password");
  }

  res.json({
    message: "User found",
    status: "success",
    user: {
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    },
  });
};

// Generating OTP for password reset and send it to user's email
exports.generateOTP = async (req, res) => {
  let { email } = req.body;
  let account = await Users.findOne({ email: email });
  let otp = String(Date.now());
  otp = otp.slice(7);

  if (account) {
    // send OTP to email
    const mail = `
  <center>
    <span>Your OTP for rassword reset is </span>
    <h2>${otp}</h2>
  </center>
  `;

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
      to: `${email}`,
      subject: "OTP for Password Reset",
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

    res.json({
      status: "success",
      otp: otp,
    });
  } else {
    res.json({
      message: "Email Doesn't Exist",
    });
  }
};

// reset password of user
exports.resetPassword = async (req, res) => {
  let { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await Users.findOneAndUpdate(
    { email: email },
    { password: hashedPassword }
  );
  if (result) {
    res.json({
      status: "success",
    });
  } else {
    res.json({
      status: "unsuccessful",
    });
  }
};
