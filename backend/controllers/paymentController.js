import instance from "../config/razorpay.js";
import crypto from "crypto";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  console.log(`order: ${order}`);
  res.status(200).json({ success: true, order });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res
      .status(200)
      .json(
        { success: true, paymentId: razorpay_payment_id },
        { status: "paid" }
      );
  } else {
    res.status(400).json({ success: false });
  }
};
