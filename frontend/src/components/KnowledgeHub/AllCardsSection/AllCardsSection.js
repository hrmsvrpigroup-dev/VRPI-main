import { useState } from "react";
import Section from "../../../UI/Sections/Section";
import CourseCard from "../CourseCard/CourseCard";
import InternshipCard from "../InternshipCard/InternshipCard";
import InternshipApplyForm from "../InternshipApplyForm/InternshipApplyForm";
import style from "./AllCardSection.module.css";

const AllCardsSection = ({ data, ifCourseDetails, className }) => {
  const [selectedInternship, setSelectedInternship] = useState(null);

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
    },
    {
      title: "Edu-Tech Offline Courses",
      highlightWord: "Edu-Tech",
      courses: offlineCourses,
    },
    {
      title: "Upcoming Courses",
      highlightWord: "Upcoming",
      courses: upcomingCourses,
    },
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
    <>
      {data.Courses ? (
        <>
          {allCourses.map((courseSection) => {
            return (
              <div key={Math.random()}>
                {courseSection.courses.length !== 0 && (
                  <Section
                     className={style.cardSection}
                    title={courseSection.title}
                    highlightWord={courseSection.highlightWord}
                    viewAll={courseSection.courses.length >= 5}
                  >
                    <div
                      className={`${style.cardStack} ${
                        ifCourseDetails === true && style.forDetailsPage
                      } ${className} ${style.CourseCards} `}
                    >
                      {courseSection.courses.map((CardDetails) => {
                        return (
                          <CourseCard
                            CardDetails={CardDetails}
                            key={Math.random()}
                          />
                        );
                      })}
                    </div>
                  </Section>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>
          {allInternships.map((internships) => (
            <div key={Math.random()}>
              {internships.internships.length !== 0 && (
                <Section
                  className={style.cardSection}
                  title={internships.title}
                  highlightWord={internships.highlightWord}
                  viewAll="true"
                >
                  <div
                    className={`${style.cardStack} ${style.internshipsCards}`}
                  >
                    {internships.internships.map((CardDetails) => {
                      return (
                        <InternshipCard
                          CardDetails={CardDetails}
                          key={Math.random()}
                          onApply={setSelectedInternship}
                        />
                      );
                    })}
                  </div>
                </Section>
              )}
            </div>
          ))}
        </>
      )}
      {selectedInternship && (
        <InternshipApplyForm
          internship={selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </>
  );
};

export default AllCardsSection;
