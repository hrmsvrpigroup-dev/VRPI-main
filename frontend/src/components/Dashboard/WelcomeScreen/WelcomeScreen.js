import { useEffect, useState } from "react";
import style from "./WelcomeScreen.module.css";

const WelcomeScreen = ({ user, onClose }) => {
  const [hideTheWelcome, setHideTheWelcome] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (onClose) {
        setHideTheWelcome(true);
      }
    }, [300]);
  });
  return (
    <>
      {!hideTheWelcome && user && (
        <div className={`${style.welcomeScreen} ${onClose && style.hide}`}>
          <h1>Welcome Back, {user.firstName}!</h1>
          <p>Always stay updated with your Profile</p>
        </div>
      )}
    </>
  );
};

export default WelcomeScreen;
