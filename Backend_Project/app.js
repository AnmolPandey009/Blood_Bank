const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mysql = require("mysql2");
// require("./db/connection")
// const router = require("./Routes/router")


app.get('/',(req,res)=>{
    res.send("Server start");
})



app.use(express.json());
app.use(cors());


app.listen(process.env.PORT,()=>{
    console.log("Server start at port number " + process.env.PORT);
})