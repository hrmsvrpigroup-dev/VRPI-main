import React, { useEffect, useRef, useState } from "react";
import CustomInput from "./Input";
import style from "./CustomInput.module.css";

const InputWithInvalidText = ({
  ErrorMessage,
  inputFields,
  className,
  mandatory,
}) => {
  const inputRef = useRef(null);

  const [checkPassword, setCheckPassword] = useState(false);

  const handleLabelClick = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    if (inputFields.value) {
      inputFields.onFocusHandler();
    }
  });

  return (
    <div className={`${style.InputContainer}  ${className}`}>
      <CustomInput
        ref={inputRef}
        className={`${style.checkoutFormControl} ${
          inputFields.isInvalid && style.invalid
        }`}
        placeholder={inputFields.placeholder}
        value={inputFields.value}
        onFocus={inputFields.onFocusHandler}
        onBlur={inputFields.onBlurHandler}
        onChange={inputFields.onChange}
        type={`${
          inputFields.type === "password" && checkPassword
            ? "text"
            : inputFields.type
        }`}
        autoComplete={inputFields.autoComplete}
      />
      {inputFields.type === "password" && (
        <img
          src={require(`../../assets/login-signup/${
            checkPassword ? "showPassword.png" : "hidePassword.png"
          }`)}
          alt=""
          className={style.checkPassword}
          onClick={() => setCheckPassword(!checkPassword)}
        />
      )}
      <label
        className={` ${
          inputFields.isTouched || inputFields.value !== ""
            ? style.transition
            : style.placeholder
        }`}
        onClick={handleLabelClick}
      >
        {inputFields.placeholder}{" "}
        {mandatory && <span style={{ color: "red" }}>&nbsp;*</span>}
      </label>
      {
        <p
          className={style.invalidText}
          style={{
            opacity: inputFields.isInvalid ? "1" : "0",
          }}
        >
          {ErrorMessage}
        </p>
      }
    </div>
  );
};

export default InputWithInvalidText;
