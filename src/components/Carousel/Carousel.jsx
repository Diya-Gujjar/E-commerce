import React, { useEffect, useState, useRef } from "react";
import "./Carousel.css";

const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/1580/260/image/a354077c3747d8f6.png?q=80",
  "https://rukminim2.flixcart.com/fk-p-flap/1580/260/image/57d9b129e302642e.jpg?q=80",
  "https://rukminim2.flixcart.com/fk-p-flap/1580/260/image/4ce5d0cc92f60479.jpg?q=80",
  "https://rukminim2.flixcart.com/fk-p-flap/1580/260/image/9fcd6e6f5d649d8d.jpg?q=80",
  "https://rukminim2.flixcart.com/fk-p-flap/1580/260/image/117f7d48b6a6b96f.jpeg?q=80",
  "https://rukminim2.flixcart.com/fk-p-flap/1580/260/image/72067a600933951a.jpg?q=80",
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="carousel-cntnr">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <button
        aria-label="Previous Slide"
        className="prev-btn"
        onClick={handlePrev}
      >
        ◄
      </button>
      <button aria-label="Next Slide" className="next-btn" onClick={handleNext}>
        ►
      </button>
    </div>
  );
}

export default Carousel;
