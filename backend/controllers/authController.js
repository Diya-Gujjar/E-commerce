const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { setUser } = require("../service/auth");

exports.register = async (req, res) => {
  const { mobile, name, password } = req.body;

  try {
    const exists = await User.findOne({ mobile });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ mobile, name, password: hashedPassword });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "Registered successfully", user: savedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = setUser({ userId: user._id });

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
      unqID: user.user_id,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Login failed by controller", error: err.message });
  }
};

exports.registerSeller = async (req, res) => {
  const { mobile, name, password, gstIn } = req.body;

  try {
    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      if (existingUser.isSeller) {
        return res.status(400).json({ message: "Seller already exists" });
      }

      existingUser.isSeller = true;

      if (gstIn) {
        existingUser.gstIn = gstIn;
      }

      await existingUser.save();
      return res.status(200).json({
        message: "User upgraded to Seller successfully",
        user: existingUser,
        userId: User._id,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        mobile,
        name,
        password: hashedPassword,
        gstIn,
        isSeller: true,
      });
      const savedUser = await newUser.save();

      return res.status(201).json({
        message: "Seller registered successfully",
        user: savedUser,
        userId: User._id,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const { unqID } = req.params;
  try {
    const userdata = await User.findById({ _id: unqID });
    if (!userdata) {
      console.log("No user found with the given ID in get user");
    }
    res.json({ userdata });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};
