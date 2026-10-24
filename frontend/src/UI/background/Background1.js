import style from "./Background1.module.css";
import background1 from "../../assets/Background1.png";
const Background1 = () => {
  return (
    <div className={style.container}>
      <img
        className={style.background1}
        src={background1}
        alt="Background"
      ></img>
    </div>
  );
};

export default Background1;
