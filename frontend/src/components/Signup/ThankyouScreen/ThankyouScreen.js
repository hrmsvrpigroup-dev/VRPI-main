import React, { useState, useEffect } from "react";
import style from "./ThankyouScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttpsAxios from "../../../hooks/use-httpsAxios";
import { url } from "../../../constants";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import { setMessage } from "../../../store/MessageDisplay/MessageActions";
import { clearUser } from "../../../store/UserSlice";

const ThankyouScreen = () => {
  const email = useSelector((state) => state.user.email);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sendRequest, isLoading, statusCode, error, responseData } = useHttpsAxios();

  const handleVerify = () => {
    if (!otp || !email) {
      if(!email) {
        dispatch(setMessage("Session expired, please register again.", "error"));
      }
      return;
    }
    sendRequest({
      url: `${url.backendBaseUrl}/vrpi-user/verify-account/${email}/${otp}`,
      method: "GET",
    });
  };

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      dispatch(setMessage("Account verified successfully! Redirecting to login...", "success", false, 4));
      setTimeout(() => {
        dispatch(clearUser());
        navigate("/login");
      }, 2000);
    } else if (error) {
      const errMsg = error?.response?.data?.message || "Invalid or expired OTP";
      dispatch(setMessage(errMsg, "error"));
    } else if (responseData && statusCode >= 400) {
      const errMsg = responseData?.message || "Invalid or expired OTP";
      dispatch(setMessage(errMsg, "error"));
    }
  }, [statusCode, error, responseData, dispatch, navigate]);

  return (
    <div className={style.container}>
      <img
        src={require(`../../../assets/login-signup/ThankYouImage.png`)}
        alt=""
        className={style.thankImage}
      ></img>
      <div className={style.thankText}>
        <h2 className={style.mainText}>Please Check your E-mail</h2>
        <p style={{ textAlign: "center" }}>
          Don’t worry!! We have safely stored your data. We have sent an OTP to your email address: <strong>{email}</strong>
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
          <input 
            type="text" 
            placeholder="Enter 6-digit OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} 
            style={{ 
              padding: '10px', 
              fontSize: '1.2rem', 
              width: '250px', 
              textAlign: 'center', 
              marginBottom: '1rem', 
              borderRadius: '5px', 
              border: '2px solid var(--primary)',
              outline: 'none'
            }}
            maxLength={6}
          />
          <LoadingButton 
            text="Verify OTP" 
            onClick={handleVerify} 
            isLoading={isLoading} 
            disabled={otp.length < 6}
            style={{ width: '250px', backgroundColor: otp.length < 6 ? '#ccc' : undefined }}
          />
        </div>
      </div>
    </div>
  );
};

export default ThankyouScreen;
