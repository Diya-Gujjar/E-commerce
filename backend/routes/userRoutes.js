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
  emptyCart,
} = require("../controllers/userController");

router.post("/cart", addToCart);
router.get("/cart/:userId", getCart);
router.put("/cart", updateCart);
router.delete("/cart/:productId", removeFromCart);
router.delete("/cart/empty/:userId", emptyCart);

router.post("/order/:userId", placeOrder);
router.get("/orders/:userId", getOrders);

router.put("/address/:user_id", updateAddress);

module.exports = router;
