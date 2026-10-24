import Section from "../../../UI/Sections/Section";
import SwipeablePictures from "../../../UI/SwipeablePictures/SwipeablePictures";
import CountDownAnimation from "../../../animations/CountDownAnimation/CountDownAnimation";
import style from "./MainSection.module.css";

const NumberItem = ({ endNumber, time, section }) => (
  <div className={style.numberItem}>
    <span>
      <CountDownAnimation endNumber={endNumber} time={time} />+
    </span>
    <h2>{section}</h2>
  </div>
);

const MainScreen = () => {
  return (
    <div className={style.MainScreen}>
      <SwipeablePictures />
      <div className={style.numbers}>
        <NumberItem endNumber={"1000"} time={"3"} section="Happy Customers" />
        <NumberItem endNumber={"300"} time={"5"} section="Projects Completed" />
        <NumberItem endNumber={"40"} time={"5.2"} section="Team Support" />
        <NumberItem endNumber={"3"} time={"6"} section="Global Countries" />
      </div>
    </div>
  );
};

export default MainScreen;
