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

    console.log("FormData content:");
    for (const [key, value] of form.entries()) {
      const displayValue = value instanceof File ? value.name : value;
      console.log(`${key}: ${displayValue}`);
    }

    fetch("https://notes-mern-app-aoww.onrender.com/user/createUser", {
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
    <div className="flex justify-center flex-col content-center items-center">
      <p className="text-4xl py-5 font-semibold">Sign Up</p>
      <form
        encType="multipart/form-data"
        className="flex flex-col items-center pt-[5dvh] border-[2px] border-gray-400 w-[80dvw] rounded-2xl"
      >
        <label htmlFor="username" className="">
          Username:
        </label>
        <input
          className="border border-black"
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
          className="border border-black"
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
          className="border border-black"
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
          className="border border-black"
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <br />

        <button
          type="button"
          className="py-3 bg-blue-300 px-5 mb-5 rounded-lg border-blue-400 border-[2px] shadow-xl hover:scale-105 duration-300"
          onClick={submitForm}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
