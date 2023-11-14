const db=require("mongoose")
const connect=async()=>{
    await db.connect('mongodb://127.0.0.1:27017/?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000')
}

module.exports=connect