import style from "./Background3.module.css";

const Background3 = ({ image }) => {
  return (
    <div className={style.Container}>
      <img
        src={require(`../../assets/${image}`)}
        alt="Backgorund 3"
        className={style.image}
      ></img>
    </div>
  );
};

export default Background3;
