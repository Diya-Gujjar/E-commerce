import { useEffect, useState } from "react";
import "./AddToCart.css";
import axios from "axios";
import Header from "../Header/Header";
import useStore from "../ZustandStore/Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confirmation from "../Confirmation/Confirmation";
import EnterAddress from "../EnterAddress/EnterAdress";

function AddToCart() {
  const { cart } = useStore((state) => state);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const [userData, setUserData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [step, setStep] = useState("idle"); // idle | confirm | enter | payment

  const userID = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userID) {
      window.location.href = "/login";
    } else {
      useStore.getState().loadCartFromBackend(userID);
      fetchUserData();
    }
  }, [userID]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/auth/user/${userID}`
      );
      const data = response.data.userdata;
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (cart.length === 0) return;

    const fetchProductDetails = async () => {
      const details = await Promise.all(
        cart.map(async (item) => {
          if (!item.productId) {
            console.error(
              "Error: productId is undefined for a cart item",
              item
            );
            return null;
          }
          try {
            const response = await axios.get(
              `http://localhost:8000/api/products/${item.productId}`
            );
            const data = response.data;
            console.log(data);
            return {
              ...data,
              quantity: item.quantity,
              productId: item.productId,
            };
          } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
          }
        })
      );

      setProductDetails(details.filter((item) => item !== null));
    };

    fetchProductDetails();
  }, [cart]);

  useEffect(() => {
    const total = productDetails.reduce((total, item) => {
      return (
        total +
        item.quantity * item.price -
        item.quantity * (item.discount || 0) +
        (item.deliveryCharge || 0)
      );
    }, 0);
    setTotalAmount(total);
  }, [productDetails]);

  const handlePlaceOrder = () => {
    if (userData?.address) {
      setStep("confirm");
    } else {
      setStep("enter");
    }
  };

  const handleAddressChange = async (e) => {
    setStep("enter");
  };

  const handleAddressUpdated = async () => {
    await fetchUserData();
    setStep("confirm");
  };

  const handleConfirm = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) return alert("Razorpay SDK failed to load");

    const {
      data: { key },
    } = await axios.get("http://localhost:8000/api/getKey");

    const {
      data: { order },
    } = await axios.post("http://localhost:8000/api/payment/checkout", {
      amount: totalAmount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "DIYA'S ECOMMERCE",
      description: "Order Payment",
      image:
        "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus_mobile-39120d.svg",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        const verifyRes = await axios.post(
          "http://localhost:8000/api/payment/paymentVerification",
          {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          }
        );
        if (verifyRes.data.success) placeOrder();
        else toast.error("Payment verification failed");
      },
      prefill: {
        contact: userData?.mobile || "",
      },
      notes: {
        address: userData?.address || "",
      },
      theme: {
        color: "#2874f0",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/order/${userID}`
      );
      if (response.status === 200) {
        toast.success("Order placed successfully!");
        setTimeout(() => {
          window.location.href = "/orders";
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="cart-page">
      <Header />
      <div style={{ paddingTop: "40px" }} />
      {step === "confirm" && userData && (
        <Confirmation
          onConfirm={handleConfirm}
          userData={userData}
          onChangeAddress={handleAddressChange}
        />
      )}
      {step === "enter" && <EnterAddress onSubmit={handleAddressUpdated} />}
      {step === "idle" && (
        <>
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
          ) : (
            <div>
              <div className="cart-header">My Cart ({cart.length})</div>
              <div className="cart-wrapper">
                <div className="cart-left">
                  {productDetails.map((item) => (
                    <div className="cart-card" key={item.productId}>
                      <div className="cart-img">
                        <img src={item.image} alt={item.name} />
                        <div className="qty-remove-container">
                          <div className="qty-control">
                            {item.quantity >= 1 && (
                              <button
                                onClick={() => {
                                  if (item.quantity > 1)
                                    updateQuantity(
                                      item.productId,
                                      item.quantity - 1,
                                      userID
                                    );
                                }}
                              >
                                -
                              </button>
                            )}
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                  userID
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "70%" }}>
                        <div className="cart-info">
                          <h4>{item.name}</h4>
                          {item.color && (
                            <p className="clr">{item.color || "N/A"}</p>
                          )}
                          {item.size && (
                            <p className="size">{item.size || "N/A"}</p>
                          )}
                          <p className="seller">
                            Seller: {item.seller || "Flipkart"}
                          </p>
                          <div className="price-block">
                            <span className="final-price">
                              ₹{item.price - (item.discount || 0)}
                            </span>
                            <span className="original-price">
                              ₹{item.price}
                            </span>
                            <span className="discount">
                              ₹{item.discount || 0} off
                            </span>
                          </div>
                          <div className="action-buttons">
                            <button
                              className="remove-btn"
                              onClick={() =>
                                removeFromCart(item.productId, userID)
                              }
                            >
                              Remove Item
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="place-order">
                    <button onClick={handlePlaceOrder}>PLACE ORDER</button>
                  </div>
                </div>

                <div className="cart-right">
                  <h3>PRICE DETAILS</h3>
                  <hr />
                  <div className="price-row">
                    <span>Price ({productDetails.length} items)</span>
                    <span>
                      ₹
                      {productDetails.reduce(
                        (t, i) => t + i.quantity * i.price,
                        0
                      )}
                    </span>
                  </div>
                  <div className="price-row">
                    <span>Discount</span>
                    <span className="discount-text">
                      - ₹
                      {productDetails.reduce(
                        (t, i) => t + i.quantity * (i.discount || 0),
                        0
                      )}
                    </span>
                  </div>
                  <div className="price-row">
                    <span>Delivery Charges</span>
                    <span>
                      ₹
                      {productDetails.reduce(
                        (t, i) => t + (i.deliveryCharge || 0),
                        0
                      )}
                    </span>
                  </div>
                  <hr />
                  <div className="price-row total">
                    <span>Total Amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddToCart;
