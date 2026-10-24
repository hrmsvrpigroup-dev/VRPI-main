import { useDispatch, useSelector } from "react-redux";
import SignUpOrLoginContainer from "../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import MandatoryCertificatesForm from "../../../components/Signup/MandatoryCertificatesForm/MandatoryCertificatesForm";
import { clearMessage } from "../../../store/MessageDisplay/MessageActions";
import Message from "../../../UI/Popup/Message";
import { useEffect } from "react";
import UserDataComponent from "../../../data/user";
import { CircularProgress } from "@material-ui/core";
import ErrorPage from "../../Error";
import { PageNotFoundErrorData } from "../../../data/ErrorData";
import styles from "./MandatoryCertificates.module.css";
const MandatoryCertificates = () => {
  const welcomePageScreenData = {
    title: "Mandatory Certificate",
    description:
      "At moment we don’t have your Data to create your account. So lets just start to create your Account",
    image: "personalDetailsPageImage.svg",
  };

  const { message, type, dontClose, time } = useSelector(
    (state) => state.message
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Mandatory Certificate";
  }, []);

  const handleErrorClose = () => {
    dispatch(clearMessage());
  };
  const FetchUserData = UserDataComponent();
  return (
    <>
      {FetchUserData.isLoading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      ) : FetchUserData.userData?.uploadedCertificates === 4 ? (
        <ErrorPage errorData={PageNotFoundErrorData} />
      ) : (
        <div style={{ display: "flex" }}>
          {message && (
            <Message
              message={message}
              type={type}
              onClose={handleErrorClose}
              dontClose={dontClose}
              time={time && 4000}
            />
          )}
          <SignUpOrLoginContainer screenData={welcomePageScreenData}>
            <MandatoryCertificatesForm />
          </SignUpOrLoginContainer>
        </div>
      )}
    </>
  );
};

export default MandatoryCertificates;
