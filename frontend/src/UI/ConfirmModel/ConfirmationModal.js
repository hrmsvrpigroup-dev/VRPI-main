import React from "react";
import style from "./ConfirmationModal.module.css";

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      {isOpen && (
        <div className={style.modalOverlay} onClick={onRequestClose}>
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <h2>{title}</h2>
              <button onClick={onRequestClose} className={style.closeBtn}>
                &times;
              </button>
            </div>
            <div className={style.modalBody}>
              <p>{message}</p>
            </div>
            <div className={style.modalFooter}>
              <button onClick={onConfirm}>Confirm</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
