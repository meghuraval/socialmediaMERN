const express = require("express");
const router = express.Router();
const {
  createNote,
  deleteNote,
  editNote,
} = require("../controllers/noteController");

// Route for creating a note
router.post("/createNote", createNote);
router.delete("/deleteNote/:id", deleteNote);
router.post("editNote/:id", editNote);

module.exports = router;
