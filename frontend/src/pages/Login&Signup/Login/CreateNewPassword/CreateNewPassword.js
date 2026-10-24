import { useEffect, useState } from "react";
import InputWithInvalidText from "../../../../UI/Input/InputWithInvalidText";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "../../../../components/InputValidations/InputValidations";
import SignUpOrLoginContainer from "../../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import useInput from "../../../../hooks/use-Input";
import style from "./CreateNewPassword.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useHttpsAxios from "../../../../hooks/use-httpsAxios";
import { url } from "../../../../constants";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../../store/MessageDisplay/MessageActions";
import LoadingButton from "../../../../UI/LoadingButton/LoadingButton";

const CreateNewPassword = () => {
  const loginScreenData = {
    title: "Welcome Back!",
    description:
      "At moment we don’t have your Data to create your account. So lets just start to create your Account",
    image: "loginPageImage.svg",
  };

  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, otp } = useParams();
  const { sendRequest, isLoading, statusCode, error, responseData } = useHttpsAxios();

  const passwordInput = useInput({ validateValue: passwordValidation });
  const confirmPasswordInput = useInput({
    validateValue: (value) =>
      confirmPasswordValidation(value, passwordInput.value),
  });

  useEffect(() => {
    document.title = "Create New Password";
    setFormIsValid(passwordInput.isValid && confirmPasswordInput.isValid);
  }, [passwordInput.isValid, confirmPasswordInput.isValid]);

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      dispatch(setMessage("Password has been successfully reset. Redirecting to login...", "success", false, 3));
      setTimeout(() => navigate("/login"), 1500);
    } else if (error || (responseData && statusCode && statusCode >= 400)) {
      const errMsg = error?.response?.data?.message || responseData?.message || "Invalid or expired reset link. Please try again.";
      dispatch(setMessage(errMsg, "error"));
    }
  }, [statusCode, error, responseData, dispatch, navigate]);

  const handleSubmit = () => {
    if (formIsValid) {
      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/reset-password`,
        method: "POST",
        body: {
          email,
          otp,
          newPassword: passwordInput.value
        },
      });
    }
  };

  return (
    <div className={style.screen}>
      <SignUpOrLoginContainer
        screenData={loginScreenData}
        classForMainContent={style.mainContent}
      >
        <div className={style.container}>
          <h1>Reset Password</h1>
          <InputWithInvalidText
            ErrorMessage={"Invalid Password"}
            className={`${style.Input} `}
            inputFields={{
              placeholder: "New Password",
              value: passwordInput.value,
              isInvalid: passwordInput.hasError,
              onBlurHandler: passwordInput.validateValueHandler,
              onFocusHandler: passwordInput.focusHandler,
              onChange: passwordInput.valueChangeHandler,
              type: "password",
              isTouched: passwordInput.isFocused,
            }}
            mandatory="true"
          />
          <InputWithInvalidText
            ErrorMessage={"Passwords do not match"}
            className={`${style.Input} `}
            inputFields={{
              placeholder: "Confirm New Password",
              value: confirmPasswordInput.value,
              isInvalid: confirmPasswordInput.hasError,
              onBlurHandler: confirmPasswordInput.validateValueHandler,
              onFocusHandler: confirmPasswordInput.focusHandler,
              onChange: confirmPasswordInput.valueChangeHandler,
              type: "password",
              isTouched: confirmPasswordInput.isFocused,
            }}
            mandatory="true"
          />
          <LoadingButton
            onClick={handleSubmit}
            disabled={!formIsValid}
            style={{ backgroundColor: !formIsValid ? "#ccc" : undefined }}
            text="Reset Password"
            isLoading={isLoading}
          />
        </div>
      </SignUpOrLoginContainer>
    </div>
  );
};

export default CreateNewPassword;
