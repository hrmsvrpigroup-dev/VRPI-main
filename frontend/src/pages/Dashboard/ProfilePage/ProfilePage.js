import ProfileBanner from "../../../components/Dashboard/ProfileComponents/ProfileBanner/ProfileBanner";
import ProfileDetailsSection from "../../../components/Dashboard/ProfileComponents/ProfileDetailsSection/ProfileDetailsSection";
import UserDataComponent from "../../../data/user";
import { CircularProgress } from "@material-ui/core";

import style from "./ProfilePage.module.css";
import { useEffect } from "react";

const ProfilePage = () => {
  // const userData = UserDataComponent();
  // const userData = useSelector((state) => state.userData.userData);
  const FetchUserData = UserDataComponent();

  useEffect(() => {
    if (FetchUserData.userData?.user) {
      document.title = `${FetchUserData.userData.user.firstName} - Profile Page`;
    }
  });
  return (
    <>
      {FetchUserData.isLoading ? (
        <div className={style.loadingState}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <ProfileBanner user={FetchUserData.userData?.user} />
          <ProfileDetailsSection user={FetchUserData.userData} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
