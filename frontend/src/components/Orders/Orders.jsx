import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const storedData = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!storedData) {
      console.error("Log in first to view orders");
      window.location.href = "/login";
      return;
    }
    axios
      .get(`http://localhost:8000/api/user/orders/${storedData}`)
      .then((response) => {
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          console.log("No orders found");
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [storedData]);

  return (
    <div className="orders-page">
      <Header />
      <div style={{ marginTop: "50px" }}></div>
      <div className="user-orders-container">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p className="empty-orders-text">No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div className="user-order-card" key={order.orderId}>
              <div className="user-order-header">
                <h4>Order ID: {order.orderId}</h4>
                <p>
                  Payment Status:
                  <span className="pymt-status">{order.paymentStatus}</span>
                </p>
                <p className="order-total-pymt">Total: ₹{order.totalAmount}</p>
              </div>

              <div className="all-order-items">
                {order.products.map((item) => (
                  <div className="order-item" key={item.productId}>
                    <div className="ordr-product-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="ordr-product-details">
                      <span className="ordr-product-name">{item.name}</span>
                      <span className="ordr-product-size-color">
                        {item.size && item.color ? (
                          <>
                            Size: {item.size} | Color: {item.color}
                          </>
                        ) : item.size ? (
                          <>Size: {item.size}</>
                        ) : item.color ? (
                          <>Color: {item.color}</>
                        ) : null}
                      </span>

                      <div className="ordr-price-info">
                        <span className="ordr-product-price">
                          ₹{item.price}
                        </span>
                        {item.discount > 0 && (
                          <span className="ordr-product-discount">
                            ₹{item.discount} off
                          </span>
                        )}
                      </div>
                      <span className="ordr-product-quantity">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Orders;
