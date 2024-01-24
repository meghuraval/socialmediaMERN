// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSignIn = () => {
    navigate("/signin"); // Navigate to /signin route
  };

  const handleSignUp = () => {
    navigate("/signup"); // Navigate to /signup route
  };

  return (
    <div>
      <header>
        <h1>Welcome to My Notes App</h1>
      </header>
      <section>
        <p>
          Start jotting down your thoughts and ideas. This simple notes app
          helps you stay organized.
        </p>
        <p>Get started by creating your first note!</p>
      </section>
      <section>
        <h2>Features:</h2>
        <ul>
          <li>Create and edit notes</li>
          <li>Organize notes with categories or tags</li>
          <li>Search for specific notes</li>
        </ul>
      </section>
      <section>
        {/* Button for Sign In */}
        <button onClick={handleSignIn}>Sign In</button>

        {/* Button for Sign Up */}
        <button onClick={handleSignUp}>Sign Up</button>
      </section>
      <footer>
        <p>&copy; 2024 My Notes App</p>
      </footer>
    </div>
  );
}
