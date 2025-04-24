const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0 },
    size: [String],
    color: [String],
    ratings: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
      },
    ],
    discount: { type: Number, default: 0 },
    availableOffers: { type: [String] },
    highlights: { type: [String] },
    deliveryCharge: { type: Number, default: 0 },
    seller: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
