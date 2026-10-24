import { useNavigate } from "react-router-dom";
import style from "./Courses.module.css";
import Button from "../../../../UI/Button/Button";
import CourseCard from "./CourseCard/CourseCard";

const Courses = ({ data, ifCourseDetails, className }) => {
  const onlineCourses =
    data.Courses && data.Courses.filter((course) => course.type === "online");

  const offlineCourses =
    data.Courses && data.Courses.filter((course) => course.type === "offline");
  const upcomingCourses =
    data.Courses && data.Courses.filter((course) => course.type === "upcoming");

  const allCourses = [
    {
      title: "Edu-Tech Online Courses",
      highlightWord: "Edu-Tech",
      courses: onlineCourses,
      description:
        "To take these courses undergo a Free Test and win a Scholarship for each Online Courses of VR PI Group of Companies",
    },
    {
      title: "Edu-Tech Offline Courses",
      highlightWord: "Edu-Tech",
      courses: offlineCourses,
      description:
        "To take these courses undergo a Free Test and win a Scholarship for each Online Courses of VR PI Group of Companies",
    },
    // {
    //   title: "Upcoming Courses",
    //   highlightWord: "Upcoming",
    //   courses: upcomingCourses,
    // },
  ];

  const liveInternships =
    data.Internships &&
    data.Internships.filter((intership) => intership.type === "live");
  const upcomingInternships =
    data.Internships &&
    data.Internships.filter((intership) => intership.type === "upcoming");

  const allInternships = [
    {
      title: "Internships on",
      highlightWord: "Internships",
      internships: liveInternships,
    },
    {
      title: "Upcoming Internships",
      highlightWord: "Internships",
      internships: upcomingInternships,
    },
  ];

  return (
    <div className={style.allCourses}>
      {allCourses.map((courseSection, index) => {
        return (
          <div key={index}>
            {courseSection.courses.length !== 0 && (
              <div className={style.cardSection}>
                <h2 className={style.cardSectionTitle}>
                  {courseSection.title}
                </h2>
                <p>{courseSection.description}</p>
                <div className={`${style.cardStack} ${className} `}>
                  {courseSection.courses.map((CardDetails, index) => {
                    return (
                      <CourseCard
                        key={CardDetails.id || index}
                        CardDetails={CardDetails}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Courses;
