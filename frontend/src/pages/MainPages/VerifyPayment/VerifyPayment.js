import { useEffect, useState, useCallback } from "react";
import axios from "axios"; // Import Axios
import { CircularProgress } from "@material-ui/core";
import styles from "./VerifyPayments.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomImage from "../../../UI/Image/Image";
import Button from "../../../UI/Button/Button";
import { url } from "../../../constants";
import UserDataComponent from "../../../data/user";
import ErrorPage from "../../Error";
const VerifyPayment = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const location = useLocation();
  const { pathname } = location;

  const [paymentVerificationStatus, setPaymentVerificationStatus] =
    useState(false);

  const courseId = queryParams.get("courseId");
  const amount = queryParams.get("amount");
  const orderId = queryParams.get("orderId");
  const razorpayPaymentId = queryParams.get("razorpay_payment_id");
  const razorpayPaymentLinkId = queryParams.get("razorpay_payment_link_id");
  const razorpayPaymentLinkReferenceId = queryParams.get(
    "razorpay_payment_link_reference_id"
  );
  const razorpayPaymentLinkStatus = queryParams.get(
    "razorpay_payment_link_status"
  );
  const razorpaySignature = queryParams.get("razorpay_signature");
  const userId = queryParams.get("userId");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);

  const FetchUserData = UserDataComponent();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url.backendBaseUrl}${pathname}`, {
        params: {
          amount,
          courseId,
          orderId,
          razorpay_payment_id: razorpayPaymentId,
          razorpay_payment_link_id: razorpayPaymentLinkId,
          razorpay_payment_link_reference_id: razorpayPaymentLinkReferenceId,
          razorpay_payment_link_status: razorpayPaymentLinkStatus,
          razorpay_signature: razorpaySignature,
          userId,
        },
      });
      // console.log(response);

      if (response.status && response.data === "Payment successful") {
        setPaymentVerificationStatus(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  }, [
    amount,
    courseId,
    orderId,
    pathname,
    razorpayPaymentId,
    razorpayPaymentLinkId,
    razorpayPaymentLinkReferenceId,
    razorpayPaymentLinkStatus,
    razorpaySignature,
    userId,
  ]);

  useEffect(() => {
    console.log("run");
    if (FetchUserData?.userData?.courseList && !FetchUserData?.isLoading) {
      const findCourse = FetchUserData.userData?.courseList.find(
        (course) => course.id.toString() === courseId.toString()
      );
      console.log("run1");

      if (
        verified === false &&
        paymentVerificationStatus === false &&
        !FetchUserData.error
      ) {
        if (findCourse) {
          setVerified(true);
          setPaymentVerificationStatus(true);

          return;
        } else {
          fetchData();
          return;
        }
      }
    }
  }, [
    FetchUserData.userData?.courseList,
    FetchUserData?.isLoading,
    FetchUserData.error,
    courseId,
    paymentVerificationStatus,
    verified,
    fetchData,
  ]);

  const successfulRequest = {
    image: "paymentSuccessfulImage.png",
    assetIcon: "success.png",
    buttonActions: {
      title: "Go to Dashboard",
      action: () => {
        navigate("/dashboard");
      },
    },
    text: "Payment Successful",
    paymentStatus: razorpayPaymentLinkStatus,
    message:
      "Thank you for choosing Edu-tech! Please click on the button below to access your course.",
  };

  const failedRequest = {
    image: "paymentFailedImage.png",
    assetIcon: "cancel.png",
    buttonActions: {
      title: "Try Again",
      action: () => {},
    },
    text: "Payment Failed",
    paymentStatus: null,
    message:
      "Your transaction has failed due to some technical issues. Please try again.",
  };

  // const Error = {

  // }

  const paymentStatusData =
    (razorpayPaymentLinkStatus === "paid" &&
      razorpaySignature &&
      paymentVerificationStatus) ||
    verified
      ? successfulRequest
      : failedRequest;

  if (FetchUserData.isLoading || isLoading) {
    // <>{console.log(error)}</>

    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  } else if (
    FetchUserData.error !== null ||
    (error !== null && error !== undefined)
  ) {
    return (
      <ErrorPage
        errorData={{
          title: FetchUserData.error?.message || error.message,
          message: "Oh no, Something went wrong",
          image: "commonErrorPage.png",
          navigateButton: null,
          navigateTo: null,
        }}
      ></ErrorPage>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.container}>
          <CustomImage
            src={require(`../../../assets/verifyPayments/${paymentStatusData.image}`)}
            alt={paymentStatusData.text}
            classForDiv={styles.imageContainer}
          />
          <div className={styles.paymentStatus}>
            <CustomImage
              src={require(`../../../assets/verifyPayments/${paymentStatusData.assetIcon}`)}
              alt={paymentStatusData.text}
              classForDiv={styles.imageContainer}
            />
            <span
              style={{
                color: `${
                  paymentStatusData.paymentStatus ? "#00B112" : "#E30000"
                }`,
              }}
            >
              {paymentStatusData.text}
            </span>
          </div>
          <p className={styles.paymentMessage}>{paymentStatusData.message}</p>
          <Button onClick={paymentStatusData.buttonActions.action}>
            {paymentStatusData.buttonActions.title}
          </Button>
        </div>
      </div>
    );
  }
};

export default VerifyPayment;
