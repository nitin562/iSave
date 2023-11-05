const db=require("mongoose")
const connect=async()=>{
    await db.connect("mongodb://127.0.0.1:27017/")
}

module.exports=connect