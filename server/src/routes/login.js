const { MongoClient } = require("mongodb");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email };
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const users = await db.collection("users").find(query).toArray();
    const user = users[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const accessToken = jwt.sign(
      { email },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { email },
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
