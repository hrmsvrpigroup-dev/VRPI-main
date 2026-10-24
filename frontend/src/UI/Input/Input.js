import React from "react";
import styles from "./CustomInput.module.css"; // Import the CSS Module

const CustomInput = React.forwardRef(
  (
    {
      placeholder,
      value,
      onChange,
      type = "text",
      className,
      style,
      onBlur,
      onFocus,
      mandatory, // Add a prop to indicate if the input is mandatory
      autoComplete,
    },
    ref
  ) => {
    // Combine the provided className with the CSS module className
    const combinedClassName = `${styles.input} ${className}`;

    // Add the mandatorySign class conditionally
    const inputClasses = mandatory
      ? `${combinedClassName} ${styles.mandatorySign}`
      : combinedClassName;

    return (
      <>
        <input
          ref={ref}
          className={inputClasses}
          type={type}
          // placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={style} // Don't wrap style in another object
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
        />
      </>
    );
  }
);

export default CustomInput;
