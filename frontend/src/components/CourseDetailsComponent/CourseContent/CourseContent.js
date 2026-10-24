import React, { useEffect, useState } from "react";
import styles from "./CourseContent.module.css";
import Section from "../../../UI/Sections/Section";
import Button from "../../../UI/Button/Button";
import { useDispatch } from "react-redux";
import { setComingSoon } from "../../../store/ComingSoonSlice";
import UserDataComponent from "../../../data/user";
import PleaseEnrollBtn from "../PleaseEnrollBtn/PleaseEnrollBtn";

const CourseContent = ({
  courseContent,
  courId,
  courseCode,
  discountedPrice,
  actualPrice,
  courseType,
}) => {
  const [openChapters, setOpenChapters] = useState([]);
  const [openModules, setOpenModules] = useState([]);

  const dispatch = useDispatch();

  const toggleChapter = (index) => {
    if (openChapters.includes(index)) {
      setOpenChapters(openChapters.filter((item) => item !== index));
    } else {
      setOpenChapters([...openChapters, index]);
    }
  };

  const toggleModule = (index) => {
    if (openModules.includes(index)) {
      setOpenModules(openModules.filter((item) => item !== index));
    } else {
      setOpenModules([...openModules, index]);
    }
  };

  const [enrolled, setEnrolled] = useState(false);

  const FetchUserData = UserDataComponent();

  useEffect(() => {
    if (FetchUserData.userData?.user) {
      // console.log("userData", FetchUserData.userData.enrolledCourses);
      if (FetchUserData.userData?.courseList <= 0) {
        setEnrolled(false);
      } else if (
        FetchUserData.userData?.courseList.find((course) => {
          return course.id.toString() === courId.toString();
        })
      ) {
        setEnrolled(true);
      }
    }

  }, [FetchUserData, courId]);

  return (
    <Section title="Course Content">
      {/* {enrolled && ( */}
      <>
        <h1 className={styles.techStack}>{courseContent.techStack}</h1>
        <div className={styles.courseContent}>
          {courseContent.chapters.map((chapter, chapterIndex) => (
            <Chapter
              key={chapterIndex}
              chapter={chapter}
              chapterIndex={chapterIndex}
              isOpen={openChapters.includes(chapterIndex)}
              toggleChapter={toggleChapter}
              openModules={openModules}
              toggleModule={toggleModule}
              isFirstChapter={chapterIndex === 0}
              courseId={courId}
              enrolled={enrolled}
              courseCode={courseCode}
              discountedPrice={discountedPrice}
              actualPrice={actualPrice}
              courseType={courseType}
            />
          ))}
        </div>
        <div className={styles.realProject}>
          <h2>
            Get Hands-on experience by enrolling to our course which includes a
            Real-Time Project
          </h2>
          <Button
            onClick={() => {
              dispatch(setComingSoon(true));
            }}
            className={styles.viewBtn}
          >
            View My Project
          </Button>
        </div>
      </>
      {/* )} */}
    </Section>
  );
};

export default CourseContent;

const ArrowToggleComponent = ({ isOpen, image1, image2 }) => {
  return (
    <img
      src={require(`../../../assets/courses/${isOpen ? image1 : image2}`)}
      alt=""
      style={{ width: "30px" }}
    />
  );
};
const PleaseEnroll = ({
  courseId,
  courseCode,
  discountedPrice,
  actualPrice,
  courseType,
}) => {
  return (
    <div className={styles.pleaseEnroll}>
      <h2>Sorry!! You are not enrolled the course so far</h2>
      <p>To get to know more about the course structure Join our course</p>
      <PleaseEnrollBtn
        courseId={courseId}
        courseCode={courseCode}
        discountedPrice={discountedPrice}
        actualPrice={actualPrice}
        courseType={courseType}
      />
    </div>
  );
};
const Chapter = ({
  chapter,
  chapterIndex,
  isOpen,
  toggleChapter,
  openModules,
  toggleModule,
  isFirstChapter,
  enrolled,
  courseId,
  courseCode,
  discountedPrice,
  actualPrice,
  courseType,
}) => {
  const handleClickChapter = () => {
    toggleChapter(chapterIndex);
  };

  return (
    <div key={chapterIndex} className={styles.chapter}>
      <div
        className={styles.chapterHeader}
        onClick={handleClickChapter}
        style={{ cursor: "pointer" }}
      >
        <h3>{chapter.title}</h3>
        <ArrowToggleComponent
          isOpen={isOpen}
          image1="arrowUpPrimary.png"
          image2="arrowDownPrimary.png"
        />
      </div>
      {isOpen && (
        <>
          {isFirstChapter || enrolled ? (
            <div className={styles.modules}>
              {chapter.modules.map((module, moduleIndex) => (
                <Module
                  key={moduleIndex}
                  module={module}
                  moduleIndex={moduleIndex}
                  isOpen={openModules.includes(moduleIndex)}
                  toggleModule={toggleModule}
                  showLessons={moduleIndex < 3} // Only show lessons for first three modules
                  courseId={courseId}
                  enrolled={enrolled}
                  discountedPrice={discountedPrice}
                  actualPrice={actualPrice}
                  courseType={courseType}
                />
              ))}
            </div>
          ) : (
            <PleaseEnroll
              courseId={courseId}
              courseCode={courseCode}
              discountedPrice={discountedPrice}
              actualPrice={actualPrice}
              courseType={courseType}
            />
          )}
        </>
      )}
    </div>
  );
};

const Module = ({
  module,
  moduleIndex,
  isOpen,
  toggleModule,
  showLessons,
  courseId,
  enrolled,
}) => {
  const handleClickModule = () => {
    toggleModule(moduleIndex);
  };

  return (
    <div
      key={moduleIndex}
      className={styles.module}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.moduleEach} onClick={handleClickModule}>
        <h4>{module.title}</h4>
        {module.lessons && !isOpen && (
          <img
            src={require("../../../assets/courses/arrowRight.png")}
            alt=""
            style={{ width: "50px" }}
          />
        )}
      </div>
      {module.lessons && isOpen && (
        <>
          {showLessons || enrolled ? (
            <ul className={styles.lessons}>
              {module.lessons.map((lesson, lessonIndex) => (
                <li key={lessonIndex} className={styles.lesson}>
                  {lesson.title}
                </li>
              ))}
            </ul>
          ) : (
            <PleaseEnroll courseId={courseId} />
          )}
        </>
      )}
    </div>
  );
};
