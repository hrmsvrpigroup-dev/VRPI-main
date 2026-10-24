import { useEffect } from "react";
import SignUpOrLoginContainer from "../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import EducationalDetailsComponent from "../../../components/Signup/EducationalDetails/EducationalDetailsComponent";
import UserDataComponent from "../../../data/user";
import { CircularProgress } from "@material-ui/core";
import ErrorPage from "../../Error";
import { PageNotFoundErrorData } from "../../../data/ErrorData";
import styles from "./EducationalDetails.module.css";
const EducationalScreenData = {
  title: "Educational Details",
  description:
    "We need these details to validate the candidate for our Knowledge Hub Programs",
  image: "educationDetailsImage.svg",
};
const EducationalDetails = () => {
  useEffect(() => {
    document.title = "Student Educational Details Form";
  }, []);

  const FetchUserData = UserDataComponent();

  return (
    <>
      {FetchUserData.isLoading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      ) : FetchUserData.userData?.educationalDetails ? (
        <ErrorPage errorData={PageNotFoundErrorData} />
      ) : (
        <SignUpOrLoginContainer screenData={EducationalScreenData}>
          <EducationalDetailsComponent />
        </SignUpOrLoginContainer>
      )}
    </>
  );
};

export default EducationalDetails;
