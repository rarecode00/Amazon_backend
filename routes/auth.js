const express = require("express");
const { findOne, create } = require("../models/User");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisissecret";
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Routes 1 : To create the User..

router.post(
  "/createuser",
  body("name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const { name, email, password, mobile } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // If user already Exists....
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "This email is already Exists" });
      }

      let salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(password, salt);
      user = await User.create({
        name: name,
        email: email,
        password: secPass,
        mobile: mobile,
      });
      const data = {
        user: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.json({
        success: true,
        authToken,
        message: "User Created Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// -------------------------------------------End OF Router 1-------------------------------------------------

// Router 2: To login the user with credentials.

router.post("/login", body("email").isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user exists with this email..",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.json({ success: false, message: "Invalid Password." });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(payload, JWT_SECRET);

    return res.json({ success: true, authToken });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// -----------------------------------------End of Router 2 ----------------------------------------------

// Router 3: Get the user details..
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    return res.json({ succes: true, user });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
