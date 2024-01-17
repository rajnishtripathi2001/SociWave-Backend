const Users = require("../Model/Users");
const Wallet = require("../Model/Wallet");

// creates new user profile
exports.CreateUser = async (req, res) => {

  const NEW_USER = {
    _id: req.body._id,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    status: "Active"
  }

  const user = await Users.create(NEW_USER);

  const uID = String(req.body._id);

  // Creating New wallet for new User with some initial values.
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
    user,
  });
};

// fetches all users profiles -- """May be in future be authenticate at backend"""
exports.GetUser = async (req, res) => {
  // const users = await Users.find();
  // res.status(200).json({
  //   success: true,
  //   users,
  // });
  const { email, password } = req.body;

  const user = await Users.findOne({ email: email, password: password });

  // console.log(user)

  if (user) {
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
  } else {
    res.json({
      message: "User not found",
      status: "failed",
    });
  }
};
