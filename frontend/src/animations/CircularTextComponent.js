import React from "react";
import styles from "./CircularTextComponent.module.css";

const CircularTextComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.circularImage}>
        <img src={require("../assets/vrpiLogo.png")} alt="Circular" />
        <div className={styles.textWrapper}>
          <div className={styles.text}>Rotating Text</div>
        </div>
      </div>
    </div>
  );
};

export default CircularTextComponent;
