import { useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [highlights, setHighlights] = useState("");
  const [offers, setOffers] = useState("");
  const [sellerName, setSellerName] = useState("");

  const storedData = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const convertToArray = (input) => {
      return input
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    };

    try {
      await axios.post("http://localhost:8000/api/products", {
        name,
        description,
        price: Number(price),
        discount: Number(discount),
        category,
        image,
        stock: Number(stock),
        size: convertToArray(size),
        color: convertToArray(color),
        sellerName,
        userId: storedData,
        highlights: convertToArray(highlights),
        availableOffers: convertToArray(offers),
        seller: sellerName,
      });

      alert("Product added successfully!");
      navigate("/seller");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("There was an error adding the product. Please try again.");
    }
  };

  return (
    <div className="add-product-page">
      <Header />
      <div style={{ paddingTop: "60px" }}></div>
      <div>
        <h2 className="h2-new-prod">Add New Product Details:</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="add-product-form-container">
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                value={name}
                placeholder="Name of Product"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={category}
                placeholder="Category of Product"
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Seller:</label>
              <input
                type="text"
                value={sellerName}
                placeholder="Name of Seller"
                onChange={(e) => setSellerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={image}
                placeholder="URL of Image"
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                value={price}
                placeholder="Price of Product"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Discount:</label>
              <input
                type="number"
                value={discount}
                placeholder="Discount on Product"
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Color:</label>
              <input
                type="text"
                value={color}
                placeholder="Color of Product"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Size:</label>
              <input
                type="text"
                value={size}
                placeholder="Size of Product"
                onChange={(e) => setSize(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Stock:</label>
              <input
                type="number"
                value={stock}
                placeholder="Available Stock"
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="add-detail">
            <p style={{ marginBottom: "10px" }}>(Add value separated with ,)</p>
            <div className="add-product-desc-container">
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={description}
                  placeholder="Description of Product"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Highlights of Product:</label>
                <textarea
                  value={highlights}
                  placeholder="Highlights about Product"
                  onChange={(e) => setHighlights(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Available Offers:</label>
                <textarea
                  value={offers}
                  placeholder="Available Offers"
                  onChange={(e) => setOffers(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="prod-submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
