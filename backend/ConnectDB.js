const db=require("mongoose")
const connect=async()=>{
    await db.connect('mongodb+srv://nitindbas8800:mongo66057@cluster0.mi1xbrw.mongodb.net/?retryWrites=true&w=majority')
}
//mongodb+srv://nitindbas8800:<password>@cluster0.hx0eumo.mongodb.net/?retryWrites=true&w=majority
module.exports=connect