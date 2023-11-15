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
const question=new db.Schema({
    user:{
        type:db.Types.ObjectId,
        required:true
    },
    ques:{
        type:String,
        required:true
    },
    ans:{
        type:String,
        required:true,
    }
    
},{timestamps:true})
const userModel=db.model("user",user)
const quesModel=db.model("userQues",question)

module.exports={userModel,quesModel}