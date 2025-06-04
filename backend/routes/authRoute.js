const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  registerSeller,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/registerSeller", registerSeller);
router.post("/login", login);
router.get("/user/:unqID", getUser);

module.exports = router;
