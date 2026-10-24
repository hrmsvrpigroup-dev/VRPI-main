import React, { useState, useEffect } from "react";
import style from "./ImageSlider.module.css"; // Import modular CSS

const images = ["Background1.png", "background2.png", "Background3.png"];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1); // Index of the next image
  const [transitionClass, setTransitionClass] = useState(style["initial"]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment currentIndex and nextIndex
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setNextIndex((prevIndex) => (prevIndex + 1) % images.length);
      // Apply transition class
      setTransitionClass(style["transition"]);
      // Remove transition class after animation ends
      setTimeout(() => setTransitionClass(style["initial"]), 500);
    }, 4000); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={style.imageSlider}>
      <div className={style.imageContainer}>
        <img
          src={require(`../../assets/${images[currentIndex]}`)}
          alt={`Images ${currentIndex + 1}`}
          className={`${style.currentImage} ${transitionClass}`}
        />
        <img
          src={require(`../../assets/${images[nextIndex]}`)}
          alt={`Images ${nextIndex + 1}`}
          className={`${style.nextImage} ${transitionClass}`}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
