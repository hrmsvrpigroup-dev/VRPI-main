import style from "./ImgSpinner.module.css";

const ImgSpinner = ({ address }) => {
  return (
    <div className={style.container}>
      <div className={style.circularFrame}>
        <img src={require(`../assets/${address}`)} alt="img"></img>
      </div>
    </div>
  );
};

export default ImgSpinner;
