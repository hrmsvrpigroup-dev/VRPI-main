import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/use-Input";
import CustomCheckbox from "../../../UI/Checkbox/Checkbox";
import Button from "../../../UI/Button/Button";
import style from "./LoginForm.module.css";
import InputWithInvalidText from "../../../UI/Input/InputWithInvalidText";
import {
  emailValidation,
  passwordValidation,
} from "../../InputValidations/InputValidations";
import PasswordValidationBox from "../PasswordValidationBox/PasswordValidationBox";

import { url } from "../../../constants";
import useHttpsAxios from "../../../hooks/use-httpsAxios";
import { useDispatch } from "react-redux";
import { loginWithUserId } from "../../../store/LoginStateActions";
import { setMessage } from "../../../store/MessageDisplay/MessageActions";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";

const LoginForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // const handleErrorClose = () => setErrorMessage("");

  const navigate = useNavigate();

  const emailInput = useInput({ validateValue: emailValidation });
  const passwordInput = useInput({ validateValue: passwordValidation });

  useEffect(() => {
    setFormIsValid(
      emailInput.isValid && passwordInput.isValid && termsAccepted && rememberMe
    );
  }, [emailInput.isValid, passwordInput.isValid, termsAccepted, rememberMe]);

  const { sendRequest, isLoading, error, statusCode, responseData } =
    useHttpsAxios();

  const dispatch = useDispatch();

  useEffect(() => {
    if (responseData && statusCode) {
      if (statusCode === 200 || statusCode === 201) {
        if (responseData.user) {
          dispatch(loginWithUserId(responseData.user.id));
          emailInput.reset();
          passwordInput.reset();
          navigate("/dashboard");
        }
      } else {
        const message = responseData.response?.data?.message 
          || responseData.response?.data?.errorMessage 
          || "Something went wrong";
        dispatch(setMessage(message, "error", false, 4));
      }
    } else if (error) {
      const message = error.response?.data?.message 
        || error.response?.data?.errorMessage 
        || "Network error or server down";
      dispatch(setMessage(message, "error", false, 4));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, responseData, statusCode, dispatch, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    // setErrorMessage("");
    if (formIsValid) {
      // setErrorMessage("");
      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: emailInput.value.toLowerCase(),
          password: passwordInput.value,
        },
      });
    } else {
      dispatch(
        setMessage(
          "Please complete all fields and accept the terms and conditions.",
          "error"
        )
      );
      // console.log("Form has validation errors. Please fix them.");
    }
  };

  const PasswordComponent = (
    <div className={style.Club} style={{ position: "relative" }}>
      <InputWithInvalidText
        ErrorMessage={"Invalid Password"}
        className={`${style.Input} `}
        inputFields={{
          placeholder: "Enter your Password",
          value: passwordInput.value,
          isInvalid: passwordInput.hasError,
          onBlurHandler: passwordInput.validateValueHandler,
          onFocusHandler: passwordInput.focusHandler,
          onChange: passwordInput.valueChangeHandler,
          type: "password",
          isTouched: passwordInput.isFocused,
          autoComplete: "new-password",
        }}
        // mandatory="true"
      />
      {passwordInput.isFocused && passwordInput.hasError && (
        <PasswordValidationBox enteredPassword={passwordInput.value} />
      )}
    </div>
  );

  const EmailComponent = (
    <InputWithInvalidText
      ErrorMessage={"Invalid Email"}
      className={`${style.Input} `}
      inputFields={{
        placeholder: "Enter your Email",
        value: emailInput.value,
        isInvalid: emailInput.hasError,
        onBlurHandler: emailInput.validateValueHandler,
        onFocusHandler: emailInput.focusHandler,
        onChange: emailInput.valueChangeHandler,
        type: "email",
        isTouched: emailInput.isFocused,
        autoComplete: "off",
      }}
      // mandatory="true"
    />
  );

  return (
    <div className={`${style.card} ${style.signIn}`}>
      {/* {errorMessage && (
        <Message
          message={errorMessage}
          type="error"
          onClose={handleErrorClose}
        />
      )} */}
      <h1 className={style.title}>Login</h1>
      <div style={{ width: "100%" }}>
        {EmailComponent}
        {PasswordComponent}
      </div>

      <CheckboxSection
        setRememberMe={setRememberMe}
        setTermsAccepted={setTermsAccepted}
      />

      <LoadingButton
        className={formIsValid ? style.submitBtn : `${style.disabled}`}
        disabled={!formIsValid}
        style={{ backgroundColor: !formIsValid && "#ccc" }}
        text={"Login"}
        loaderColor="white"
        isLoading={isLoading}
        onClick={submitHandler}
      />
      <div className={style.line}>
        <div className={style.lineOn}></div>
        <span className={style.or}>Don’t have an Account?</span>
      </div>
      <Button
        onClick={() => {
          navigate("/signup");
        }}
        className={style.signUpBtn}
      >
        Sign-up
      </Button>
    </div>
  );
};

const CheckboxSection = ({ setRememberMe, setTermsAccepted }) => (
  <div className={style.checkBoxes}>
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
        <NavLink to="/forgetPassword" style={{color: "#ff6501", textDecoration: "none", fontSize: "0.9rem"}}>Forgot password?</NavLink>
      </div>
    </div>
    <div className={style.checkboxContainer} style={{ width: "100%" }}>
      <CustomCheckbox
        id="termsAccepted"
        onChange={() => setTermsAccepted((prevState) => !prevState)}
      />
      <label htmlFor="termsAccepted">
        I, agree to all the{" "}
        <a
          href={url.termsAndConditions}
          className={style.policyLinks}
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>
        ,{" "}
        <NavLink
          to={url.privacyPolicyLink}
          className={style.policyLinks}
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </NavLink>{" "}
        ,{" "}
        <a
          href={url.refundPolicyLink}
          className={style.policyLinks}
          target="_blank"
          rel="noopener noreferrer"
        >
          Refund Policy
        </a>{" "}
        and{" "}
        <a
          href={url.shippingLink}
          className={style.policyLinks}
          target="_blank"
          rel="noopener noreferrer"
        >
          Shipping Policy
        </a>
      </label>
    </div>
  </div>
);

export default LoginForm;
