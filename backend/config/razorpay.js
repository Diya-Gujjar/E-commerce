import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

export default instance;
