const mongoose = require("mongoose");
const {dishSchema,eventSchema,roomSchema,orderSchema,userSchema} = require("./Schema");

var User = new mongoose.model("user", userSchema);
var Rooms = new mongoose.model("Rooms",roomSchema);
var Order = new mongoose.model("order",orderSchema);
var Event = new mongoose.model("Event", eventSchema);
var Dish = new mongoose.model("Dish",dishSchema)

module.exports = {User,Rooms,Order,Event,Dish}