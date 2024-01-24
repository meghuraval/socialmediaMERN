const { initializeApp } = require("firebase/app");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePictureUrl = await uploadFileToStorage(profilePicture);

    const newUser = new User({
      username,
      password: hashedPassword,
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
  // Route for this is "http://localhost:3000/user/signin"
};

//controller to sign user in
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // For local authentication (password stored in MongoDB)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id }, "secretkeytest", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Sign-in successful", token });
  } catch (error) {
    console.error("Error signing in user:", error.message);
    res.status(500).json(error.message);
  }
  // Route for this is "http://localhost:3000/user/signin"
};

const getUserDetails = async (req, res) => {
  try {
    // Get the user ID from the decoded token attached by the middleware
    const userId = req.decodedToken.userId;

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the user details in the response
    res.status(200).json({
      username: user.username,
      email: user.email,
      profilePictureUrl: user.profilePictureURL,
    });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json(error.message);
  }
};

module.exports = { createUser, signInUser, getUserDetails };
