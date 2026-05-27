const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  deleteFromCart
} = require("../controllers/cartController");

router.post("/add", authMiddleware, addToCart);
router.delete("/delete/:id", authMiddleware, deleteFromCart);

module.exports = router;