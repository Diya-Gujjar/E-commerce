const express = require("express");
const fs = require("fs");
const cors = require("cors");

let app = express();

app.use(cors());

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

app.use(express.json());

app.post("/api/product/post", (req, res) => {
  console.log(req.body);
  res.send("created");
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
