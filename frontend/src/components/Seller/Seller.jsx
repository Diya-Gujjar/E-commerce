import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import "./Seller.css";

function Seller() {
  const [products, setProducts] = useState([]);
  const [isSeller, setIsSeller] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sellerName, setSellerName] = useState("");

  const storedData = sessionStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/auth/user/${storedData}`
      );
      const data = response.data.userdata;
      setUserId(data._id);
      setSellerName(data.name);
      setIsSeller(data.isSeller);

      if (!data.isSeller) {
        console.error("Not Registered as Seller");
        window.location.href = "/registerSeller";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchSellerProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/seller/${storedData}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };

  useEffect(() => {
    if (!storedData) {
      console.error("Please login to continue");
      window.location.href = "/login";
    } else {
      fetchUserData();
    }
  }, [storedData]);

  useEffect(() => {
    if (sellerName) {
      fetchSellerProducts();
    }
  }, [sellerName]);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`, {
        data: { userId: storedData },
      });
      alert("Product deleted successfully!");
      fetchSellerProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = (productId) => {
    window.location.href = `/updateProduct/${productId}`;
  };

  const handleAddProduct = () => {
    window.location.href = "/addProduct";
  };

  return (
    <div className="seller-page">
      <Header />
      <div className="seller-content">
        {isSeller && products.length > 0 ? (
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-listed-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-listed-img"
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <div className="product-actions">
                    <button
                      className="btn-update"
                      onClick={() => handleUpdateProduct(product._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found. Please add products.</p>
        )}
        <div className="add-product-button">
          <button onClick={handleAddProduct} className="btn-add-product">
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Seller;
