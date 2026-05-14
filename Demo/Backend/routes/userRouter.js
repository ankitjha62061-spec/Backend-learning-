const express = require("express");
const router = express.Router();
const { createToken } = require("../utils/jwt");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
// const users = require("../data/users");
const User = require("../models/User"); 
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";



// signup in mongo 

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter name, email and password",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hash = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful (saved in MongoDB)",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
});




// login mongo 

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = createToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});




router.get("/", authMiddleware, async (req, res) => {

  const users = await User.find().select("-password");

  res.json(users);
});








router.post("/", authMiddleware, async (req, res) => {

  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hash,
  });

  await newUser.save();

  res.json({
    message: "User created",
    user: newUser,
  });
});






// put
router.put("/:id", authMiddleware, async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return res.json({
      message: "User not found",
    });
  }

  res.json({
    message: "User updated",
    user: updatedUser,
  });
});

// patch
router.patch("/:id", authMiddleware, async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    // { new: true }
     { returnDocument: "after" }
  ).select("-password");

  if (!updatedUser) {
    return res.json({
      message: "User not found",
    });
  }

  res.json({
    message: "User patched",
    user: updatedUser,
  });
});

// delete

router.delete("/:id", authMiddleware, async (req, res) => {

  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return res.json({
      message: "User not found",
    });
  }

  res.json({
    message: "User deleted",
  });
});



module.exports = router;
