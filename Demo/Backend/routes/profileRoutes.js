const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const User = require("../models/User");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/",
  authMiddleware,
  upload.single("profileImage"),  
  async (req, res) => {
    try {
      const { name, mobile, address } = req.body;

      const updatedData = {};

      if (name)    updatedData.name    = name;
      if (mobile)  updatedData.mobile  = mobile;
      if (address) updatedData.address = address;

      if (req.file) {
        updatedData.profileImage = req.file.filename;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updatedData,
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
