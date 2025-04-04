const express = require("express");
const fs = require("fs");
const cors = require("cors");

let app = express();

app.use(cors());

let product = [];

fs.readFile("./data/product.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading product data:", err);
    return;
  }
  product = JSON.parse(data);
});

let carousel = [];
fs.readFile("./data/carousel.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error in rendering Carousel", err);
    return;
  }
  carousel = JSON.parse(data);
});

app.get("/api/product", (req, res) => {
  if (product.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "No products found",
    });
  }

  res.json({
    status: "success",
    data: product,
  });
});

app.get("/api/carousel/:id", (req, res) => {
  const id = req.params.id * 1;
  res.json({
    data: carousel[id - 1],
  });
});

app.use(express.json());

app.post("/api/product/post", (req, res) => {
  console.log(req.body);
  res.send("created");
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
