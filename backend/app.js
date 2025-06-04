import { createRequire } from "module";
const require = createRequire(import.meta.url);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoute");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/api/getKey", (req, res) => {
  res.status(200).json({ key: process.env.Razorpay_Key });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
