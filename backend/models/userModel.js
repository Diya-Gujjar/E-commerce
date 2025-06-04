const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isSeller: { type: Boolean, required: true, default: false },
    gstIn: { type: String },
    address: {
      city: String,
      state: String,
      pinCode: String,
      country: String,
    },

    cart: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        size: String,
        color: String,
      },
    ],
    orders: [
      {
        orderId: { type: String },
        products: [
          {
            productId: { type: String },
            name: String,
            quantity: Number,
            size: String,
            color: String,
            price: Number,
            discount: Number,
            finalPrice: Number,
            deliveryCharge: Number,
            image: String,
            seller: String,
          },
        ],
        totalAmount: Number,
        shippingAddress: {
          street: String,
          city: String,
          state: String,
          zipCode: String,
          country: String,
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "completed", "failed"],
          default: "pending",
        },
        status: {
          type: String,
          enum: ["pending", "shipped", "delivered"],
          default: "pending",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
