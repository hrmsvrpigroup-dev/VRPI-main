import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Backlay.module.css"; // Import CSS module

const BackgroundOverlay = ({ children, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current === event.target) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div ref={overlayRef} className={styles.overlay}></div>{" "}
      <div className={styles.content}>{children}</div>{" "}
    </>
  );
};

BackgroundOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BackgroundOverlay;
