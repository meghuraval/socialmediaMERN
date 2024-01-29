/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchUserNotes = async () => {
    try {
      const authToken = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");

      if (!authToken) {
        console.error("Authentication token not available");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/note/allNotes/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userNotes = await response.json();
      setNotes(userNotes);
    } catch (error) {
      console.error("Error fetching user notes:", error.message);
    }
  };
  useEffect(() => {
    // Fetch existing notes when the component mounts
    fetchUserNotes();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to add a new note
  const addNewNote = async () => {
    try {
      const authToken = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");

      if (!authToken) {
        console.error("Authentication token not available");
        return;
      }

      const noteData = {
        title: newNote.title,
        content: newNote.content,
        userId: userId,
      };

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

      const createdNote = await response.json();
      console.log("Created Note:", createdNote);

      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, createdNote];
        console.log("Updated Notes State:", updatedNotes);
        return updatedNotes;
      });

      setNewNote({ title: "", content: "" });
      await fetchUserNotes();
      console.log("Note added successfully!");
    } catch (error) {
      console.error("Error adding new note:", error.message);
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const renderNote = (note) => (
    <div key={note._id}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <hr />
    </div>
  );

  // ... (Other code for rendering notes, folders, etc.)

  return (
    <div>
      <p>hello, welcome to your dashboard!</p>

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

      {/* Render existing notes */}
      {notes.map(renderNote)}
    </div>
  );
};

export default Dashboard;
