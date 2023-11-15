const express=require("express")
const app=express()
const connect=require('./ConnectDB')
const fileUpload=require("express-fileupload")
app.use(fileUpload())
const cors=require("cors")
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/api/auth",require('./Api/auth.js'))
app.use("/api/data",require('./Api/dataApi.js'))

connect()
app.get("/",(req,res)=>{
    res.end("Hello to Server")
})


app.listen(9000,()=>{
    console.log("Server Started")
})