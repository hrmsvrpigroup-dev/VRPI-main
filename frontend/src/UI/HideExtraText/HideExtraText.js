import React, { useState } from "react";
import styles from "./HideExtraText.module.css";

const HideExtraText = ({ children, className, style, lines }) => {
  const [showExtraText, setShowExtraText] = useState(false); // Initially hide extra text

  const handleToFullText = () => {
    setShowExtraText(!showExtraText);
  };

  return (
    <div className={styles.container}>
      <p
        className={`${styles.text} ${showExtraText} ${className}`}
        style={{
          ...style,
          WebkitLineClamp: showExtraText ? "unset" : lines, // Show all lines when clicked
        }}
        onClick={handleToFullText}
      >
        {children}
      </p>
    </div>
  );
};

export default HideExtraText;
