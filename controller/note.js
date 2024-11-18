const express = require("express");
const router = express.Router();
const { Note } = require('../model/note')


router.post("/save", async (req, res) => {

    if (!req.body.noteData) {
        return res.status(400).send("Note data is required");
    }

    const note = new Note({
        userId: req.body.noteData.userId,
        title: req.body.noteData.title,
        content: req.body.noteData.content,
        backgroundColor: req.body.noteData.backgroundColor,
        images: req.body.noteData.images,
        pinned: req.body.noteData.pinned,
        reminder: req.body.noteData.reminder
    });

   await note.save();
    res.status(201).json({ success: true, data: note });

    console.log(note);

});

// Get all notes by userId
router.get("/:userId", async (req, res) => {
    console.log(req.params.userId);

    const notes = await Note.find({ userId: req.params.userId });

    //return selected data of the notes
    const notices = notes.map((note) => {
        return {
            id: note._id,
            title: note.title,
            content: note.content,
            backgroundColor: note.backgroundColor,
            images: note.images,
            pinned: note.pinned,
            reminder: note.reminder,
        }
    });


    res.status(200).json({ success: true, data: notices });
});

module.exports = router;
