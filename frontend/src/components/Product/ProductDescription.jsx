import { useEffect, useState } from "react";
import "./ProductDescription.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useStore from "../ZustandStore/Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDescription() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useStore((state) => state.addToCart);
  const navigate = useNavigate();

  const storedData = sessionStorage.getItem("userId");

  const userID = storedData;

  const cartHandle = () => {
    if (!storedData) {
      console.error("Log In first to add Item in cart");
      window.location.href = "/login";
    }
    if (product) {
      addToCart(product, userID);
      toast.success("Item added to cart");
      setTimeout(() => navigate("/addToCart"), 1000);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${_id}`)
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
  }, [_id]);

  console.log(product);
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="desc-container">
        <div className="left-desc">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="right-desc">
          <div style={{ textAlign: "center", fontSize: "25px" }}>
            <i>{product.name}</i>
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
          <div className="hdng-highlights">
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
      <ToastContainer />
    </div>
  );
}
export default ProductDescription;
