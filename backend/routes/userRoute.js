// Import necessary modules
const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserDetails,
  signInUser,
} = require("../controllers/userController");
const fileUpload = require("express-fileupload");
const verifyToken = require("../middleware/verifyToken");

router.use(fileUpload());

//routes
router.post("/createUser", createUser);
router.post("/signin", signInUser);
router.get("/getUserDetails", verifyToken, getUserDetails);

module.exports = router;
