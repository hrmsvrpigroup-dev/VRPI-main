import { useSelector } from "react-redux";
import CustomImage from "../../../UI/Image/Image";
import { url } from "../../../constants";
import styles from "./ProfilePic.module.css";
import { useEffect, useState } from "react";
import UserDataComponent from "../../../data/user";
import { CircularProgress } from "@material-ui/core";
const ProfilePic = ({
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  title,
  classForDiv,
  containerClass,
  LoadingColor,
}) => {
  const userId = useSelector((state) => state.login.userId);

  const FetchUserData = UserDataComponent();

  const [Submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (FetchUserData.userData?.user) {
      setSubmitted(FetchUserData.userData?.user.profilePic !== null);
    }
  }, [FetchUserData.userData]);

  const handleImageError = (event) => {
    event.target.src = "../../../../assets/dashboard/profilePic.png"; // Replace with URL of default profile picture
  };

  return (
    <div
      className={`${containerClass}`}
      style={
        containerClass
          ? null
          : {
              width: "100%",
              height: "100%",
            }
      }
    >
      {FetchUserData.isLoading ? (
        <CircularProgress style={{ color: LoadingColor }} />
      ) : (
        <>
          {Submitted ? (
            <CustomImage
              src={`${url.backendBaseUrl}/vrpi-user/get-image/profilePic/${userId}`}
              alt=""
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              title={title}
              onError={handleImageError}
              className={`${className} ${styles.image}`}
              classForDiv={`${classForDiv}`}
              style={style}
            />
          ) : (
            <CustomImage
              src={require(`../../../assets/dashboard/profilePic.png`)}
              alt=""
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              title={title}
              onError={handleImageError}
              className={`${className} ${styles.image}`}
              classForDiv={`${classForDiv}`}
              style={style}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePic;
