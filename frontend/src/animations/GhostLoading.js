// GhostLoading.js
import React from "react";
import PropTypes from "prop-types";
import styles from "./GhostLoading.module.css"; // Import the CSS module

const GhostLoading = ({ count }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={styles["ghost-loading-item"]}></div>
  ));

  return <div className={styles["ghost-loading-container"]}>{skeletons}</div>;
};

GhostLoading.propTypes = {
  count: PropTypes.number.isRequired, // Number of ghost items to display
};

export default GhostLoading;
