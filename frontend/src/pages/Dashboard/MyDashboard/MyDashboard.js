import { useEffect, useState } from "react";
import EnrolledCourseComponent from "../../../components/Dashboard/EnrolledCourseComponent/EnrolledCourseComponent";
import Courses from "../../../components/Dashboard/MyDashboardComponent/Courses/Courses";
import ProfileDetails from "../../../components/Dashboard/MyDashboardComponent/ProfileDetails/ProfileDetails";
import RightSideContents from "../../../components/Dashboard/RightSideContents/RightSideContents";
import WelcomeScreen from "../../../components/Dashboard/WelcomeScreen/WelcomeScreen";
import { EduTechData } from "../../../data/EduTechData";
import UserDataComponent from "../../../data/user";
import style from "./MyDashboard.module.css";
import { CircularProgress } from "@material-ui/core";
import ErrorPage from "../../Error";

const MyDashboard = () => {
  const [hideWelcome, setHideWelcome] = useState(false);
  const userData = UserDataComponent();

  useEffect(() => {
    if (userData.userData?.user) {
      document.title = `${userData.userData.user.firstName} - Dashboard`;
    }

    const timer = setTimeout(() => {
      setHideWelcome(true);
    }, 1000000);

    return () => clearTimeout(timer);
  }, [userData.userData]);

  if (userData.isLoading && userData.userData?.user) {
    return (
      <div className={style.loadingState}>
        <CircularProgress />
      </div>
    );
  } else if (userData.error) {
    return (
      <ErrorPage
        errorData={{
          title: userData.error.message,
          message: "Oh no, Something went wrong",
          image: "commonErrorPage.png",
          navigateButton: null,
          navigateTo: null,
        }}
      ></ErrorPage>
    );
  } else {
    return (
      <div className={style.container}>
        <WelcomeScreen user={userData.userData?.user} onClose={hideWelcome} />
        <div className={style.containers}>
          {userData.userData && (
            <div className={style.mainContainer}>
              {userData.userData.user && (
                <ProfileDetails
                  user={userData.userData.user}
                  userData={userData.userData}
                />
              )}

              {userData.userData.courseList && (
                <EnrolledCourseComponent
                  enrolledCourses={userData.userData?.courseList || []}
                />
              )}
              <Courses data={EduTechData} />
              {userData.userData && (
                // userData.userData?.certificatesToUpload !== 0 &&
                <div className={style.rightSideContents}>
                  <RightSideContents userData={userData.userData} />
                </div>
              )}
            </div>
          )}
          {userData.userData && (
            // userData.userData?.certificatesToUpload !== 0 &&
            <div className={style.sideContainer}>
              <RightSideContents userData={userData.userData} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default MyDashboard;
