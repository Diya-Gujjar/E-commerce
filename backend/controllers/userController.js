const User = require("../models/userModel");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.cart.findIndex(
      (item) => item.productId && item.productId === productId
    );

    if (index > -1) {
      user.cart[index].quantity += quantity;
    } else {
      user.cart.push({ productId: productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId);
    res.json(user.cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId);
    res.json(user.orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  const { userId, productId, quantity, size, color } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItemIndex = user.cart.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.size === size &&
        item.color === color
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity = quantity;
    } else {
      user.cart.push({ productId, quantity, size, color });
    }

    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId } = req.query;
  const { productId, size, color } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) =>
        item.productId !== productId ||
        item.size !== size ||
        item.color !== color
    );

    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  const { userId, street, city, state, zipCode, country } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.address = { street, city, state, zipCode, country };
    await user.save();

    res
      .status(200)
      .json({ message: "Address updated successfully", address: user.address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.placeOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user.cart.length)
      return res.status(400).json({ message: "Cart is empty" });

    const total = user.cart.reduce((acc, item) => acc + item.quantity * 100, 0);

    user.orders.push({
      orderId: new Date().getTime(),
      products: [...user.cart],
      totalAmount: total,
    });

    user.cart = [];
    await user.save();

    res.json({ message: "Order placed", orders: user.orders });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error placing order", error: err.message });
  }
};
