/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const NoteModal = ({ isOpen, onClose, note }) => {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto ${
        isOpen ? "block" : "hidden"
      } bg-gray-800 bg-opacity-75`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
          <p className="text-gray-700">{note.content}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
