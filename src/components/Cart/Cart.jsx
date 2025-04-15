import React from "react";
import AddToCart from "../AddToCart/AddToCart";

function Cart({ isLogged }) {
  return (
    <div>
      {!isLogged ? (
        <a href="/login"> You are not logged in : Log In first</a>
      ) : (
        <AddToCart />
      )}
    </div>
  );
}

export default Cart;
