const express = require("express");
const { findOne, create } = require("../models/User");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisissecret";
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/authController");

// Routes 1 : To create the User..

router.post(
  "/createuser",
  body("name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  authController.signUp
);

// Router 2: To login the user with credentials.

router.post("/login", body("email").isEmail(), authController.login);

// Router 3: Get the user details..
router.get("/getuser", fetchuser, authController.getUser);

module.exports = router;
