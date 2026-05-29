const express = require("express");
const router = express.Router();

const { createToken } = require("../utils/jwt");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const upload = require("../middleware/upload");

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

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = createToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = 3;

    const skip = (page - 1) * limit;

    const users = await User.find({
      name: { $regex: search, $options: "i" },
    })
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------------- CREATE USER ----------------------
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    if (email) {
      const existingEmail = await User.findOne({
        email,
        _id: { $ne: userId },
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    // email uniqueness check
    if (req.body.email) {
      const existingEmail = await User.findOne({
        email: req.body.email,
        _id: { $ne: userId },
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User patched",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------------- PROFILE GET ----------------------
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { name, mobile, address } = req.body;

      const updatedData = {};

      if (name) updatedData.name = name;
      if (mobile) updatedData.mobile = mobile;
      if (address) updatedData.address = address;
      if (req.file) updatedData.profileImage = req.file.filename;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updatedData,
        { new: true }
      ).select("-password");

      res.status(200).json({
        message: "Profile Updated",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;