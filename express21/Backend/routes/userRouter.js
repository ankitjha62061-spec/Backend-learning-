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
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.json({ message: "Login success" });
});




router.get("/", authMiddleware, (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error adding user" });
  }
});





// put
router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = users.find((u) => u.id == id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    user.name = name;
    user.email = email;

    res.json({
      message: "User updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});





// patch
router.patch("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

    const user = users.find((u) => u.id == id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    res.json({
      message: "User partially updated",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Error patching user" });
  }
});


// delete

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

    const index = users.findIndex((u) => u.id == id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    res.json({
      message: "User deleted successfully",
      user: deletedUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});


// // test  
// router.get("/test", async (req, res) => {
//   try {
//     const user = new User({
//       email: "test@gmail.com",
//       password: "123456",
//     });

//     await user.save();

//     res.send("User saved in MongoDB");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });



module.exports = router;
