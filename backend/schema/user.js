const db=require("mongoose")
const user=new db.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now

    }
})

const userModel=db.model("user",user)
module.exports=userModel