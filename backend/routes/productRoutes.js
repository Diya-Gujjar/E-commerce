const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/category/:category", getProductByCategory);

module.exports = router;
