import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Image.module.css";
import GhostLoading from "../../animations/GhostLoading";
import { CircularProgress } from "@material-ui/core";

const CustomImage = ({
  src,
  alt,
  className,
  title,
  style,
  onClick,
  classForDiv,
  onMouseLeave,
  onMouseEnter,
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`${styles.customImageWrapper} ${classForDiv}`}>
      {loading && (
        // <GhostLoading count={1} />
        <div className={styles.loadingState}>
          <CircularProgress />
        </div>
      )}
      {/* {!loading && ( */}
      <img
        src={src}
        alt={alt}
        className={`custom-image  ${className} ${loading ? "loading" : ""}`}
        onLoad={handleImageLoad}
        style={style}
        onClick={onClick}
        title={title}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {/* )} */}
    </div>
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loadingComponent: PropTypes.element,
};

CustomImage.defaultProps = {
  className: "",
  loadingComponent: <div>Loading...</div>,
};

export default CustomImage;
