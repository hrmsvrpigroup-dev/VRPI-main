import { useState, useEffect } from "react";
import Button from "../../../../UI/Button/Button";
import CustomImage from "../../../../UI/Image/Image";
import { GetCourseByCourseId } from "../../../../data/EduTechData";
import style from "./EnrolledCourses.module.css";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = ({ enrolledCourses }) => {
  const navigate = useNavigate();
  const [uniqueCourseIds, setUniqueCourseIds] = useState([]);

  useEffect(() => {
    // Extract unique course IDs from enrolledCourses
    const ids = [...new Set(enrolledCourses.map((course) => course.id))];
    setUniqueCourseIds(ids);
  }, [enrolledCourses]);

  // Map over unique course IDs and get the corresponding course objects
  const replaceDataFromTheLocalData = uniqueCourseIds.map((courseId) =>
    GetCourseByCourseId(courseId)
  );

  return (
    <div className={style.container}>
      <h1>Enrolled Courses</h1>
      <div className={style.courses}>
        {replaceDataFromTheLocalData.map((course, index) => (
          <div className={style.course} key={index}>
            <div className={style.courseInfo}>
              <h2 className={style.courseName}>{course.name}</h2>
              <Button
                onClick={() => {
                  navigate(`/edutech/${course.id}`);
                }}
                className={style.viewBtn}
              >
                View
              </Button>
            </div>
            <img
              src={require(`../../../../assets/courses/${course.image}`)}
              alt=""
              className={style.courseImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
