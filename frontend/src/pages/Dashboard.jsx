/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

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

  const deleteNote = async (noteId) => {
    try {
      const authToken = localStorage.getItem("jwtToken");

      if (!authToken) {
        console.error("Authentication token not available");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/note/deleteNote/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Note deleted successfully!");

      // After deleting a note, fetch user notes again to update the state
      await fetchUserNotes();
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const editNote = async () => {
    try {
      const authToken = localStorage.getItem("jwtToken");

      if (!authToken) {
        console.error("Authentication token not available");
        return;
      }

      const editedNoteData = {
        title: newNote.title,
        content: newNote.content,
      };

      const response = await fetch(
        `http://localhost:3000/note/editNote/${editNoteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(editedNoteData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Note edited successfully!");
      setIsFormOpen(false);
      // After editing a note, set editNoteId to null to exit edit mode
      setEditNoteId(null);
      // Fetch user notes again to update the state
      await fetchUserNotes();
    } catch (error) {
      console.error("Error editing note:", error.message);
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setEditNoteId(null); // Reset editNoteId when toggling form
    setNewNote({ title: "", content: "" });
  };

  const startEditNote = (noteId) => {
    // Set the note ID to be edited and populate the form fields with existing note data
    const noteToEdit = notes.find((note) => note._id === noteId);
    if (noteToEdit) {
      setEditNoteId(noteId);
      setNewNote({
        title: noteToEdit.title,
        content: noteToEdit.content,
      });
      setIsFormOpen(true);
    }
  };

  const renderNote = (note) => (
    <div key={note._id}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => deleteNote(note._id)}>Delete</button>
      <button onClick={() => startEditNote(note._id)}>Edit</button>
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

      {/* Form to add a new note or edit an existing note */}
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

          {editNoteId ? (
            <button type="button" onClick={editNote}>
              Save Changes
            </button>
          ) : (
            <button type="button" onClick={addNewNote}>
              Add Note
            </button>
          )}
        </form>
      )}

      {/* Render existing notes */}
      {notes.map(renderNote)}
    </div>
  );
};

export default Dashboard;
