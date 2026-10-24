import CustomImage from "../../UI/Image/Image";
import style from "./SignUpOrLoginContainer.module.css";

const SignUpOrLoginContainer = ({
  screenData,
  children,
  classForMainContent,
}) => {
  return (
    <div className={style.container}>
      <div className={style.frame}>
        <div className={style.content}>
          <h1>{screenData.title}</h1>
          <p>{screenData.description}</p>
        </div>
        <CustomImage
          src={require(`../../assets/login-signup/${screenData.image}`)}
          alt=""
          classForDiv={style.screenImage}
        />
      </div>
      <div className={`${style.mainContent} ${classForMainContent}`}>
        {children}
      </div>
    </div>
  );
};

export default SignUpOrLoginContainer;
