const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo Connected", process.env.MONGO_URI);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
