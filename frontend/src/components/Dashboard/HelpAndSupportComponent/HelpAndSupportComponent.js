import CustomImage from "../../../UI/Image/Image";
import style from "./HelpAndSupportComponent.module.css";

const HelpAndSupportComponent = () => {
  return (
    <div className={style.container}>
      <CustomImage
        src={require(`../../../assets/dashboard/ContactUsImage.png`)}
        alt=""
      />
      <h1 className={style.note}>
        Facing any issues? Please do reach out to{" "}
        <span className={style.email}>support@vrpigroup.com</span>
      </h1>
    </div>
  );
};

export default HelpAndSupportComponent;
