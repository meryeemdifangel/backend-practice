const express = require("express")
const app=new express()
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv=require("dotenv")
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");


 

dotenv.config()
//connect to data base
mongoose.connect(process.env.DBKEY,{ useNewUrlParser: true }).then(
    ()=>{
        console.log("connection to db successeful")
    }
).catch(
  (er)=>{
        console.log(er)
    }
)
app.use(cors());
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",require("./Routes/userRoute"))
app.use("/api/product",require("./Routes/productRoute"))
app.use("/api/orders",require("./Routes/orderRoute"))
app.use("/api/carts",require("./Routes/cart"))

app.use("/api/private",require("./Routes/private"))

// Error Handler Middleware
app.use(errorHandler)

app.listen( 3120 || 5000 , ()=>{
    console.log("Backend server is running")
})