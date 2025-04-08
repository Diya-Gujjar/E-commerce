import React, { useState, useEffect } from "react";
import "./ProductDescription.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// const Product = {
//   id: "Phone1",
//   title: "Motorola G85",
//   image:
//     "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/i/p/l/-original-imah2fjcxjdjykpc.jpeg?q=60",
//   category: "Smart Phone",
//   price: "15,999",
//   availableOffers: [
//     "Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card",
//     "Special PriceGet extra ₹3,000 off",
//     "No cost EMI starting at ₹3,834/month",
//     "Standard EMI also available",
//   ],
//   highlights: [
//     "8 GB RAM | 256 GB ROM | Expandable Upto 1 TB",
//     "16.94 cm (6.67 inch) Display",
//     "50MP + 13MP | 32MP Front Camera",
//     "5500 mAh Battery",
//     "Dimensity 7400 Processor",
//     "68W Charger",
//   ],
//   description:
//     "Discover the Moto G85 5G, which has a revolutionary 3D Curved pOLED 120 Hz Display protected by Gorilla Glass 5 for remarkable longevity. With the 50 MP OIS Sony LYTIA 600 Camera system, you can take beautiful pictures in any kind of illumination. Utilise Smart Connect to share content with ease and make use of the built-in 12 GB RAM and 256 GB storage. Immersive sound is produced by its Dolby Atmos Dual Stereo Speakers, and its Snapdragon 6s Gen 3 engine guarantees lightning-fast 5G speeds over 13 bands. Android 14 delivers the newest advancements in mobile technology and security, with a 5000 mAh battery and 33 W TurboPower charging.",
// };

function ProductDescription() {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const [product, setProduct] = useState([]);
  const cartHandle = () => {
    navigate(`/addToCart/${product.category}/${product.id}`);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/${category}/${id}`)
      .then((response) => {
        if (response && response.data) {
          setProduct(response.data);
          // setProduct(response.data.phone);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Product Details:", error);
      });
  }, [id]);
  const Product = product;

  if (product.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="desc-container">
        <div className="left-desc">
          <img src={Product.image} alt={Product.title} />
        </div>
        <div className="right-desc">
          <div style={{ textAlign: "center", fontSize: "25px" }}>
            <i>{Product.title}</i>
          </div>
          <div>
            <h1>Rs. {Product.price}</h1>
          </div>
          <div>
            <ul className="hdng-highlights">
              <div className="desc-hdng"> Available Offers:</div>
              {Product.availableOffers.map((availableOffer, index) => (
                <li key={index}>{availableOffer}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="hdng-highlights">
              <div className="desc-hdng"> Highlights:</div>
              {Product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="desc-hdng"> Description: </div>
            {Product.description}
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
