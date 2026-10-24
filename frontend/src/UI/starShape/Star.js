import React from "react";
import styles from "./Star.module.css";

const Star = ({ fill }) => {
  return (
    <div className={styles.star}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={styles.svg}
      >
        <path d="M0 0h24v24H0z" fill="none" />

        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="#FF9900"
          clipPath={`inset(0 ${fill * 100}% 0 0)`}
          filter="url(#borderFilter)"
        />
      </svg>
    </div>
  );
};

export default Star;
