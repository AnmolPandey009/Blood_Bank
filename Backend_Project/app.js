const express=require('express');
const app=express();


app.get("/",(req,res,next)=>{
    res.send("hell")
})

app.listen(4000,()=>{
    console.log("Lesbian at port number 4000")
})