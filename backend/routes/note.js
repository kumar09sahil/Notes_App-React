const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../modles/Notes");
const router = express.Router();
const { validationResult, body } = require("express-validator");

// fetch al the notes of the user using  : GET "api/auth/" . login  required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("some error has occured");
  }
});

// create notes for the user using : POST  "apgeti/note/" . login  required
router.post(
  "/createnotes",
  fetchuser,
  [
    body("title", "please enter a Title more than 5 letters").isLength({
      min: 5,
    }),
    body("description", "enter a description of minimum 5 letters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.log(error);
      res.status(500).send("some error has occured");
    }
  }
);
// create notes for the user using : PUT "apgeti/note/" . login  required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("some error has occured");
  }
});
// delete notes for the user using : DELETE "apgeti/note/" . login  required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    
    //check if there is a note which is to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //check if the node to be deleted is owned by it 
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(
      req.params.id
    );
    res.json({"success": "note is deleted", note : note})
  } catch (error) {
    console.log(error);
    res.status(500).send("some error has occured");
  }
});

module.exports = router;
