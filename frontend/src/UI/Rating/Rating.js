import React from "react";
import styles from "./Rating.module.css";
import Star from "../starShape/Star";

const Rating = ({ value }) => {
  // Round the value to the nearest integer
  const intValue = Math.floor(value);

  // Calculate the decimal part
  const decimalValue = value - intValue;

  // Function to generate stars
  const renderStars = () => {
    const stars = [];
    // Fill full stars
    for (let i = 0; i < intValue; i++) {
      stars.push(<Star key={i} fill="0" />);
    }
    // Fill the last star with background color proportional to the decimal part
    if (decimalValue > 0) {
      stars.push(<Star key={intValue} fill={decimalValue} />);
    }
    // Fill remaining empty stars
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={intValue + 1 + i} fill="1" />);
    }
    return stars;
  };

  return <div className={styles.starRating}>{renderStars()}</div>;
};

export default Rating;
