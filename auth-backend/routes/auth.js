// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ name, email, password: hashed });
//     res.status(201).json({ message: "User created" });
//   } catch (err) {
//     res.status(400).json({ error: "Email already exists" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ error: "User not found" });

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(401).json({ error: "Invalid password" });

//   const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
//   res.json({ token });
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/Register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
