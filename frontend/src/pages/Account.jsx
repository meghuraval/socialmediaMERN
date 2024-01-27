/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Account = () => {
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
    </div>
  );
};

export default Account;
