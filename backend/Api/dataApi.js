const express = require("express");
const { decompress, encodeNote,compress, decodeNote } = require("../MiddleWares/validation");
const dataModel = require("../schema/Data");
const pdfParse=require("pdf-parse")
const userModel = require("../schema/user");
const router = express.Router();
//endpoints
// get all notes as array- /notes
// decode specific encoded data when special string will provided by user: POST  - /DecodeNote
// add a note- post -- /note
// update a note -- /note

// 1. /notes
router.get("/notes", decompress, async (req, res) => {
  //body will have token
  try {
    const id = req.user;
    const notes = await dataModel.find({ userId: id });
    res.status(200).json({ success: 1, notes });
  } catch (error) {
    res.status(500).json({ success: 0, error });
  }
});
router.post("/note", decompress, async (req, res) => {
  try {
    const id = req.user;
    const { special, title, note } = req.body;
    const encodedNote = encodeNote(note, special);
    const compressSpecial = compress(special);
 
    const storeIndb = await dataModel.create({
      userId: id,
      title,
      encodedData: encodedNote,
      enString: compressSpecial,
    });
    res.status(201).json({success:1,storeIndb})
  } catch (error) {
    res.status(500).json({ success: 0, error });
  }
});
router.post("/DecodeNote",decodeNote,(req,res)=>{
    try {
      const note=req.DeData
      res.status(200).json({success:1,note})
    } catch (error) {
        res.status(500).json({success:0,error})
    }
})
router.patch("/note",async(req,res)=>{
  try {
    const {noteId,note,special}=req.body;
    const encodedNote=encodeNote(note,special)
    const compressSpecial=compress(special)
    await dataModel.findByIdAndUpdate(noteId,{$set:{encodedData:encodedNote,enString:compressSpecial}})
    res.status(200).json({success:1,msg:"Updated"})
  } catch (error) {
      res.status(500).json({success:0,error})
  }

})
router.post("/extractText",(req,res)=>{
  console.log(req.files)
  if(!req.files && !req.files){
    res.status(400).json({success:0,msg:"No file"})
  }
  const file=req.files.pdfFile;
  pdfParse(file).then((data)=>{
    res.json({success:1,text:data.text.trim()})
  },(err)=>{
    res.status(500).json({success:-1,err})
  })
})

module.exports = router;
