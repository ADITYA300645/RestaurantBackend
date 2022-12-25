const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {Order} = require("../Models/Model")

mongoose.connect('mongodb://localhost:27017/hello').then((e)=>{
     console.log("Connected")
     // console.log(e);
})




async function createOrder(
     status,
     price,
     paymentStatus,
     productName,
     noOfItems,
     dileveryAddress,
     customeName,
     customerId
){
     const order = new Order({
          status,
          price,
          paymentStatus,
          productName,
          noOdItems: noOfItems,
          dileveryAddress,
          customeName,
          customerId
     })

     const orderRef = await order.save()
     console.log(orderRef);
     return orderRef
}

router.patch("/cancleOrder",async (req,res)=>{
     var canceled = await Order.findOneAndUpdate({"_id":req.body.id},{"status":"C"})
     res.json({"value":canceled});
})

router.get("/pending",async (req,res)=>{
     var pending = await Order.find({"status":"P"})
     res.json({"value":pending})
})
router.get("/delivered",async (req,res)=>{
     var delivered = await Order.find({"status":"D"})
     res.json({"value":delivered})
})

router.patch("/resolveOrder",async (req,res)=>{
     var resolved = await Order.findOneAndUpdate({"_id":req.body.id},{"status":"D"});
     res.json({"value":resolved});
})

router.post("/customerOrders",async (req,res)=>{
     var customerId = req.body.cid;
     var orders = await Order.find({"customerId":customerId})
     res.json({"orders":orders});
})

router.post("/putOrder",(req,res)=>{
     var status = req.body.status;
     var price = req.body.price;
     var paymentStatus = req.body.paymentStatus;
     var productName = req.body.productName;
     var noOfItems = req.body.noOfItems;
     var dileveryAddress = req.body.dileveryAddress;
     var customeName = req.body.customeName;
     var customerId = req.body.cid;

     createOrder(
          status,
          price,
          paymentStatus,
          productName,
          noOfItems,
          dileveryAddress,
          customeName,
          customerId
     );
     res.send({"value":"success"})
});



// todo: putOrder
// todo: cancle Order
// todo: getOrders from UserId
// todo: --- orderhandler ---

module.exports = router;