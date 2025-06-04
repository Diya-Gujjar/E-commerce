const Product = require("../models/Product");
const User = require("../models/userModel");
const { mongoose } = require("mongoose");
const index = require("../algolia");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById({ _id: id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { userId, seller } = req.body;
  const {
    name,
    description,
    price,
    discount,
    category,
    image,
    stock,
    size,
    color,
    highlights,
    availableOffers,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user || !user.isSeller) {
      return res
        .status(403)
        .json({ message: "You are not authorized to add a product" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const newProduct = new Product({
      userId: userObjectId,
      name,
      description,
      price,
      discount,
      category,
      image,
      stock,
      size,
      color,
      seller,
      availableOffers,
      highlights,
    });

    await newProduct.save();
    await User.findByIdAndUpdate(
      userId,
      { $push: { productIds: newProduct._id } },
      { new: true }
    );
    await index.saveObject({
      objectID: newProduct._id.toString(),
      name,
      description,
      price,
      discount,
      category,
      image,
      stock,
      size,
      color,
      highlights,
      availableOffers,
      seller,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { _id } = req.params;
  const { userId } = req.body;

  try {
    const product = await Product.findById({ _id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.userId != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    await index.partialUpdateObject({
      objectID: updatedProduct._id.toString(),
      ...req.body,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.userId != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    const user = await User.findById(product.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedProductIds = user.productIds.filter(
      (productId) => productId.toString() !== id
    );

    user.productIds = updatedProductIds;
    await user.save();

    await Product.findByIdAndDelete(id);
    await index.deleteObject(id.toString());

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductOfSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (!user || !user.isSeller) {
      return res.status(403).json({ message: "User not found as seller" });
    }

    const products = await Product.find({
      _id: { $in: user.productIds },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = String(req.query.query || "").trim();
    console.log("Final processed query:", query);
    if (!query || typeof query !== "string" || query.trim() === "") {
      return res
        .status(400)
        .json({ message: "Valid query parameter is required." });
    }

    const products = await Product.find({
      name: new RegExp(query, "i"),
      // $or: [
      //   { name: new RegExp(query, "i") },
      //   { description: new RegExp(query, "i") },
      //   { highlights: new RegExp(query, "i") },
      // ],
    });
    // .select("name description highlights");

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching your search." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .json({ message: "An error occurred during the search operation." });
  }
};
