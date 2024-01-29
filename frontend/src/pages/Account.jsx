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

      // Fetch user details from the server
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

      console.log("user data is: " + data);
      console.dir(data);

      // Update state with user details
      setUserData({
        username: data.username,
        email: data.email,
        profilePictureUrl: data.profilePictureUrl,
      });
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const handleSignOut = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    setAuthenticated(false);
    // Navigate to the sign-in page or another route
    navigate("/signin");
    console.log("sign out succesful");
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
