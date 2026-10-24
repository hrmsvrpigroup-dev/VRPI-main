import Section from "../../../UI/Sections/Section";
import style from "./CourseEligibility.module.css";
const CourseEligibilityData = [
  "Students",
  "Recent Graduates",
  "Career Changers",
  "Non-Traditional Learners",
  "International Students",
];

const CourseEligibility = () => {
  return (
    <Section title="Who can take this course ?">
      <ul className={style.eligibilityList}>
        {CourseEligibilityData.map((x) => (
          <li key={Math.random()}>{x}</li>
        ))}
      </ul>
    </Section>
  );
};

export default CourseEligibility;
