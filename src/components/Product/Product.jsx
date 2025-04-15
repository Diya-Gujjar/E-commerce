import React, { useRef, useState, useEffect } from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/productDescription/${product.category}/${product.id}`);
  };

  return (
    <div className="product-card">
      <button onClick={handleNavigate} className="no-design">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <div className="product-title">{product.title}</div>
          <div className="product-category">{product.category}</div>
          <div className="product-price">{`Rs. ${product.price}`}</div>
        </div>
      </button>
    </div>
  );
};

const ProductCardContainer = ({ products, cardTitle }) => {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    checkScrollPosition();
  }, []);

  const checkScrollPosition = () => {
    const container = containerRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setShowLeft(container.scrollLeft > 0);
    setShowRight(container.scrollLeft < maxScrollLeft);
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 500;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    checkScrollPosition();
  };

  return (
    <div className="contt">
      <div className="card-title">{cardTitle}</div>
      {showLeft && (
        <button className="arrow arrow-left" onClick={() => scroll("left")}>
          &#8592;
        </button>
      )}
      <div className="product-card-container" ref={containerRef}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {showRight && (
        <button className="arrow arrow-right" onClick={() => scroll("right")}>
          &#8594;
        </button>
      )}
    </div>
  );
};

export default ProductCardContainer;
