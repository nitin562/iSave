const express=require('express')
const userModel=require("../schema/user")
const crypto=require("crypto")
const router=express.Router()
const {validationResult,check} = require("express-validator")
const { encrypt, decrypt, compress } = require('../MiddleWares/validation')


// login endpoint
router.get("/login",[check('email',"Email is invalid").isEmail(),check('Password',"Password must have atleast 6 characters").isLength({min:6})],async(req,res)=>{
    const {email,Password}=req.query
    console.log(email,Password)
    const results=validationResult(req)
    if(!results.isEmpty()){
        return res.status(400).json({success:0,err:results})
    }
    const client=await userModel.findOne({email})
    if(!client){
        return res.status(400).json({success:-1,msg:"Email is not found"})
    }
    let isTrue=await decrypt(Password,client.password)

    if(!isTrue){
        return res.status(400).json({success:-2,msg:"Password is wrong"})
    }
    const token=compress(client._id)
    

    res.json({success:1,name:client.name,token})
})

// sign up login
router.post("/sign",[check("name","Name must have atleast 3 characters").isLength({min:3}),check('email',"Email is invalid").isEmail(),check('Password',"Password must have atleast 6 characters").isLength({min:6})],async(req,res)=>{
    const {name,email,Password}=req.body
    // console.log(email,Password)
    const results=validationResult(req)
    if(!results.isEmpty()){
        return res.status(400).json({success:0,err:results})
    }
    const client=await userModel.findOne({email})
    if(client){
        return res.status(400).json({success:-1,msg:"Account has already present"})
    }
    const hashPassword=await encrypt(Password)
    const createClient=await userModel.create({name,email,password:hashPassword})
    const token=compress(createClient._id)
    res.status(201).json({success:1,msg:"Account Created",name:createClient.name,token})
})

module.exports=router