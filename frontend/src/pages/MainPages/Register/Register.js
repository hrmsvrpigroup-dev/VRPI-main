import React, { useState } from "react";
import SignIn from "../../../components/Login-Signup/SignIn";
import SignUp from "../../../components/Login-Signup/SignUp";
import styles from "./RegisterPage.module.css";
import Background1 from "../../../UI/background/Background1";
import logo from "../../../assets/vrpiLogo.png";
import CustomImage from "../../../UI/Image/Image";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleForm = () => {
    setShowSignIn((prevState) => !prevState);
  };

  const SignInBox = (
    <>
      <SignIn />
      <div
        className={
          showSignIn ? styles["sign-up-toggle"] : styles["sign-in-toggle"]
        }
      >
        <p
          style={{
            fontSize: "1rem",
            fontFamily: '"Libre Baskerville", serif',
          }}
        >
          Are you new to VR Pi?
        </p>
        <button className={styles.btn} onClick={toggleForm}>
          Sign Up
        </button>
      </div>
    </>
  );

  const SignUpBox = (
    <>
      <SignUp />
      <div
        className={
          showSignIn ? styles["sign-up-toggle"] : styles["sign-in-toggle"]
        }
      >
        <p
          style={{
            fontSize: "1rem",
            fontFamily: '"Libre Baskerville", serif',
          }}
        >
          Already have an account
        </p>
        <button className={styles.btn} onClick={toggleForm}>
          Sign In
        </button>
      </div>
    </>
  );

  return (
    <div className={styles["register-page"]}>
      <div className={styles.logo}>
        <Link to="/" title="Link to home page">
          <CustomImage src={logo} alt="logo" title="logo" />
        </Link>
      </div>
      <Background1 />
      <div className={styles.pageContents}>
        <div
          className={`${styles["form-container"]} ${
            showSignIn ? styles["sign-in"] : styles["sign-up"]
          }`}
        >
          {showSignIn ? SignInBox : SignUpBox}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
