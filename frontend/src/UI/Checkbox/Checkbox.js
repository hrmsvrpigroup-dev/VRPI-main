import React, { useState } from "react";
import styles from "./Checkbox.module.css"; // Import CSS for styling
const CustomCheckbox = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className={styles["custom-checkbox-container"]} onClick={handleChange}>
      <input
        type="checkbox"
        className={styles["hidden-checkbox"]}
        checked={checked}
        readOnly
      />
      <div
        className={
          checked ? `${styles.checkmark} ${styles.checked}` : styles.checkmark
        }
      />
      <label className={styles["checkbox-label"]}>{label}</label>
    </div>
  );
};

export default CustomCheckbox;
