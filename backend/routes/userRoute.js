// Import necessary modules
const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

//routes
router.post("/createUser", createUser);

module.exports = router;
