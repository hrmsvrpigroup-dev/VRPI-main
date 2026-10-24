import { useEffect } from "react";
import EnrolledCourseComponent from "../../../components/Dashboard/EnrolledCourseComponent/EnrolledCourseComponent";
import Courses from "../../../components/Dashboard/MyDashboardComponent/Courses/Courses";
import { EduTechData } from "../../../data/EduTechData";
import UserDataComponent from "../../../data/user";
import { CircularProgress } from "@material-ui/core";

const DashboardCourses = () => {
  const FetchUserData = UserDataComponent();

  useEffect(() => {
    document.title = "Edutech Courses";
  });

  // Check if user data and necessary properties are defined
  const userExists =
    FetchUserData.userData && FetchUserData.userData?.courseList;

  return (
    <div>
      {FetchUserData.isLoading ? (
        <CircularProgress />
      ) : (
        userExists && (
          <EnrolledCourseComponent
            enrolledCourses={FetchUserData.userData?.courseList}
          />
        )
      )}
      <Courses data={EduTechData} />
    </div>
  );
};

export default DashboardCourses;
