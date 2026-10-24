import { useState } from "react";
import style from "./OurMission.module.css";
import Section from "../../../UI/Sections/Section";
import HideExtraText from "../../../UI/HideExtraText/HideExtraText";

const missionData = {
  vision: {
    content:
      "We see, The VR Pi Group of Companies as a global innovator that fosters advancement and delivers enduring value. Our vision is to be acknowledged for our relentless commitment to impeccable standards, ethical business strategies and innovative ideas that enhance the lives of the individuals we serve and our stakeholders.",
    image: "vision.png",
  },
  mission: {
    content:
      "The VR Pi Group of Companies is committed to offering brilliance beyond a range of Industries using Innovation, collaboration, and ethical business strategies to build a viable vision. In the arenas of nourishment, imports and exports, technological innovations, financial services, construction and infrastructure, management, and consulting. Our mission is to perpetually surpass client objectives.",
    image: "mission.png",
  },
};

const OurMission = () => {
  const [showVision, setShowVision] = useState(false);
  const [showMission, setShowMission] = useState(false);

  return (
    <Section title="Our Vision & Mission">
      <div className={style.container}>
        <ContentBlock
          data={missionData.vision}
          show={showVision}
          setShow={setShowVision}
        />
        <ContentBlock
          data={missionData.mission}
          show={showMission}
          setShow={setShowMission}
        />
      </div>
    </Section>
  );
};

const ContentBlock = ({ data, show, setShow }) => {
  return (
    <div
      className={`${style.contentBlock} `}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={`${style.content} ${show && style.show}`}>
        <InvertedCommas />
        <HideExtraText lines="6">{data.content}</HideExtraText>
      </div>
      <img
        src={require(`../../../assets/aboutus/${data.image}`)}
        alt=""
        className={style.image}
      />
    </div>
  );
};

const InvertedCommas = () => {
  return (
    <div className={style.invertedCommas}>
      <img src={require("../../../assets/aboutus/whiteCommas.png")} alt="" />
    </div>
  );
};

export default OurMission;
