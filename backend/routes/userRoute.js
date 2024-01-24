// Import necessary modules
const express = require("express");
const router = express.Router();
const { createUser, getUserDetails } = require("../controllers/userController");
const fileUpload = require("express-fileupload");
const verifyToken = require("../middleware/verifyToken");

router.use(fileUpload());

//routes
router.post("/createUser", createUser);
router.get("/user/getUserDetails", verifyToken, getUserDetails);

module.exports = router;
