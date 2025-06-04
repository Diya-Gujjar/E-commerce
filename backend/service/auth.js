const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign(user, secret, { expiresIn: "1h" });
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = { setUser, getUser };
