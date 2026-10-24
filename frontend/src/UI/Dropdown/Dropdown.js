import React, { useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({
  options,
  onSelect,
  placeholder,
  className,
  style,
  mandatory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.customDropdown} ${className}`} style={style}>
      <div className={styles.selectedOption} onClick={toggleDropdown}>
        <span
          className={`${
            selectedOption ? styles.transition : styles.placeholder
          }`}
        >
          {placeholder}
          <span style={{ color: "red" }}>&nbsp;{mandatory && "*"}</span>
        </span>
        {selectedOption && selectedOption.label}

        <img
          src={require(`../../assets/${
            isOpen ? "arrowUpPrimary.png" : "arrowDownPrimary.png"
          }`)}
          // style={{ width: "2rem" }}
          className={`${styles.arrow} `}
          alt=""
        />
      </div>

      {options && options.length > 0 && (
        <ul className={`${styles.options} ${isOpen && styles.optionsActive}`}>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
