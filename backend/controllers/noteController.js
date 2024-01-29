const Note = require("../models/noteModel");
const User = require("../models/userModel");

// Controller to create a note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if user information is available
    if (!req.user || !req.user._id) {
      console.error("User information is missing:", req.user);
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user._id;

    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new note
    const newNote = new Note({
      title,
      content,
      user: userId,
    });

    // Save the note to MongoDB
    await newNote.save();

    // Include the _id of the created note in the response
    const responseNote = {
      _id: newNote._id,
      title: newNote.title,
      content: newNote.content,
      user: newNote.user,
    };

    res.status(201).json({
      message: "Note created successfully",
      newNote: responseNote,
    });
  } catch (error) {
    console.error("Error creating note:", error.message);
    res.status(500).json(error.message);
  }
  // Route for this is "http://localhost:3000/note/createNote"
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id; // Assuming the note ID is passed as a route parameter

    // Check if the note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the user has permission to delete the note (optional)
    // This depends on your application's requirements and authentication system

    // Delete the note from MongoDB
    await Note.findByIdAndDelete(noteId);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json(error.message);
  }
  // Route for this is "http://localhost:3000/note/deleteNote/:id"
};

const editNote = async (req, res) => {
  try {
    const noteId = req.params.id; // Assuming the note ID is passed as a route parameter
    const { title, content } = req.body;

    // Check if the note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the user has permission to edit the note (optional)
    // This depends on your application's requirements and authentication system

    // Update the note in MongoDB
    await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });

    res.status(200).json({ message: "Note edited successfully" });
  } catch (error) {
    console.error("Error editing note:", error.message);
    res.status(500).json(error.message);
  }
  // Route for this is "http://localhost:3000/note/editNote/:id"
};

module.exports = { createNote, deleteNote, editNote };
