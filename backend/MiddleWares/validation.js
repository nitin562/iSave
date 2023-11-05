const hasher=require("bcryptjs")
const jwt=require("jsonwebtoken")
const encrypt=async(pass)=>{
    const salt=await hasher.genSalt(10)
    const hashedPass=await hasher.hash(pass,salt)
    return hashedPass
}
const decrypt=async(pass,hashedPass)=>{
    const compare=await hasher.compare(pass,hashedPass)
    return compare
}
const compress=(data)=>{
    const payload={
        id:data
    }
    const compressedData=jwt.sign(payload,"ssh123");
    return compressedData
}

module.exports={encrypt,decrypt,compress}