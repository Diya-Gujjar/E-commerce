import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import "./UserProfile.css";

function UserProfile() {
  const [user, setUser] = useState({});
  const userID = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userID) {
      console.error("Log in first to view orders");
      window.location.href = "/login";
      return;
    }

    axios
      .get(`http://localhost:8000/api/auth/user/${userID}`)
      .then((response) => {
        if (response.data && response.data.userdata) {
          setUser(response.data.userdata);
        } else {
          console.log("No user found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userID]);

  return (
    <div>
      <Header />
      <div className="profile-content">
        <div className="profile-header">
          <h1>Hello, {user?.name}</h1>
          <div className="profile-details">
            <p>
              <b>Mobile:</b> {user?.mobile}
            </p>
            <p>
              <b>Address:</b>{" "}
              {`${user?.address?.city}, ${user?.address?.state}, ${user?.address?.pinCode}, ${user?.address?.country}`}
            </p>
            <p>
              <b>Last Order:</b>{" "}
              {user?.orders?.length > 0
                ? user.orders[0].orderId
                : "No orders yet"}
            </p>
          </div>
        </div>

        <div className="orders-section">
          <h2>Your Past Orders</h2>
          <div className="orders-list">
            {user?.orders?.length > 0 ? (
              user.orders.map((order) => (
                <div key={order.orderId} className="order-card">
                  <h3>Order ID: {order.orderId}</h3>
                  <p>
                    <b>Total Amount:</b> ₹{order.totalAmount}
                  </p>
                  <p>
                    <b>Payment Status:</b> {order.paymentStatus}
                  </p>

                  <div className="user-products-section">
                    <h4>Products</h4>
                    <div className="user-products">
                      {order.products.map((product) => (
                        <div key={product._id} className="user-product-card">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="user-product-image"
                          />
                          <div className="user-product-details">
                            <p>
                              <b>{product.name}</b>
                            </p>
                            <p>
                              <b>Price:</b> ₹{product.finalPrice}
                            </p>
                            <p>
                              <b>Quantity:</b> {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
