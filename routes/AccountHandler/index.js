const express = require("express");
const router = express.Router();
var { User } = require("../Models/Model");
var nodeMailer = require("nodemailer");
// console.log(eventSchema);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hello").then((e) => {
  console.log("Connected");
  //   console.log(e);
});

async function createUser(
  name,
  // bookMarks,
  pincode,
  address,
  // roomsBooked,
  password,
  uniqueId,
  emailId
) {
  const user = new User({
    name,
    // bookMarks,
    pincode,
    address,
    // roomsBooked,
    password,
    uniqueId,
    emailId,
  });
  const userRef = await user.save();
  console.log(userRef);
  return userRef;
}

router.post("/signIn", async (req, res) => {
  var Email = req.body.emailId;
  var Password = req.body.password;
  var senderMail = "tac300645@gmail.com"
  var senderPass = "987654321@T"
  var transporter = nodeMailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user:senderMail,
      pass:senderPass
    },
  });
  
  await transporter.verify((er,sc)=>{
    if(er){
    console.log(er);}
    else{
      console.log(sc);
    }
  })

  if (Email == null || Password == null) {
    res.status(400).json({ value: "FAIL" });
  }
  // console.log(Email);
  // console.log(Password);
  var user = await User.findOne({ emailId: Email });
  if (user == null) {
    res.status(400).json({ value: "FAIL" });
  } else if (user.password == Password) {
    res.json({ value: "SUCCESS", user: user });
  } else {
    res.status(400).json({ value: "FAIL" });
  }
});

router.post("/signUp", async (req, res) => {
  var name = req.body.name;
  var pincode = req.body.pincode;
  var address = req.body.address;
  var password = req.body.password;
  var uniqueId = req.body.uniqueId;
  var emailId = req.body.emailId;


  
  var result = await createUser(
    name,
    pincode,
    address,
    password,
    uniqueId,
    emailId
  );
  res.json({ value: result });
});


// SEMI RELATED LINKS
router.post("/getbookmarks", async (req, res) => {
  var id = req.body.id;
  const user = await User.findOne({ _id: id });
  console.log(user)
  res.json({"value":user.bookMarks})
});

// Exportive Funtions -------------------------------------------



async function getUser(id) {
  var user = await User.find({ _id: id });
  console.log(user);
  return user;
}

router.get("/user/:id", async (req, res) => {
  var id = req.params.id;
  var result = await getUser(id);
  res.json({ value: [result] });
});
module.exports = { router };
