const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Route for creating a note
router.post("/createNote", noteController.createNote);

module.exports = router;
