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
        reminder: req.body.noteData.reminder
    });

   await note.save();
    res.status(201).json({ success: true, data: note });

    console.log(note);

});

module.exports = router;
