import { useEffect, useState } from "react";
import style from "./CoreValues.module.css";
import Section from "../../../UI/Sections/Section";
const OurCoreValues = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const breakPoint1 = 900;
  // const breakPoint2 = 750;
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const StarStack = (
    <>
      {width > breakPoint1 && (
        <div className={style.stars}>
          <img src={require("../../../assets/aboutus/start.png")} alt="" />
          <img src={require("../../../assets/aboutus/start.png")} alt="" />
          <img src={require("../../../assets/aboutus/start.png")} alt="" />
        </div>
      )}
    </>
  );

  return (
    <>
      <Section title="Our Core Values">
        <p className={style.mainContent}>
          The three core values of a company can vary greatly depending on its
          mission, culture, and goals. However, here are three common core
          values that our company prioritize: 
        </p>
        <div className={style.cards}>
          {width > breakPoint1 && (
            <div className={style.sidePics}>
              <img
                src={require("../../../assets/aboutus/start.png")}
                alt=""
                className={style.sidePicStar}
              />

              <img
                className={style.sidePic}
                style={{ marginTop: "2rem" }}
                src={require("../../../assets/aboutus/aboutUs5.png")}
                alt=""
              ></img>
              <img
                className={style.sidePic}
                src={require("../../../assets/aboutus/aboutUs4.png")}
                alt=""
              ></img>
            </div>
          )}
          <Card>
            <b>Integrity: </b> Upholding honesty, transparency, and ethical
            behaviour in all aspects of business dealings, both internally and
            externally. 
          </Card>
          <div
            className={style.starStack1}
            // style={{ transform: `translate(${width / 8}px)` }}
          >
            {StarStack}
            <Card>
              <b>Innovation: </b>Encouraging creativity, continuous improvement,
              and a willingness to adapt to change in order to stay ahead in the
              market and meet client's needs. 
            </Card>
          </div>
          <div
            className={style.starStack2}
            // style={{ transform: `translate(${width / 4}px)` }}
          >
            {StarStack}
            <Card>
              <b>Collaboration: </b>Fostering teamwork, communication, and
              mutual respect among employees, partners, and stakeholders to
              achieve common goals and drive success collectively. 
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};

const Card = ({ children }) => {
  return (
    <div className={style.card}>
      <img
        src={require("../../../assets/aboutus/OrangeCommas.png")}
        alt=""
      ></img>
      <div className={style.cardContent}>{children}</div>
    </div>
  );
};

export default OurCoreValues;
