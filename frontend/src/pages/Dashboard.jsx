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
        `https://notes-mern-app-aoww.onrender.com/note/allNotes/${userId}`,
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

      const response = await fetch(
        "https://notes-mern-app-aoww.onrender.com/note/createNote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(noteData),
        }
      );

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
        `https://notes-mern-app-aoww.onrender.com/note/deleteNote/${noteId}`,
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
        `https://notes-mern-app-aoww.onrender.com/note/editNote/${editNoteId}`,
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
    <div className="flex flex-col md:grid" key={note._id}>
      <div className="bg-slate-200 w-[80%] h-[100%] mb-4 rounded-lg mx-auto relative flex flex-col overflow-hidden pb-5">
        <h3 className="py-2 px-2">Title: {note.title}</h3>
        <p className="py-2 px-2">Description: {note.content}</p>
        <div className="flex absolute bottom-0 gap-[5px] bg-slate-300 w-[100%]">
          <button
            className="py-1 px-3 bg-red-400 rounded-lg"
            onClick={() => deleteNote(note._id)}
          >
            Delete
          </button>
          <button
            className="py-1 px-3 bg-blue-400 rounded-lg"
            onClick={() => startEditNote(note._id)}
          >
            Edit
          </button>
        </div>
        <hr />
      </div>
    </div>
  );

  // ... (Other code for rendering notes, folders, etc.)

  return (
    <div className="">
      <p className="text-4xl py-5 bg-slate-200">Welcome to your dashboard!</p>

      {/* Button to toggle the form */}
      <button
        className="py-5 pb-10 text-3xl underline text-blue-400 flex mx-auto"
        type="button"
        onClick={toggleForm}
      >
        {isFormOpen ? "Close Form" : "Add New Note"}
      </button>

      {/* Form to add a new note or edit an existing note */}
      {isFormOpen && (
        <form className="flex flex-col text-center border border-gray-300 rounded-lg bg-slate-100 mb-10">
          <label htmlFor="newNoteTitle">Title:</label>
          <input
            className="w-[20dvh] h-[5dvh mx-auto border-[2px] outline-none"
            type="text"
            id="newNoteTitle"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <br />

          <label htmlFor="newNoteContent">Content:</label>
          <textarea
            className="flex h-[50dvh] w-[70dvh] border-[2px] mx-auto outline-none pl-3 pt-3"
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
            <button
              className="py-1 px-3 bg-blue-400 rounded-lg mb-5 w-[20dvh] h-[5dvh] mx-auto"
              type="button"
              onClick={addNewNote}
            >
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
