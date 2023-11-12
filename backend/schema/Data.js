const db=require("mongoose")
const data=new db.Schema({
    userId:{
        type:db.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    encodedData:{
        type:String,
        required:true
    },
    enString:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const dataModel=db.model("enData",data)
module.exports=dataModel