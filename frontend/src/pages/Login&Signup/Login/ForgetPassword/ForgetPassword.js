import { useEffect } from "react";
import Button from "../../../../UI/Button/Button";
import InputWithInvalidText from "../../../../UI/Input/InputWithInvalidText";
import { emailValidation } from "../../../../components/InputValidations/InputValidations";
import SignUpOrLoginContainer from "../../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import useInput from "../../../../hooks/use-Input";
import style from "./ForgetPassword.module.css";
import { url } from "../../../../constants";
import useHttpsAxios from "../../../../hooks/use-httpsAxios";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../../store/MessageDisplay/MessageActions";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const loginScreenData = {
    title: "Welcome Back!",
    description:
      "At moment we don’t have your Data to create your account. So lets just start to create your Account",
    image: "loginPageImage.svg",
  };

  const emailInput = useInput({ validateValue: emailValidation });

  useEffect(() => {
    document.title = "Forget Password";
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendRequest, isLoading, statusCode, error, responseData } = useHttpsAxios();

  const SuccessResponseHandler = () => {
    dispatch(setMessage("Password reset link sent to your email", "success", false, 3));
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      SuccessResponseHandler();
    } else if (error || (responseData && statusCode && statusCode >= 400)) {
      const errMsg =
        error?.response?.data?.message ||
        responseData?.message ||
        "An error occurred. Please try again.";
      dispatch(setMessage(errMsg, "error"));
    }
  }, [statusCode, error, responseData, dispatch, navigate]);

  const handleSubmit = () => {
    if (emailInput.isValid) {
      const formData = {
        email: emailInput.value,
      };
      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/forgot-password`,
        method: "POST",
        body: formData,
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
          <h1>Forget Password</h1>
          <InputWithInvalidText
            ErrorMessage={"Invalid Email"}
            className={`${style.Input} `}
            inputFields={{
              placeholder: "Enter your Email Address",
              value: emailInput.value,
              isInvalid: emailInput.hasError,
              onBlurHandler: emailInput.validateValueHandler,
              onFocusHandler: emailInput.focusHandler,
              onChange: emailInput.valueChangeHandler,
              type: "email",
              isTouched: emailInput.isFocused,
            }}
            mandatory="true"
          />
          <Button
            onClick={handleSubmit}
            disabled={!emailInput.isValid}
            style={{ backgroundColor: !emailInput.isValid && "#ccc" }}
          >
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </SignUpOrLoginContainer>
    </div>
  );
};

export default ForgetPassword;
