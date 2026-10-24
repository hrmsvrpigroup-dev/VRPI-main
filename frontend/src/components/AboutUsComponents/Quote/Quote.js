import style from "./Quote.module.css";

const Quote = () => {
  return (
    <div className={style.card}>
      <img
        src={require("../../../assets/aboutus/OrangeCommas.png")}
        alt=""
      ></img>
      <div className={style.cardContent}>
        <h1>
          Creating a milestone for others is not an easy task, but when you made
          it, you will become a role model to others
        </h1>
        <p>-Sandeep Kumar Pikili (Founder of VR Pi Group of Companies)</p>
      </div>
    </div>
  );
};

export default Quote;
