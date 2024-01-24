const express = require("express");
const router = express.Router();
const { createNote } = require("../controllers/noteController");

// Route for creating a note
router.post("/createNote", createNote);

module.exports = router;
