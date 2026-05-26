const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer");

const authMiddleware = require("../middleware/authMiddleware");

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.post("/",authMiddleware,   upload.single("image"), addProduct);
router.get("/", getProducts);

router.delete("/:id",authMiddleware, deleteProduct);
router.put("/:id",authMiddleware,upload.single("image"),updateProduct);

module.exports = router;