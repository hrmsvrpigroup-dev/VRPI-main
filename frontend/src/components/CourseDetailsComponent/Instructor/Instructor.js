import Section from "../../../UI/Sections/Section";
import style from "./Instructor.module.css";
const Instructor = ({ instructorData }) => {
  return (
    <Section title="Instructor Details">
      <div className={style.Instructor}>
        <div className={style.bar1}></div>
        <div className={style.bar2}></div>
        <div className={style.content}>
          <div className={style.imageContainer}>
            <img
              src={require(`../../../assets/courses/${instructorData.image}`)}
              alt=""
            />
          </div>
          <div className={style.description}>
            <h2>Hii!!</h2>
            <h2>I’m {instructorData.name} Your Instructor for this Course</h2>
            {instructorData.description.map((x) => (
              <p key={Math.random()}>{x}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Instructor;
