import Section from "../../../UI/Sections/Section";
import style from "./Syllabus.module.css";
const Syllabus = ({ syllabus }) => {
  return (
    <Section title="What you will learn">
      <div className={style.content}>
        <div className={style.frame}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={style.bar1}></div>
            <div className={style.sphere}></div>
            <div className={style.sphere}></div>
            <div className={style.sphere}></div>
            <div className={style.sphere}></div>
          </div>
          <img
            src={require("../../../assets/courses/syllabusImage.png")}
            alt=""
            style={{ margin: "auto" }}
          />
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "row-reverse",
            }}
          >
            <div className={style.bar2} style={{ width: "70%" }}></div>
            <div className={style.sphere}></div>
            <div className={style.sphere}></div>
          </div>
        </div>
        <div className={style.contentSection}>
          <h1>{syllabus.description}</h1>
          <div>
            <ul className={style.topics}>
              {syllabus.topics.map((topic) => (
                <li className={style.topic} key={Math.random()}>
                  <h2>
                    {topic.title}
                    {": "}
                  </h2>
                  <span>{topic.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </Section>
  );
};

export default Syllabus;
