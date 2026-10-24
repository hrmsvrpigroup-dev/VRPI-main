import Section from "../../../UI/Sections/Section";
import style from "./WhyToChooseUs.module.css";

const WhyToChooseUsData = {
  description:
    "Choosing our institute over others can be a significant decision for potential students or learners. Here are some reasons why they might choose our institute:",
  points: [
    {
      title: "High-Quality Education:",
      description:
        "Emphasize the quality of education and training provided by our institute. Highlight our experienced faculty members, comprehensive curriculum, and state-of-the-art facilities.",
    },
    {
      title: "Affordability and Financial Aid:",
      description:
        "Our institute offers competitive tuition rates, scholarships, or financial aid options, make sure to highlight these as reasons for students to choose our institute, especially for those who may be concerned about the cost of education.",
    },
    {
      title: "Flexible Learning Options:",
      description:
        "Our institute offers flexible learning options such as online courses, part-time programs, or evening classes, make sure to emphasize this as a benefit for students who may have other commitments or prefer a more flexible schedule.",
    },
  ],
};
const WhyToChooseUs = () => {
  return (
    <Section title="Why To Choose Us">
      <h2 className={style.head}>{WhyToChooseUsData.description}</h2>
      <div className={style.points}>
        {WhyToChooseUsData.points.map((point, index) => (
          <div className={style.point} key={Math.random()}>
            <span className={style.pointNumber}>0{index + 1}</span>
            <h2>{point.title}</h2>
            <p className={style.description}>{point.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhyToChooseUs;
