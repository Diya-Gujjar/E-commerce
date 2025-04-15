import React, { useEffect, useRef, useState } from "react";
import "./AddToCart.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import useStore from "../ZustandStore/Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToCart() {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);

  const cartItems = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const placeOrderRef = useRef();
  const cartRightRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/${category}/${id}`)
      .then((response) => {
        if (response && response.data) {
          setProduct(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Product Details:", error);
      });
  }, [id]);

  const handleInc = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    if (product) {
      updateQuantity(productId, product.quantity + 1);
    }
  };

  const handleDec = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
    toast.info("Item removed from cart");
  };

  const handleSaveForLater = (title) => {
    toast.success(`Saved "${title}" for later`);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        item.quantity * item.price -
        item.quantity * item.discount +
        item.deliveryCharge,
      0
    );
  };

  const getTotalDiscount = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.discount,
      0
    );
  };

  const getTotalDeliveryCharge = () => {
    return cartItems.reduce((total, item) => total + item.deliveryCharge, 0);
  };

  return (
    <div className="cart-page">
      <Header />
      <div style={{ paddingTop: "40px" }} />
      {cartItems.length === 0 ? (
        <div className="empty-cart">Your cart is empty.</div>
      ) : (
        <div>
          <div className="cart-header">My Cart ({cartItems.length})</div>
          <div className="cart-wrapper">
            <div className="cart-left">
              {cartItems.map((item) => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-img">
                    <img src={item.image} alt={item.title} />
                    <div className="qty-remove-container">
                      <div className="qty-control">
                        <button onClick={() => handleDec(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleInc(item.id)}>+</button>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "70%" }}>
                    <div className="cart-info">
                      <h4>{item.title}</h4>
                      <p className="clr">{item.color}</p>
                      <p className="seller">Seller: {item.seller}</p>
                      <div className="price-block">
                        <span className="final-price">
                          ₹{item.price - item.discount}
                        </span>
                        <span className="original-price">₹{item.price}</span>
                        <span className="discount">₹{item.discount} off</span>
                      </div>
                      <div className="action-buttons">
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                        <button
                          className="save-btn"
                          onClick={() => handleSaveForLater(item.title)}
                        >
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="place-order" ref={placeOrderRef}>
                <button
                  onClick={() => toast.success("Order placed successfully!")}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>

            <div className="cart-right" ref={cartRightRef}>
              <h3>PRICE DETAILS</h3>
              <hr />
              <div className="price-row">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <span className="discount-text">- ₹{getTotalDiscount()}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charges</span>
                <span>₹{getTotalDeliveryCharge()}</span>
              </div>
              <hr />
              <div className="price-row total">
                <span>Total Amount</span>
                <span>
                  ₹
                  {getTotalPrice() -
                    getTotalDiscount() +
                    getTotalDeliveryCharge()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddToCart;
