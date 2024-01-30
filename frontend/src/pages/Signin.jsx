/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../firebase";

// eslint-disable-next-line react/prop-types
const Signin = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("userId", data.userId);

      console.log("User ID", data.userId);
      console.log("Sign-in successful:", data);
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      // Call the signInWithGooglePopup function
      const userCredential = await signInWithGooglePopup();

      // Access the signed-in user
      const user = userCredential.user;

      // Save user information to localStorage or perform other actions
      localStorage.setItem("jwtToken", user.accessToken);
      localStorage.setItem("userId", user.uid);

      console.log("User ID", user.uid);
      console.log("Google Sign-in successful:", user);
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <h2 className="">Sign In</h2>

      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
