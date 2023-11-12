const express = require("express");
const { decompress, encodeNote,compress, decodeNote } = require("../MiddleWares/validation");
const dataModel = require("../schema/Data");
const userModel = require("../schema/user");
const router = express.Router();
//endpoints
// get all notes as array- /notes
// decode specific encoded data when special string will provided by user: POST  - /DecodeNote
// add a note- post -- /note

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
    console.log(id,encodedNote,compressSpecial)
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
    const note=req.DeData
    res.status(200).json({success:1,note})
})

module.exports = router;
