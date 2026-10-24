import { useEffect } from "react";
import LoginForm from "../../../components/Login/LoginForm/LoginForm";
import SignUpOrLoginContainer from "../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import style from "./Login.module.css";

const loginScreenData = {
  title: "Welcome Back!",
  description:
    "“We’re glad you’re back! Let’s dive back into VR PI Group of Companies.”",
  image: "loginPageImage.svg",
};

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <SignUpOrLoginContainer
      screenData={loginScreenData}
      classForMainContent={style.mainContent}
    >
      <LoginForm />
    </SignUpOrLoginContainer>
  );
};

export default Login;
