import { useNavigate } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import Section from "../../../UI/Sections/Section";
import style from "./AboutUsSection.module.css";
import CustomImage from "../../../UI/Image/Image";
const AboutUsSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Section title="About Us">
        <div className={style.AboutUsSection}>
          <div className={style.image1}>
            <CustomImage
              src={require(`../../../assets/home/aboutUsSection1.png`)}
              alt=""
            ></CustomImage>
          </div>
          <div className={style.content}>
            <p>
              “
              <span style={{ color: "#ff6501", fontWeight: "600" }}>
                VR PI Group of Companies
              </span>
              ” thrives as a dynamic and forward-thinking enterprise,
              specializing in cutting-edge industry solutions. Our core emphasis
              on pioneering software technology ensures the delivery of top-tier
              services, all while nurturing a culture of creativity,
              inclusivity, and unwavering excellence. By upholding integrity,
              fostering innovation, and promoting collaboration, we aspire to
              propel growth, generate value, and effect positive change within
              our industry and wider community."
            </p>
            <Button
              className={style.exploreBtn}
              onClick={() => navigate("/about")}
            >
              Explore Us
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AboutUsSection;
