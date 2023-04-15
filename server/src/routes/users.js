const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authenticateToken = require("../auth/token_validator");
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const email = req.query.email;

  // User has provided an email, thus search for a specific user with that email
  if (email != null) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (user) {
        user.password = undefined;
        res.status(200).json(user);
      } else {
        res.status(404).send("message: User not found");
      }
    } catch (err) {
      res.status(400).send("message:" + err);
      console.log(err);
    }
    return;
  }

  // User has not provided an email, thus return all users

  // Get requester user type
  try {
    const requesterUser = await User.findOne({ email: req.email }).exec();
    const userType = requesterUser.userType;
    if (userType != "admin") {
      res.status(403).send("message: Forbidden");
      return;
    }
  } catch (err) {
    res.status(400).send("message:" + err);
    console.log(err);
  }

  try {
    const users = await User.find({}).exec();
    // Remove password from each user
    users.forEach((user) => {
      user.password = undefined;
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send("message:" + err);
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !validator.isEmail(email)) {
    return res.status(422).json({ errors: [{ msg: "Invalid email address" }] });
  }
  if (!password || password.trim().length < 8) {
    return res
      .status(422)
      .json({
        errors: [{ msg: "Password must be at least 8 characters long" }],
      });
  }
  try {
    const newUser = new User({ email, password });
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    newUser.password = undefined;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send("message:" + error);
    console.log(error);
  }
});


// Get user by id
router.get("/:id", getUser, authenticateToken, async (req, res) => {
  try {
    const { email, userType } = res.user;
    const user = { email, userType };
    res.json(user);
  } catch (error) {
    res.status(400).send("message" + error.message);
  }
});

router.patch("/", async (req, res) => {
  res.sendStatus(200);
});

// Update user by id
router.patch("/:id", authenticateToken, async (req, res) => {
  const { subscribedTo, savedPostings, firstName, lastName, age, userType } =
    req.body;
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { firstName, lastName, age, userType },
      { new: true } // return the updated document
    );
    if (!updatedUser) {
      return res.status(404).send(`User with ID ${userId} not found`);
    }

    const existingEmployers = user.subscribedTo;
    const uniqueEmployers = subscribedTo.filter(
      (name) => !existingEmployers.includes(name)
    );

    if (uniqueEmployers.length === 0) {
      res.status(400).send("All names already exist");
      return;
    }

    const existingSavedPostings = user.savedPostings;
    const uniqueSavedPostings = savedPostings.filter(
      (name) => !existingSavedPostings.includes(name)
    );

    if (uniqueSavedPostings.length === 0) {
      res.status(400).send("All names already exist");
      return;
    }

    user.subscribedTo = [...existingEmployers, ...uniqueEmployers];
    user.savedPostings = [...existingSavedPostings, ...uniqueSavedPostings];
    await user.save();
    res.send(`User with ID ${userId} has been updated`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete user by id
router.delete("/:id", authenticateToken, async (req, res) => {
  const userId = req.params.id;
  try {
    // Find and delete the user with the specified ID from the database
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).send(`User with ID ${userId} not found`);
    }

    res.send(`User with ID ${userId} has been deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Find user by id
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
