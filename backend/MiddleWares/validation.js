const hasher=require("bcryptjs")
const jwt=require("jsonwebtoken")
// Convert any value into hashed form
const encrypt=async(pass)=>{
    const salt=await hasher.genSalt(10)
    
    const hashedPass=await hasher.hash(pass,salt)
    return hashedPass
}
//getting boolean value for the equality of hashed and value from user
const decrypt=async(pass,hashedPass)=>{
    const compare=await hasher.compare(pass,hashedPass)
    return compare
}
//compress the user id into token format with fixed secret key
const compress=(data)=>{
    //data is id
    const payload={
        id:data
    }
    const compressedData=jwt.sign(payload,"ssh123");
    return compressedData
}
//compress the note data into token(secret) format with special string
const encodeNote=(note,special)=>{
    const payload={
        note
    }
    const compressedData=jwt.sign(payload,special)
    return compressedData
}
// middleware to give whether special string is correct to decode or note
const decodeNote=(req,res,next)=>{
    const {eNote,special}=req.body;
    jwt.verify(eNote,special,(err,val)=>{
        if(err){
            res.status(400).json({success:0,msg:"key is not correct"})
        }
        if(val){
            req.DeData=val.note
            next()
        }
    })
}

const decompress=(req,res,next)=>{ //middleware that put id of user to the req
    let token=req.query["token"]
    if(!token){
        token=req.body.token
    }
    const payload=jwt.decode(token)
    req.user=payload.id
    next()
}


module.exports={encrypt,decrypt,compress,decompress,encodeNote,decodeNote}