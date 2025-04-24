import React, { useEffect, useState, useRef } from "react";
import "./Carousel.css";
import { images } from "../../constants";

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
