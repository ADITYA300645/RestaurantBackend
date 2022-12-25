const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
     dateOfOrder:{
          type:Date,
          default:Date.now()
     },
     status:{
          type:String
     },
     price:{
          type:Number
     },
     paymentStatus:{
          type:String
     },
     productName:{
          type:String
     },
     noOdItems:{
          type:Number
     },
     dileveryAddress:{
          type: String
     },
     customerName:{
          type:String
     },
     customerId:{
          type:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
     }
})



const dishSchema = new mongoose.Schema({
     name:{
          type:String,
     },
     isTrending:{
          type: Boolean,
          default:false,
     },
     isSuggested:{
          type:Boolean
     },
     description:{
          type:String
     },
     Recipe:{
          type:String,
          required: true
     },
     Category:{
          type:String
     },
     ImageLink:{
          type:String,
          required:true
     },
     RecipeVideoLink:{
          type:String,
          required:true
     },
     Price:{
          type:Number
     }

})





const userSchema = new mongoose.Schema({
     name: {
       type: String,
     },
     bookMarks: {
       type: [dishSchema],
       default : []
     },
     pincode: {
       type: Number,
     },
     address: {
       type: String,
     },
     roomsBooked: {
       type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rooms'}],
     },
     organizedEvents: {
       type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
       // todo handle events
     },
     password: {
       type: String,
     },
     uniqueId: {
       type: String,
     },
     emailId: {
       type: String,
     },
     invitedTo:{
       type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
     },
     Orders:{
          type:[orderSchema],
     }
   });


const roomSchema = new mongoose.Schema({
     roomType:{
          type: String
     },
     roomNumber:{
          type:Number
     },
     roomBookedBy:{
          type:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
     },
     customersName:{
          type:[String]
     },
     roomSize:{
          type:String
     },
     bookedFrom:{
          type: Date
     },
     bookedTill:{
          type:Date
     },
     priceOfBooking:{
          type:Number
     }
     
});

const eventSchema = new mongoose.Schema({
     eventName:{
          type:String
     },
     eventType:{
          type:String
     },
     startTime: {
       type: Date,
     },
     endTime: {
       type: Date,
     },
     hostedBy: {
       type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
     },
     inviteds: {
       type:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
     },
     isFoodFree: {
       type: Boolean,
     },
     mainImageUrl: {
       type: String,
     },
     sideImageUrl: {
       type: String,
     },
//friends: [{type: Mongoose.Schema.Types.ObjectId, ref: 'User'}]

   });
   module.exports = {dishSchema,eventSchema,orderSchema,roomSchema,userSchema}