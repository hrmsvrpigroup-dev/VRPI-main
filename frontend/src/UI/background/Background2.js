import style from "./Background2.module.css";

const Background2 = () => {
  return (
    <div className={style.container}>
      <img
        src={require("../../assets/background2.png")}
        alt="Background2"
        className={style.background2}
      ></img>
    </div>
  );
};

export default Background2;
