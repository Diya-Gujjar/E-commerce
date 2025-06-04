const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());

let electronics = [];
fs.readFile("./data/electronics.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading product data:", err);
    return;
  }
  electronics = JSON.parse(data);
});

let smartPhone = [];
fs.readFile("./data/smartPhone.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading product data:", err);
    return;
  }
  smartPhone = JSON.parse(data);
});

app.get("/api/electronics", (req, res) => {
  if (electronics.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "No products found",
    });
  }
  res.json(electronics);
});

app.get("/api/smartPhone", (req, res) => {
  if (smartPhone.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "No products found",
    });
  }
  res.json(smartPhone);
});

app.get("/api/electronics/:id", (req, res) => {
  const id = req.params.id;
  const elect = electronics.find((elect) => elect.id === id);
  if (elect) {
    res.json(elect);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.get("/api/smartPhone/:id", (req, res) => {
  const id = req.params.id;
  const phone = smartPhone.find((phone) => phone.id === id);
  if (phone) {
    res.json(phone);
  } else {
    res.status(404).json({ error: "Phone not found" });
  }
});

// app.get("/api/:category/:id", (req, res) => {
//   const id = req.params.id;
//   const category = req.params.category;
//   const prod = { category }.find((prod) => prod.id === id);
//   if (prod) {
//     res.json(prod);
//   } else {
//     res.status(404).json({ error: "Product not found" });
//   }
// });

app.post("/api/register", async (req, res) => {
  const { mobile, username, password } = req.body;

  const userExists = users.find((user) => user.mobile === mobile);
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { mobile, username, password: hashedPassword };
  users.push(newUser);

  res
    .status(201)
    .json({ success: true, message: "User registered successfully!" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, "your_jwt_secret", {
    expiresIn: "1h",
  });

  res.json({ success: true, message: "Login successful", token });
});

app.post("/api/product/post", (req, res) => {
  console.log(req.body);
  res.send("created");
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
