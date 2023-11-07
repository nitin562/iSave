const express=require("express")
const app=express()
const connect=require('./ConnectDB')
const cors=require("cors")
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/api/auth",require('./Api/auth.js'))
connect()
app.get("/",(req,res)=>{
    res.end("Hello to Server")
})


app.listen(8000,()=>{
    console.log("Server Started")
})