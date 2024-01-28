/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  // Dummy data for user, notes, and folders
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  // Function to add a new note
  const addNewNote = async () => {
    try {
      // Retrieve the authentication token from local storage
      const authToken = localStorage.getItem("jwtToken");

      // Check if the authentication token is available
      if (!authToken) {
        console.error("Authentication token not available");
        return;
      }

      // Assuming you have the user's ID available, replace 'userId' with the actual user ID
      const userId = "userId"; // Replace with the actual user ID

      // Check if the user ID is available
      if (!userId) {
        console.error("User ID not available");
        return;
      }

      // Create a new note object with the provided title and content
      const noteData = {
        title: newNote.title,
        content: newNote.content,
      };

      // Send a request to your backend to create a new note
      const response = await fetch("http://localhost:3000/note/createNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ ...noteData, userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming your controller returns the newly created note
      const createdNote = await response.json();

      // Access the _id of the created note
      const createdNoteId = createdNote.newNote._id;

      // Store createdNoteId in local storage or state for later use
      localStorage.setItem("createdNoteId", createdNoteId);

      // Update the state with the new note
      setNotes([...notes, createdNote.newNote]);
      setNewNote({ title: "", content: "" });

      console.log("Note added successfully!");
    } catch (error) {
      console.error("Error adding new note:", error.message);
    }
  };

  // ... (Other code for rendering notes, folders, etc.)

  return (
    <div>
      <p>hello, welcome to your dashboard!</p>
      {/* Render existing notes */}
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}

      {/* Form to add a new note */}
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
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <br />

        <button type="button" onClick={addNewNote}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
