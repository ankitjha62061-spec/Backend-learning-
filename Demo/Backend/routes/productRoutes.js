const express = require("express");

const router = express.Router();
const upload = require ("../middleware/multer")

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productContoller");

router.post("/", upload.single("image"), addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("image"), updateProduct);

module.exports = router;  