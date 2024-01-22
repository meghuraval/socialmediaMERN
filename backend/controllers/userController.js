const { initializeApp } = require("firebase/app");
const User = require("../models/userModel");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// handling file uplaod
const uploadFileToStorage = async (file) => {
  try {
    // Check if file and originalname are defined
    if (!file || !file.originalname) {
    }

    const storageRef = ref(storage, `profilePictures/${file.originalname}`);
    await uploadBytes(storageRef, file.buffer);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file to storage:", error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

// Controller to create a user

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const profilePicture = req.files.profilePicture;

    const profilePictureUrl = await uploadFileToStorage(profilePicture);

    const newUser = new User({
      username,
      password,
      email,
      profilePictureURL: profilePictureUrl,
    });

    // Save the user to MongoDB
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", profilePictureUrl });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json(error.message);
  }
  //route for this will be "http://localhost:3000/user/createUser"
};

module.exports = { createUser };
