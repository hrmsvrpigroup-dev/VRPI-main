import { useEffect } from "react";
import style from "./EnrolledCourseComponent.module.css";
import EnrolledCourses from "./EnrolledCourses/EnrolledCourses";
import LiveClasses from "./LiveClasses/LiveClasses";

const EnrolledCourseComponent = ({ enrolledCourses }) => {
  return (
    <>
      {enrolledCourses && enrolledCourses.length > 0 && (
        <EnrolledCourses enrolledCourses={enrolledCourses} />
      )}
      {/* <LiveClasses enrolledCourses={enrolledCourses} /> */}
    </>
  );
};

export default EnrolledCourseComponent;
