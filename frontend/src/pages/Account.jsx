/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profilePictureUrl: "",
  });

  const getUserDetails = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("jwtToken");

      // Check if the user is signed in with Google
      const isGoogleSignIn = localStorage.getItem("isGoogleSignIn") === "true";

      if (isGoogleSignIn) {
        // Retrieve information from localStorage for Google sign-in
        const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");
        const userProfilePictureUrl = localStorage.getItem(
          "userProfilePictureUrl"
        );

        // Update state with user details
        setUserData({
          username: userName,
          email: userEmail,
          profilePictureUrl: userProfilePictureUrl,
        });
      } else {
        // Fetch user details from the server for non-Google sign-in
        const response = await fetch(
          "http://localhost:3000/user/getUserDetails",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Update state with user details for non-Google sign-in
        setUserData({
          username: data.username,
          email: data.email,
          profilePictureUrl: data.profilePictureUrl,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const handleSignOut = () => {
    // Remove the JWT token and user details from localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isGoogleSignIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfilePictureUrl");

    setAuthenticated(false);

    // Navigate to the sign-in page or another route
    navigate("/signin");
    console.log("sign out successful");
  };

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserDetails();
  }, []);

  return (
    <div>
      <h2>Account Details</h2>

      {userData.profilePictureUrl && (
        <img src={userData.profilePictureUrl} alt="Profile" />
      )}

      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Account;
