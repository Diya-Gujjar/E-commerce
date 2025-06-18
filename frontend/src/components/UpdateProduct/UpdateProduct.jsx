import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateProduct.css";

function UpdateProduct() {
  const userId = sessionStorage.getItem("userId");
  const [product, setProduct] = useState(null);
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

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`
        );
        const fetchedProduct = response.data;
        if (fetchedProduct.userId == userId) {
          setProduct(fetchedProduct);
        }
        setName(fetchedProduct.name);
        setDescription(fetchedProduct.description);
        setPrice(fetchedProduct.price);
        setDiscount(fetchedProduct.discount);
        setCategory(fetchedProduct.category);
        setImage(fetchedProduct.image);
        setStock(fetchedProduct.stock);
        setSize(fetchedProduct.size.join(", "));
        setColor(fetchedProduct.color.join(", "));
        setHighlights(fetchedProduct.highlights.join(", "));
        setOffers(fetchedProduct.availableOffers.join(","));
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/products/${productId}`, {
        userId,
        name,
        description,
        price,
        discount,
        category,
        image,
        stock,
        size: size.split(",").map((s) => s.trim()),
        color: color.split(",").map((c) => c.trim()),
        highlights: highlights.split(",").map((c) => c.trim()),
        offers: offers.split(",").map((c) => c.trim()),
      });
      alert("Product updated successfully!");
      navigate("/seller");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("There was an error updating the product. Please try again.");
    }
  };

  return (
    <div className="update-product-page">
      {product ? (
        <div>
          <h2 className="h2-updt-prod">Update Product</h2>
          <form onSubmit={handleSubmit} className="update-product-form">
            <div className="update-product-form-container">
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Discount:</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Color:</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Size:</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock:</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="add-detail">
              <p style={{ marginBottom: "10px" }}>
                (Add value separated with ,)
              </p>
              <div className="updt-product-desc-container">
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Highlights (comma separated):</label>
                  <textarea
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Available Offers (comma separated):</label>
                  <textarea
                    value={offers}
                    onChange={(e) => setOffers(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="prod-submit">
              Update Product
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Fetching Product by authorized user is not completed...</h2>
          <h4>
            You are either not authorized to update the product or product does
            not exist...
          </h4>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
