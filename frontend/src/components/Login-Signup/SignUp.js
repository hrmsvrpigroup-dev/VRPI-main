import { useEffect, useState } from "react";
import CustomInput from "../../UI/Input/Input";
import style from "./InputActions.module.css";
import useInput from "../../hooks/use-Input";
import { NavLink } from "react-router-dom";
import CustomCheckbox from "../../UI/Checkbox/Checkbox";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    validateValueHandler: validateNameHandler,
    focusHandler: nameFocusHandler,
    // isFocused: nameIsFocused,
    reset: nameReset,
  } = useInput({ validateValue: (value) => value.trim().length >= 3 });

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
    validateValueHandler: validateEmailHandler,
    focusHandler: emailFocusHandler,
    // isFocused: emailIsFocused,
    reset: emailReset,
  } = useInput({
    validateValue: (value) => value.trim().length >= 3 && value.includes("@"),
  });

  const {
    value: mobileNumber,
    isValid: mobileNumberIsValid,
    hasError: mobileNumberIsInvalid,
    valueChangeHandler: mobileNumberChangeHandler,
    validateValueHandler: validateMobileNumberHandler,
    focusHandler: mobileNumberFocusHandler,
    // isFocused: mobileNumberIsFocused,
    reset: mobileNumberReset,
  } = useInput({
    validateValue: (value) => /^\+\d{2}\d{10}$/.test(value.trim()),
  });

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordIsInvalid,
    valueChangeHandler: passwordChangeHandler,
    validateValueHandler: validatePasswordHandler,
    focusHandler: passwordFocusHandler,
    // isFocused: passwordIsFocused,
    reset: passwordReset,
  } = useInput({ validateValue: (value) => value.trim().length >= 8 });

  useEffect(() => {
    setFormIsValid(
      nameIsValid &&
        emailIsValid &&
        mobileNumberIsValid &&
        passwordIsValid &&
        termsAccepted
    );
  }, [
    nameIsValid,
    emailIsValid,
    mobileNumberIsValid,
    passwordIsValid,
    termsAccepted,
  ]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      // console.log(
      //   "User Details",
      //   enteredName,
      //   email,
      //   enteredPassword,
      //   mobileNumber
      // );
      emailReset();
      nameReset();
      passwordReset();
      mobileNumberReset();

      navigate("/");
    } else {
      alert("Please complete all fields and accept the terms and conditions.");
      // console.log("Form has validation errors. Please fix them.");
    }
  };

  return (
    <div className={`${style.card} ${style.signUp}`}>
      {/* <h2>Sign Up</h2> */}
      <div className={style.Club}>
        <CustomInput
          className={
            nameIsInvalid
              ? `${style.checkoutFormControl} ${style.invalid}`
              : style.checkoutFormControl
          }
          type="text"
          placeholder="Enter your Name"
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={validateNameHandler}
          onFocus={nameFocusHandler}
        />
        {/* {nameIsInvalid && (
          <p className={style.invalidMsg}>
            Please enter a valid Name (minimum 3 characters).
          </p>
        )} */}

        <CustomInput
          className={
            emailIsInvalid
              ? `${style.checkoutFormControl} ${style.invalid}`
              : style.checkoutFormControl
          }
          type="email"
          placeholder="Enter your Email"
          value={email}
          onBlur={validateEmailHandler}
          onFocus={emailFocusHandler}
          onChange={emailChangeHandler}
        />
        {/* {emailIsInvalid && (
          <p className={style.invalidMsg}>
            Please enter a valid email address.
          </p>
        )} */}
      </div>
      <div className={style.Club}>
        <CustomInput
          className={
            mobileNumberIsInvalid
              ? `${style.checkoutFormControl} ${style.invalid}`
              : style.checkoutFormControl
          }
          type="text"
          placeholder="Enter your Mobile Number"
          value={mobileNumber}
          onBlur={validateMobileNumberHandler}
          onFocus={mobileNumberFocusHandler}
          onChange={mobileNumberChangeHandler}
        />
        {/* {mobileNumberIsInvalid && (
        <p className={style.invalidMsg}>
          Please enter a valid mobile number (minimum 10 characters).
        </p>
      )} */}
      </div>
      <div className={style.Club}>
        <CustomInput
          className={
            passwordIsInvalid
              ? `${style.checkoutFormControl} ${style.invalid}`
              : style.checkoutFormControl
          }
          type="password"
          placeholder="Enter your Password"
          value={enteredPassword}
          onBlur={validatePasswordHandler}
          onFocus={passwordFocusHandler}
          onChange={passwordChangeHandler}
        />
      </div>
      {/* {passwordIsInvalid && (
        <p className={style.invalidMsg}>
          Password must be at least 8 characters long.
        </p>
      )} */}
      <div className={style.checkboxContainer} style={{ width: "100%" }}>
        <CustomCheckbox
          id="termsAccepted"
          onChange={() => setTermsAccepted((prevState) => !prevState)}
        />
        <label htmlFor="termsAccepted">
          I, agree to all the{" "}
          <NavLink
            to="#"
            style={{
              fontSize: "0.7rem",
              textDecoration: "none",
              color: "white",
            }}
          >
            Terms and Conditions
          </NavLink>{" "}
          according to the company norms
        </label>
      </div>

      <button
        className={
          formIsValid ? style.submitBtn : `${style.submitBtn} ${style.disabled}`
        }
        onClick={submitHandler}
        // disabled={!formIsValid}
      >
        Sign Up
      </button>
      <div className={style.socialLoginButtons}>
        <button className={style.socialIconBtn}>
          <img
            src={require("../../assets/googleIcon.png")}
            alt="google icon"
            style={{ width: "20px" }}
          />{" "}
          Sign In via Google
        </button>
        <button className={style.socialIconBtn}>
          <img
            src={require("../../assets/linkedinIcon.png")}
            alt="google icon"
            style={{ width: "20px" }}
          />
          Sign In Via LinkedIn
        </button>
      </div>
      {/* <NavLink to="/signin"> Sign In</NavLink> */}
    </div>
  );
}
