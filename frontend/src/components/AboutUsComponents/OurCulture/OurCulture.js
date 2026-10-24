import Section from "../../../UI/Sections/Section";
import style from "./OurCulture.module.css";
const OurCulture = () => {
  return (
    <div>
      <Section title="Our Company Culture">
        <div className={style.OurCulture}>
          <div className={style.content}>
            <BlurCircles className={style.circle1} />
            <BlurCircles className={style.circle2} />
            <h1> Corporate Identity</h1>
            <p>
              Embracing diversity, fostering innovation, and prioritizing
              collaboration, our company culture champions creativity,
              inclusivity, and excellence in all endeavors.
            </p>
          </div>
          <div className={style.image}>
            <img src={require("../../../assets/aboutus/AboutUs1.png")} alt="" />
          </div>
        </div>
      </Section>
    </div>
  );
};

const BlurCircles = ({ className }) => {
  return (
    <div className={`${style.blurredCircleContainer}  ${className}`}>
      <div className={`${style.blurredCircle}`}></div>
    </div>
  );
};

export default OurCulture;
