const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  createNote,
  deleteNote,
  editNote,
  getAllUserNotes,
} = require("../controllers/noteController");

// Route for creating a note
router.post("/createNote", verifyToken, createNote);
router.delete("/deleteNote/:id", deleteNote);
router.post("editNote/:id", editNote);
router.get("/allNotes/:id", getAllUserNotes);

module.exports = router;
