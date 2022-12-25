const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var {Event, User} = require("../Models/Model")

mongoose.connect("mongodb://localhost:27017/hello").then((e) => {
  console.log("Connected");
  //   console.log(e);
});



async function createEvent(
  eventName,
  eventType,
  startTime,
  endTime,
  hostedBy,
  // todo look at hosted by
  // inviteds,
  isFoodFree,
  mainImageUrl,
  sideImageUrl
) {
  const event = new Event({
    eventName,
    eventType,
    startTime,
    endTime,
    hostedBy,
    // inviteds,
    isFoodFree,
    mainImageUrl,
    sideImageUrl,
  });
  const eventRef = await event.save();
  console.log(eventRef);
  return eventRef;
}

router.get("/", async (req, res) => {
  var events = await Event.find();
  var users = await User.find();
  // console.log(events);
  console.log(users)
  res.json({ "events": events });
});



router.post("/create", async (req, res) => {
  var eventName = req.body.eventName;
  var eventType = req.body.eventType;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  var userId = req.body.accountId;
  // var inviteds = req.body.inviteds;
  var isFoodFree = req.body.isFoodFree;
  var mainImageUrl = req.body.mainImageUrl;
  var sideImageUrl = req.body.mainImageUrl;

  var hostedBy = await User.findOne({"_id":userId});

  var result = await createEvent(
    eventName,
    eventType,
    startTime,
    endTime,
    hostedBy,
    // inviteds,
    isFoodFree,
    mainImageUrl,
    sideImageUrl
  );
  res.json({ Value: result });
});

router.delete("/remove", async (req, res) => {
  var eventId = req.body.eventId;
  var result = await Event.findOneAndDelete({ _id: eventId });
  res.json({ value: result });
});

router.patch("/extendTime", async (req, res) => {
  var eventId = req.body.eventId;
  var extendTo = req.body.extendTo;
  var result = await Event.findOneAndUpdate({ _id: eventId }, { endTime: extendTo });
  res.json({ value: result });
});


router.post("/invite", async (req, res) => {
  var customerId = req.body.cid;
  var eventId = req.body.eventId;
  var event = await Event.findOne({"_id":eventId});
  var user = await User.findOne({"_id":customerId});
  event.inviteds.push(user);
  var result = await event.save()
  console.log(result);
  res.json({"VALUE":result});
});
module.exports = { router };
// module.exports = eventSchema;  
// todo: create Event
// todo: cancle Event
// todo: retrive One Event
