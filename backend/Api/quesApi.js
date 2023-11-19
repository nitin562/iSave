const express=require("express");
const { decompress, compress, encrypt, SpecificDecompress, decrypt } = require("../MiddleWares/validation");
const { quesModel } = require("../schema/user");
const router=express.Router()

// endpoint to get question -- get= /ques
//endpoint to check answer -- get= /ans
//endpoint to post ques and ans to db  -- post= /QA

// QA
router.post("/QA",decompress,async(req,res)=>{
    try {
       
        const{ques,ans}=req.body;
        const id=req.user
        if(!ques || ques.length<3){
            res.status(400).json({success:-1,msg:"Question should have more than 3 characters"})
        }
        if(!ans||ans.length<3){
            res.status(400).json({success:-2,msg:"Answer should have more than 3 characters"})
        }
        let decapitalizedAns=ans.toLowerCase()
        const e_ques=compress(ques) // to get original form also
        const e_ans= await encrypt(decapitalizedAns) // here we need just comparison at end

        await quesModel.create({
            user:id,
            ques:e_ques,
            ans:e_ans
        })
        res.status(201).json({success:1,msg:"Created"})

    } catch (error) {
        res.status(500).json({success:0,error})
    }
})

//Q
router.get("/ques",decompress,async(req,res)=>{
    try {
        const id=req.user;
        const e_ques=await quesModel.findOne({user:id})
        const ques=SpecificDecompress(e_ques.ques)

        res.status(200).json({success:1,Ques:ques})
    } catch (error) {
        res.status(500).json({success:0,error})
        
    }
})

//A
router.get("/ans",decompress,async(req,res)=>{
    try {
        const id=req.user;
        const ans=req.query["ANS"]
      
        if(!ans || ans===""){
            res.status(400).json({success:-1,msg:"Empty answer"})
        }
        let decapitalizedAns=ans.toLowerCase()
     
        const e_ans=await quesModel.findOne({user:id})
        const check=await decrypt(ans,e_ans.ans);
    
        if(check){
            res.status(200).json({success:1,correct:true})
        }
        else{
            res.status(200).json({success:1,correct:false})
        }
    } catch (error) {
        res.status(500).json({success:0,error})
        
    }
})
    
module.exports=router