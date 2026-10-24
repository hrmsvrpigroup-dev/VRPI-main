import { useNavigate } from "react-router-dom";
import UserDataComponent from "../../../data/user";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../../UI/ConfirmModel/ConfirmationModal";
import useHttpsAxios from "../../../hooks/use-httpsAxios";
import { url } from "../../../constants";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import { setMessage } from "../../../store/MessageDisplay/MessageActions";

const PleaseEnrollBtn = ({
  courseId,
  courseCode,
  discountedPrice,
  actualPrice,
  courseType,
}) => {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);

  const FetchUserData = UserDataComponent();
  const isVRPIUserLoggedIn = useSelector(
    (state) => state.login.isVRPIUserLoggedIn
  );
  const userId = useSelector((state) => state.login.userId);

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const { sendRequest, isLoading, error, responseData, statusCode } =
    useHttpsAxios();

  useEffect(() => {
    if (FetchUserData.userData && FetchUserData.userData?.courseList) {
      const courseList = FetchUserData.userData.courseList;
      const hasCourseId = courseList.some((course) => {
        // console.log(
        //   "Course id from the Data->",
        //   course.id,
        //   "Course id from the props->",
        //   courseId
        // );
        return course.courseCode.toString() === courseCode.trim().toString();
      });
      // console.log(courseList);
      // console.log(hasCourseId);
      if (hasCourseId) {
        setEnrolled(hasCourseId);
      }
    }
  }, [FetchUserData.userData?.courseList, FetchUserData.userData, courseCode]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      window.location.href = responseData;
    } else if (error) {
      const errMsg =
        error?.response?.data?.statusMessage ||
        error?.response?.data?.errorMessage ||
        error?.message ||
        "An error occurred";
      dispatch(setMessage(errMsg, "error", false, 4));
    } else if (responseData && statusCode && statusCode > 202) {
      const errMsg =
        responseData?.response?.data?.statusMessage ||
        responseData?.response?.data?.errorMessage ||
        responseData?.message ||
        "An error occurred";
      dispatch(setMessage(errMsg, "error", false, 4));
    }
  }, [responseData, dispatch, error, statusCode]);

  const NotLoginStateHandler = () => {
    setConfirmationMessage(
      "You need to be logged in to enroll. Do you want to proceed to login?"
    );
    setConfirmationModalOpen(true);
  };

  const NotSubmittedEducationalDetailsHandler = () => {
    setConfirmationMessage(
      "Please fill out your 'educational details' and 'mandatory certificates' before enrolling."
    );
    setConfirmationModalOpen(true);
  };

  const NotSubmittedMandatoryCertificatesHandler = () => {
    setConfirmationMessage(
      "Please fill upload all mandatory certificates before enrolling"
    );
    setConfirmationModalOpen(true);
  };

  const EnrollIngToTheCourse = () => {
    setConfirmationMessage("Proceed to Payments");
    setConfirmationModalOpen(true);
  };

  const handleEnrollCourseHandler = () => {
    if (!isVRPIUserLoggedIn) {
      NotLoginStateHandler();
      return;
    }

    if (!FetchUserData.userData?.user) {
      return;
    }

    if (!FetchUserData.userData?.educationalDetails) {
      NotSubmittedEducationalDetailsHandler();
      return;
    }

    if (FetchUserData.userData?.certificatesToUpload !== 0) {
      NotSubmittedMandatoryCertificatesHandler();
      return;
    }
    EnrollIngToTheCourse();
  };

  const EnrollToTheCourse = async () => {
    sendRequest({
      url: `${url.backendBaseUrl}/course/enroll-course?courseId=${courseId}&userId=${userId}`,
      method: "POST",
    });
  };

  const handleConfirm = () => {
    if (!isVRPIUserLoggedIn) {
      navigate("/login");
    } else if (!FetchUserData.userData?.educationalDetails) {
      navigate("/educationalDetails");
    } else if (FetchUserData.userData?.certificatesToUpload !== 0) {
      navigate("/mandatoryCertificates");
    } else {
      EnrollToTheCourse();
    }
    setConfirmationModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onRequestClose={() => setConfirmationModalOpen(false)}
        title="Confirmation"
        message={confirmationMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <LoadingButton
        text={
          enrolled
            ? "Enrolled"
            : `Enroll now for ₹${
                courseType === "online" ? actualPrice : actualPrice
              }`
        }
        style={{
          color: !enrolled ? "white" : "black",
          width: "180px",
          padding: "0",
        }}
        disabled={enrolled}
        isLoading={isLoading || FetchUserData.isLoading}
        loaderColor="white"
        onClick={handleEnrollCourseHandler}
      />
    </>
  );
};

export default PleaseEnrollBtn;
