const User = require("../models/userModel");
const Product = require("../models/Product");

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
    res.status(500).json({
      message: "Error adding to cart",
      error: err.message,
    });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.json(user.cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: err.message });
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
  console.log("Request Body:", req.body);

  const { user_id } = req.params;
  const { city, state, pinCode, country } = req.body;

  if (!city || !state || !pinCode || !country) {
    return res.status(400).json({ message: "All address fields are required" });
  }

  try {
    const user = await User.findById({ _id: user_id });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.address = { city, state, pinCode, country };
    await user.save();

    res
      .status(200)
      .json({ message: "Address updated successfully", address: user.address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.placeOrder = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderProducts = await Promise.all(
      user.cart.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId).exec();

        if (!product) {
          throw new Error(`Product with ID ${cartItem.productId} not found`);
        }

        const price = Number(product?.price);
        const discount = Number(product?.discount) || 0;
        const deliveryCharge = Number(product?.deliveryCharge) || 0;
        const finalPrice = price - discount;

        return {
          productId: cartItem.productId,
          name: product.name,
          quantity: cartItem.quantity,
          size: cartItem.size,
          color: cartItem.color,
          price,
          discount,
          finalPrice,
          deliveryCharge,
          image: product.image,
          seller: product.seller || "Default Seller",
        };
      })
    );

    const totalAmount = orderProducts.reduce(
      (acc, item) =>
        acc + item.quantity * item.finalPrice + item.deliveryCharge,
      0
    );

    // const totalAmount = orderProducts.reduce(
    //   (acc, item) =>
    //     acc + item.quantity * item.finalPrice + item.deliveryCharge,
    //   0
    // );

    const newOrder = {
      orderId: Date.now().toString(),
      products: orderProducts,
      totalAmount,
      shippingAddress: user.address,
      paymentStatus: "completed",
      status: "pending",
      createdAt: new Date(),
    };

    user.orders.push(newOrder);
    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Order placed", orders: user.orders });
  } catch (err) {
    console.error("Order placement error:", err);
    res
      .status(500)
      .json({ message: "Error placing order", error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ orders: user.orders || [] });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

exports.emptyCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is already empty" });
    }
    user.cart = [];
    await user.save();
  } catch (err) {
    console.error("Cart not Empty:", err);
    res
      .status(500)
      .json({ message: "Error clearing cart", error: err.message });
  }
};
