import React, { useState } from "react";
import styles from "./HeaderDropDown.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../../UI/Button/Button";
import { useDispatch } from "react-redux";
import { setComingSoon } from "../../../../store/ComingSoonSlice";

const HeaderDropdown = ({ data, onMouseEnter, onMouseLeave, onClose, style }) => {
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemHover = (item) => {
    setSelectedItem(item);
  };

  const handleLinks = () => {
    // Close dropdown immediately before navigating
    if (onClose) onClose();
    if (selectedItem.description.active) {
      navigate(selectedItem.description.link);
    } else {
      dispatch(setComingSoon(true));
    }
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <div className={styles.dropdownContent}>
        {data.map((item) => (
          <div
            key={Math.random()}
            className={
              selectedItem.label === item.label
                ? `${styles.dropdownItem} ${styles.selectedItem}`
                : `${styles.dropdownItem}`
            }
            onMouseEnter={() => handleItemHover(item)}
          >
            <div style={{ transform: "skew(20deg)" }} onClick={handleLinks}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.line}></div>
      <div className={styles.description}>
        <div>
          <h2>{selectedItem.description.descriptionHead}</h2>
          <div className={styles.descriptionContent}>
            {selectedItem.description.descriptionContent}
          </div>
        </div>
        {/* <div className={styles.link}>
          <Link to={selectedItem.description.link}>Explore More</Link>
        </div> */}
        <Button onClick={handleLinks} className={styles.link}>
          Explore Us
        </Button>
      </div>
    </div>
  );
};

export default HeaderDropdown;
