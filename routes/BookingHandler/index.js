const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var {Rooms, User} = require("../Models/Model")

router.get("/",async (req,res)=>{
     const rooms = await Rooms.find();
     res.json({"value":rooms});
})


router.post("/bookRoom",async (req,res)=>{
     var roomType = req.body.roomType
     var roomNumber = req.body.roomNumber
     var roomBookedBy = req.body.roomBookedBy
     var customersName = req.body.customersName
     var roomSize = req.body.roomSize
     var bookedFrom = req.body.bookedFrom
     var bookedTill = req.body.bookedTill
     var priceOfBooking = req.body.priceOfBooking

     var roomBooking = new Rooms({
          roomType,
          roomNumber,
          roomBookedBy,
          customersName,
          roomSize,
          bookedFrom,
          bookedTill,
          priceOfBooking
     })
     var roomRef = await roomBooking.save();
     res.json({"Value":roomRef})
})

router.post("/addRoomMate",async (req,res)=>{
     var customerId = req.body.cid;
     var roomId = req.body.roomId
     var room = await Rooms.findOne({"_id":roomId})
     var user = await User.findOne({"_id":customerId})
     // console.log(room);
     // console.log(user.name)
     var userName = user.name
     room.roomBookedBy.push(user)
     room.customersName.push(userName)
     user.roomsBooked.push(room);
     var result1 = await user.save()
     var result2 = await room.save()
     res.json({"user":result1,"room":result2})
})

router.delete("/cancelBooking",async (req,res)=>{
     var roomId = req.body.roomId;
     var result = await Rooms.findOneAndDelete({"_id":roomId})
     res.json({"value":result})
})

module.exports = {router}



// todo: book with Room Id
// todo: cancle with room Id
