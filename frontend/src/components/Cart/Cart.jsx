import { useEffect, useState } from "react";
import AddToCart from "../AddToCart/AddToCart";
import axios from "axios";

function Cart() {
  const [cartData, setCartData] = useState();
  const storedData = sessionStorage.getItem("userId");
  if (!storedData) {
    console.error("Log In first to view Item in cart");
    window.location.href = "/login";
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/cart/${storedData}`)
      .then((response) => {
        if (response && response.data) {
          setCartData(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Product Details:", error);
      });
  }, []);
  return (
    <div>
      {!storedData ? (
        <a href="/login"> You are not logged in : Log In first</a>
      ) : (
        <div>
          <AddToCart />
        </div>
      )}
    </div>
  );
}

export default Cart;
