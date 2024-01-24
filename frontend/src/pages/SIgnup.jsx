/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const submitForm = () => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    fetch("http://localhost:3000/user/createUser", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Server response:", error.message);
      });
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div>
      <h2>User Form</h2>

      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
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

        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <br />

        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
