import React from "react";

function Cart({ isLogged }) {
  return (
    <div>
      {!isLogged ? (
        <a href="/login"> You are not logged in : Log In first</a>
      ) : (
        <p>Cart Empty</p>
      )}
    </div>
  );
}

export default Cart;
