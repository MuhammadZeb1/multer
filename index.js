const express = require("express")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extends:false}))
app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(3000,()=>{
    console.log("server is running");
    
})