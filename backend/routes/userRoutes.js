const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  placeOrder,
  getOrders,
  updateAddress,
} = require("../controllers/userController");

router.post("/cart", addToCart);
router.get("/cart", getCart);
router.put("/cart", updateCart);
router.delete("/cart/:productId", removeFromCart);

router.post("/order", placeOrder);
router.get("/orders", getOrders);

router.put("/address", updateAddress);

module.exports = router;
