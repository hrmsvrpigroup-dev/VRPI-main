import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import style from "./SwipeablePicture.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import HighlightCapsWords from "../HighlightWords/HighlightCapsWords";
import Title from "../Title/Title";
import CustomImage from "../Image/Image";
const mainScreenDetails = [
  {
    content: [
      "VR Pi Group of Companies is a dynamic conglomerate specializing in cutting-edge technology solutions, innovative construction and infrastructure projects, and seamless import-export services.",
    ],
    head: "VR Pi",
    image: "mainScreen1.png",
    link: "about",
  },
  {
    head: "Edu-Tech",
    content: [
      "Embarking on an innovative journey, our VR Pi group of companies intertwines with the realm of Edu-Tech, forging new pathways in immersive education experiences.",
    ],
    image: "mainScreen2.png",
    link: "edutech",
  },
  {
    head: "Internships",
    content: [
      "As our VR Pi group of companies aligns with the future, we proudly extend opportunities for immersive Internships, fostering the next generation of visionary talent.",
      "At VR Pi Group of Companies, we stand at the forefront of creativity and superiority across numerous categories, we drive growth and create lasting value for our partners and communities worldwide.",
    ],
    image: "mainScreen3.png",
    link: "internships",
  },
];

const useStyles = makeStyles({
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
});

const SwipeablePictures = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % mainScreenDetails.length);
  };

  const handlePrevious = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + mainScreenDetails.length) % mainScreenDetails.length
    );
  };

  return (
    <div className={style.imageContainer}>
      <SwipeableViews index={index} enableMouseEvents>
        {mainScreenDetails.map((screen, idx) => (
          <div key={Math.random()} className={classes.slide}>
            <div className={style.contentContainer}>
              {screen.content.map((content) => (
                <Title
                  key={Math.random()}
                  title={content}
                  highlightWord={screen.head}
                  styles={{
                    border: "0px solid",
                    fontSize: width > breakpoint ? "1.5rem" : "1rem",
                    color: "white",
                    padding: "0",
                    display: "inline",
                    textAlign: "center",
                  }}
                ></Title>
              ))}
              <Button onClick={() => navigate(screen.link)}>
                Explore More
              </Button>
            </div>
            <img
              src={require(`../../assets/home/${screen.image}`)}
              alt={`Pictures ${idx + 1}`}
              className={style.image}
            />
          </div>
        ))}
      </SwipeableViews>
      <div className={style.controls}>
        <img
          onClick={handlePrevious}
          src={require(`../../assets/previousIcon.png`)}
          alt="icon"
        ></img>

        <img
          src={require(`../../assets/nextIcon.png`)}
          onClick={handleNext}
          alt="icon"
        ></img>
      </div>
    </div>
  );
};

export default SwipeablePictures;
