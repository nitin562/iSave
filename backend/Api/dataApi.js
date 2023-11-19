const express = require("express");
const {
  decompress,
  encodeNote,
  compress,
  decodeNote,
  encrypt,
  SpecificDecompress,
} = require("../MiddleWares/validation");
const dataModel = require("../schema/Data");

const pdfParse = require("pdf-parse");
const { userModel } = require("../schema/user");
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
    res.status(201).json({ success: 1, storeIndb });
  } catch (error) {
    res.status(500).json({ success: 0, error });
  }
});
router.post("/DecodeNote", decodeNote, (req, res) => {
  try {
    const note = req.DeData;
    res.status(200).json({ success: 1, note });
  } catch (error) {
    res.status(500).json({ success: 0, error });
  }
});
router.patch("/note", decompress, async (req, res) => {
  try {
    const { noteId, note, special } = req.body;
    const encodedNote = encodeNote(note, special);
    const compressSpecial = compress(special);
    await dataModel.findByIdAndUpdate(noteId, {
      $set: { encodedData: encodedNote, enString: compressSpecial },
    });
    res.status(200).json({ success: 1, msg: "Updated" });
  } catch (error) {
    res.status(500).json({ success: 0, error });
  }
});
router.post("/extractText", (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400).json({ success: 0, msg: "No file" });
  }
  const file = req.files.pdfFile;
  if (file.mimetype === "text/plain") {
    const text = file.data.toString();
    return res.json({ success: 1, text: text.trim() });
  }
  pdfParse(file).then(
    (data) => {
      res.json({ success: 1, text: data.text.trim() });
    },
    (err) => {
      res.status(500).json({ success: -1, err });
    }
  );
});
router.patch("/key", decompress, async(req, res) => {
  try {
    const {id,special}=req.body;

    const e_special= compress(special)

    // Finding the note data and decode it
    const find=await dataModel.findById(id)
    const note=find.encodedData;
    const decodedNote=SpecificDecompress(note)
    // Encode it with new key
    const AgainEncodeWithNewKey=encodeNote(decodedNote,special)

    // update the record
    const updated=await dataModel.findByIdAndUpdate(id,{$set:{encodedData:AgainEncodeWithNewKey,enString:e_special}})
    console.log(updated)
    res.status(200).json({success:1,msg:"updated",updated})

  } catch (error) {
      res.status(500).json({ success: -1, error });

  }
});

module.exports = router;
