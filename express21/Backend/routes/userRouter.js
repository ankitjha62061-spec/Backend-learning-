const express = require("express");
const router = express.Router();
const { createToken } = require("../utils/jwt");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const users = require("../data/users");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

// signup
router.post("/signup", (req, res) => {
  try {
    const { name, email, password } = req.body;

  
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter name, email and password",
      });
    }

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

   
    const hash = bcrypt.hashSync(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hash,
    };

    users.push(newUser);

    return res.status(201).json({
      message: "Signup Successful",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error during signup",
      error: error.message,
    });
  }
});

// login 


router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
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





module.exports = router;
