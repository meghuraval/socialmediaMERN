/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isFormOpen, setIsFormOpen] = useState(false); // New state to track form open/close

  // Function to add a new note
  const addNewNote = async () => {
    try {
      // Retrieve the authentication token from local storage
      const authToken = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");

      // Check if the authentication token is available
      if (!authToken) {
        console.error("Authentication token not available");
        return;
      }
      console.log("userId from localStorage:", userId);

      // Create a new note object with the provided title and content
      const noteData = {
        title: newNote.title,
        content: newNote.content,
        userId: userId,
      };

      // Send a request to create a new note
      console.log("API URL:", "http://localhost:3000/note/createNote");
      const response = await fetch("http://localhost:3000/note/createNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming your controller returns the newly created note
      const createdNote = await response.json();

      // Update the state with the new note
      setNotes([...notes, createdNote]);

      // Clear the newNote state
      setNewNote({ title: "", content: "" });

      console.log("Note added successfully!");
    } catch (error) {
      console.error("Error adding new note:", error.message);
    }
  };

  // Function to toggle the form
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // ... (Other code for rendering notes, folders, etc.)

  return (
    <div>
      <p>hello, welcome to your dashboard!</p>

      {/* Render existing notes */}
      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}

      {/* Button to toggle the form */}
      <button type="button" onClick={toggleForm}>
        {isFormOpen ? "Close Form" : "Add Note"}
      </button>

      {/* Form to add a new note (conditionally rendered based on isFormOpen) */}
      {isFormOpen && (
        <form>
          <label htmlFor="newNoteTitle">Title:</label>
          <input
            type="text"
            id="newNoteTitle"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <br />

          <label htmlFor="newNoteContent">Content:</label>
          <textarea
            id="newNoteContent"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
          />
          <br />

          <button type="button" onClick={addNewNote}>
            Add Note
          </button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
