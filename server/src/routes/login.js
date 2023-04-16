const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validate inputs to avoid injections
  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).send("message: Invalid input");
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("message: User not found");
      return;
    }
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { email },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      const refreshToken = jwt.sign(
        { email },
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      res.status(201).json({ accessToken, refreshToken });
    } else {
      res.status(400).send("message: Password is incorrect");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("message: Server error");
  }
});

module.exports = router;
