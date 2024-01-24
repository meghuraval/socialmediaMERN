const Note = require("../models/noteModel");

// Controller to create a note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; // Assuming user information is available in the request, possibly added by middleware

    // Check if the user exists
    // This check is important to ensure that only existing users can create notes
    // You might want to handle this differently based on your application's authentication system
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

    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    console.error("Error creating note:", error.message);
    res.status(500).json(error.message);
  }
  // Route for this might be "http://localhost:3000/note/createNote"
};

module.exports = { createNote };
