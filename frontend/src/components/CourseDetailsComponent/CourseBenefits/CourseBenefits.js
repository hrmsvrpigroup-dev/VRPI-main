import { useEffect, useState } from "react";
import Section from "../../../UI/Sections/Section";
import style from "./CourseBenefits.module.css";

const courseBenefits = [
  "Scholarship for students who cleared the test ",
  "Internship on Real-Time Project",
  "Course completion Certificate",
  "Regardless of any stream, student can apply",
  "50% off based on the 1st Course Registration",
  "1:1 Mentorship",
  "Merit students based on their performance",
  "100 % Placement Assistance",
];

const CourseBenefits = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 700;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Section title="Course Benefits">
      <div className={style.benefits}>
        {width > breakpoint ? (
          <>
            <div className={style.bar}>
              <div
                className={style.benefit}
                style={{ width: "calc(100% - (2rem + 360px))" }}
              >
                <span>01</span>
                {courseBenefits[0]}
              </div>
              <div className={style.benefit}>
                <span>02</span>
                {courseBenefits[1]}
              </div>
              <div className={style.benefit}>
                <span>03</span>
                {courseBenefits[2]}
              </div>
            </div>
            <div className={style.bar}>
              <div className={style.benefit}>
                <span>04</span>
                {courseBenefits[3]}
              </div>
              <div
                className={style.benefit}
                style={{ width: " calc(100% - (1rem + 160px))" }}
              >
                <span>05</span>
                {courseBenefits[4]}
              </div>
            </div>
            <div className={style.bar}>
              <div className={style.benefit}>
                <span>06</span>
                {courseBenefits[5]}
              </div>
              <div
                className={style.benefit}
                style={{ width: "calc(100% - (2rem + 360px))" }}
              >
                <span>07</span>
                {courseBenefits[6]}
              </div>
              <div className={style.benefit}>
                <span>08</span>
                {courseBenefits[7]}
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {courseBenefits.map((benefits, index) => (
              <div className={style.benefit}>
                <span>0{index + 1}</span>
                {benefits}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default CourseBenefits;
