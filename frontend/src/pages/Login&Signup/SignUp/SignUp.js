import { useEffect, useState } from "react";
import SignUpOrLoginContainer from "../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import SelectUser from "../../../components/Signup/SelectUser/SelectUser";
import { useSelector } from "react-redux";
import PersonalDetails from "../../../components/Signup/PersonalDetails/PersonalDetails";
import ThankyouScreen from "../../../components/Signup/ThankyouScreen/ThankyouScreen";
import style from "./SignUp.module.css";

const welcomePageScreenData = {
  title: "Welcome!!",
  description:
    "Welcome to VR PI Group of Companies! We’re thrilled to have you on board.",
  image: "welcomePageImage.svg",
};
const personalPageScreenData = {
  title: "Create Account",
  description:
    "At moment we don’t have your Data to create your account. So lets just start to create your Account",
  image: "personalDetailsPageImage.svg",
};

const SignUp = () => {
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    // console.log("userState->", userState);
    if (userState.role === null && userState.step === null) {
      document.title = "Welcome to Sign Up page!";
    } else if (userState.role === "student" && userState.step === 1) {
      document.title = "Personal Details";
    } else {
      document.title = "Thank You";
    }
  }, [userState]);

  return (
    <>
      {userState.role === null && userState.step === null && (
        <SignUpOrLoginContainer
          screenData={welcomePageScreenData}
          classForMainContent={style.mainContent}
        >
          <SelectUser />
        </SignUpOrLoginContainer>
      )}
      {userState.role === "student" && userState.step === 1 && (
        <SignUpOrLoginContainer screenData={personalPageScreenData}>
          <PersonalDetails role="student" />
        </SignUpOrLoginContainer>
      )}
      {userState.role === "client" && userState.step === 1 && (
        <SignUpOrLoginContainer screenData={personalPageScreenData}>
          <PersonalDetails role="client" />
        </SignUpOrLoginContainer>
      )}
      {/* {console.log("userState", userState)} */}
      {userState.step === 2 && <ThankyouScreen />}
    </>
  );
};

export default SignUp;
