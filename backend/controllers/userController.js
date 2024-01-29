const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcryptjs");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../utils/mernnotesapp-key.json"),
  projectId: "mernnotesapp",
});

// handling file uplaod
const uploadFileToStorage = async (file) => {
  try {
    if (!file || !file.name) {
      throw new Error("File or originalname is not defined");
    }

    const bucketName = "notes_profile_picture_storage";
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(`profilePictures/${file.name}`);
    const blobStream = blob.createWriteStream();

    blobStream.end(file.data); // Use file.data instead of file.buffer

    // Get the public URL of the uploaded file
    const downloadUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file to storage:", error.message);
    throw error;
  }
};

// Controller to create a user
const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the request contains files
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const profilePicture = req.files.profilePicture;

    // Process the uploaded file, save to storage, etc.
    const profilePictureUrl = await uploadFileToStorage(profilePicture);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      profilePictureURL: profilePictureUrl,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", profilePictureUrl });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json(error.message);
  }
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

    // Check if user._id is defined before converting to string
    const userId = user._id ? user._id.toString() : null;

    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId }, "secretkeytest", {
      expiresIn: "1h",
    });

    // Send the userId along with the token in the response
    res.status(200).json({ message: "Sign-in successful", token, userId });
  } catch (error) {
    console.error("Error signing in user:", error.message);
    res.status(500).json(error.message);
  }
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
