const express = require('express');
const app = express();
const dishes = require("./routes/Dishes/index").router;
const events = require("./routes/Events/index").router;
const auth = require("./routes/AccountHandler/index").router;
const orders = require("./routes/OrderHandler/index");
const roomHandler = require("./routes/BookingHandler").router;

const bodyParser = require("body-parser");
const cors = require("cors")

// parse application/json
app.use(bodyParser.json())
app.use(cors())


app.get("/",(req,res)=>{
     res.send("HOME PAGE")
})

app.use("/dishes",dishes);

app.use("/events",events);

app.use("/auth",auth);
app.use("/room",roomHandler);

app.use("/orders",orders);

var port = process.env.PORT || 3000
var resourceGroupName = "JaiBalliyasBackend"

app.listen(port,()=>{
     console.log('http://localhost:%d',port);
})