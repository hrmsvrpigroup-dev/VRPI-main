import { useEffect, useState } from "react";
import CustomInput from "../../UI/Input/Input";
import style from "./InputActions.module.css";
import useInput from "../../hooks/use-Input";
import { NavLink } from "react-router-dom";
import CustomCheckbox from "../../UI/Checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import Message from "../../UI/Popup/Message";

const emailValidation = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  return value.trim().length >= 3 && value.includes("@");
};

const passwordValidation = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  return value.trim().length >= 8;
};

export default function SignIn() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorClose = () => {
    setErrorMessage("");
  };

  const navigate = useNavigate();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
    validateValueHandler: validateEmailHandler,
    focusHandler: emailFocusHandler,
    // isFocused: emailIsFocused,
    reset: emailReset,
  } = useInput({ validateValue: emailValidation });

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordIsInvalid,
    valueChangeHandler: passwordChangeHandler,
    validateValueHandler: validatePasswordHandler,
    focusHandler: passwordFocusHandler,
    // isFocused: passwordIsFocused,
    reset: passwordReset,
  } = useInput({ validateValue: passwordValidation });

  useEffect(() => {
    setFormIsValid(
      emailIsValid && passwordIsValid && termsAccepted && rememberMe
    );
  }, [emailIsValid, passwordIsValid, termsAccepted, rememberMe]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      emailReset();
      passwordReset();
      navigate("/");
      // You can proceed with form submission or any further action here
    } else {
      // alert("Please complete all fields and accept the terms and conditions.");
      setErrorMessage(
        "Please complete all fields and accept the terms and conditions."
      );
      // console.log("Form has validation errors. Please fix them.");
    }
  };

  return (
    <div className={`${style.card} ${style.signIn}`}>
      {errorMessage && (
        <Message
          message={errorMessage}
          type="error"
          onClose={handleErrorClose}
        />
      )}
      <div className={style.Club}>
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className={style.checkboxContainer}>
          <CustomCheckbox
            id="rememberMe"
            onChange={() => setRememberMe((prevState) => !prevState)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <div className={style.forgotPasswordLink}>
          <NavLink to="">Forgot password?</NavLink>
        </div>
      </div>

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
        Sign In
      </button>
      <div className={style.socialLoginButtons}>
        <button className={style.socialIconBtn}>
          <img
            src={require("../../assets/googleIcon.png")}
            alt="google icon"
            style={{ width: "20px" }}
          />{" "}
          Login via Google
        </button>
        <button className={style.socialIconBtn}>
          <img
            src={require("../../assets/linkedinIcon.png")}
            alt="google icon"
            style={{ width: "20px" }}
          />
          Login via LinkedIn
        </button>
      </div>
    </div>
  );
}
