import React, { useEffect, useState } from "react";
import "./AddToCart.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import RegisterLoginHeader from "../Register-login-header/Register-login-header";

function AddToCart() {
  const { category, id } = useParams();
  const [product, setProduct] = useState([]);
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

  const productPrice =
    product.price - product.discount + product.deliveryCharge;
  //   const productPrice = {`${product.price} - ${product.discount} + ${product.deliveryCharge}`};
  return (
    <div className="bg-color">
      <RegisterLoginHeader />
      <div className="cart-items">
        <div className="item-detail">
          <div className="item-left">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="item-right">{product.title}</div>
        </div>
        <div className="price-detail">
          <div className="prc-hdng">PRICE DETAILS</div>
          <div>
            <div className="prc-dtls">
              <div className="prc-dtl-l">Price: </div>{" "}
              <div className="prc-dtl-r"> {product.price}</div>
            </div>
            <div className="prc-dtls">
              <div className="prc-dtl-l">Discount: </div>{" "}
              <div className="prc-dtl-r"> - {product.discount}</div>
            </div>
            <div className="prc-dtls">
              <div className="prc-dtl-l">Delivery Charge: </div>{" "}
              <div className="prc-dtl-r"> {product.deliveryCharge}</div>
            </div>
            <div className="prc-dtls">
              <div className="prc-dtl-l">Total: </div>{" "}
              <div className="prc-dtl-r"> {productPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
