const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductOfSeller,
  searchProducts,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:_id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/category/:category", getProductByCategory);
router.get("/seller/:id", getProductOfSeller);
router.get("/search", searchProducts);

module.exports = router;
