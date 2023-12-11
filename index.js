// Importing all require packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// importing all requires modules
const userRoutes = require("./Routes/userRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const Mailer = require('./Routes/mailer');
const GlobalInfo = require("./Model/globalInfo");


//Declaring PORT NUMBER
const PORT = process.env.PORT || 5000;

// Declaring Express App
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializing the MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

// Default Route to check Server Status on Webpage
app.get("/", (req, res) => {
  res.send("Server is working");
});

/*----- User Handeling -----*/
// Register New user
app.post(process.env.NEW_USER, userRoutes.CreateUser);

//Login User
app.post(process.env.GET_USER, userRoutes.GetUser);

/*----- Payment Handeling -----*/

// Create New payment order
app.post(process.env.NEW_PAYEMT_ORDER, paymentRoutes.CreateOrder);

/* --- Wallet handeling ---*/
// Fetch the wallet Info of loggedin user
app.get(process.env.FETCH_WALLET, Mailer.getWallet);

// Update wallet after purchase and send email notification
app.put(process.env.UPDATE_WALLET,Mailer.Mailer);


app.get('/global',async(req,res)=>{
  const G = await GlobalInfo.findOne();
  res.status(200).json({
    success: true,
    G
  })
})

app.listen(PORT, () => {
  console.log(`Server running locally at http://localhost:5000`);
});
