import React, { useEffect, useState } from "react";
import "./ProductDescription.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useStore from "../ZustandStore/Store";

function ProductDescription() {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);

  const addToCart = useStore((state) => state.addToCart);

  const cartHandle = () => {
    if (product) {
      addToCart(product);
      navigate(`/addToCart/${product.category}/${product.id}`);
    }
  };

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="desc-container">
        <div className="left-desc">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="right-desc">
          <div style={{ textAlign: "center", fontSize: "25px" }}>
            <i>{product.title}</i>
          </div>
          <div>
            <h1>Rs. {product.price}</h1>
          </div>
          <div>
            <ul className="hdng-highlights">
              <div className="desc-hdng"> Available Offers:</div>
              {product.availableOffers.map((availableOffer, index) => (
                <li key={index}>{availableOffer}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="hdng-highlights">
              <div className="desc-hdng"> Highlights:</div>
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="desc-hdng"> Description: </div>
            {product.description}
          </div>
        </div>
      </div>
      <div className="cart-add">
        <button onClick={cartHandle}>
          <FaShoppingCart /> ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductDescription;
