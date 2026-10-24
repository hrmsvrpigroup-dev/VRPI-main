import React, { useState } from "react";
import styles from "./CustomDropDown.module.css";

const CustomDropDown = ({ options, onSelect, placeholder }) => {
  const [selectedValue, setSelectedValue] = useState(""); // Initialize selectedValue with an empty string
  //   const [hidePlaceHolder, setHidePlaceHolder] = useState(false);

  const handleDropDownChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onSelect(newValue);
  };

  //   const disablePlaceHolder = () => {
  //     setHidePlaceHolder(true);
  //   };

  return (
    <div className={styles.customDropdown}>
      <select
        className={styles.genderDropDown}
        value={selectedValue}
        onChange={handleDropDownChange}
        // onFocus={disablePlaceHolder}
      >
        {/* {!hidePlaceHolder && (
          <option value="" disabled style={{ color: "grey" }}>
            {placeholder}
          </option>
        )} */}
        {options.map((gender, index) => (
          <option key={index} value={gender.value}>
            {gender.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropDown;
// import React, { useEffect, useState } from "react";
// import styles from "./CustomDropDown.module.css";

// const CustomDropDown = ({ options, onSelect, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(placeholder);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//     onSelect(option);
//   };

//   useEffect(() => {
//     if (selectedOption) {
//       onSelect(selectedOption);
//     }
//   }, [selectedOption, onSelect]);

//   return (
//     <div className={style.customDropdown}>
//       <div className={style.selectedOption} onClick={toggleDropdown}>
//         {selectedOption && selectedOption.label}
//         <span className={`${style.arrow} ${isOpen ? style.open : ""}`}></span>
//       </div>
//       {isOpen && (
//         <ul className={style.options}>
//           {options.map((option) => (
//             <li key={option.value} onClick={() => handleOptionClick(option)}>
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CustomDropDown;
