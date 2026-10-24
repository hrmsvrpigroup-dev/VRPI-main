import React, { useState, useEffect } from "react";
import styles from "./Message.module.css"; // Import modular CSS
import { MdClose } from "react-icons/md"; // Import close icon from react-icons

const Message = ({ message, type, onClose, dontClose, time }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!dontClose) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, time * 1000 || 4000);
      return () => clearTimeout(timer);
    }
  }, [onClose, dontClose, time]);

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.message} ${styles[type]} ${
          show ? styles.show : ""
        }`}
      >
        <span onClick={onClose} className={styles.popupClose}>
          <MdClose />
        </span>
        <div className={styles.messageContainer}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
