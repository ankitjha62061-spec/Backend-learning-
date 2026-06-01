const express = require("express");
const router = express.Router();

const { createToken } = require("../utils/jwt");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/upload");
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

      return res.status(404).json({
        message: "User not found"
      });

    }

    const isMatch =
      bcrypt.compareSync(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        message: "Wrong password"
      });

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

  try {

    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;

    const limit = 3;

    const skip = (page - 1) * limit;

    const users = await User.find({

      name: {
        $regex: search,
        $options: "i",
      },

    })
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalUsers =
      await User.countDocuments({

        name: {
          $regex: search,
          $options: "i",
        },

      });


    res.json({

      users,

      currentPage: page,

      totalPages:
        Math.ceil(totalUsers / limit),

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

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

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { name, email } = req.body;

    const userId = req.params.id;

    const existingEmail = await User.findOne({

      email,

      _id: { $ne: userId },

    });




    if (existingEmail) {

      return res.status(400).json({

        message: "Email already exists",

      });

    }

    const updatedUser =
      await User.findByIdAndUpdate(

        userId,

        {
          name,
          email,
        },

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

    res.status(500).json({

      message: error.message,

    });

  }

});



// patch

router.patch("/:id", authMiddleware, async (req, res) => {

  const updatedUser =
    await User.findByIdAndUpdate(

      req.params.id,

      req.body,

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

router.delete("/:id", authMiddleware, async (req, res) => {

  const deletedUser =
    await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {

    return res.json({

      message: "User not found",

    });

  }

  res.json({

    message: "User deleted",

  });

});


//  get log in profile  that shows in profile systemmm  after login 

// get logged in user profile

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    try {

      const user =
        await User.findById(req.user.id)
        .select("-password");

      res.status(200).json(user);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// update profile

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {

    try {

      const {
        name,
        mobile,
        address,
      } = req.body;

      const updatedData = {};

      if (name) {
        updatedData.name = name;
      }

      if (mobile) {
        updatedData.mobile = mobile;
      }

      if (address) {
        updatedData.address = address;
      }

      if (req.file) {
        updatedData.profileImage =
          req.file.filename;
      }

      const updatedUser =
        await User.findByIdAndUpdate(
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