const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureURL: {
    type: String,
    default: null, // You can set a default value if no picture is uploaded yet
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
