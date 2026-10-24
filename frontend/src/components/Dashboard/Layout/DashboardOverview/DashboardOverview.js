import { useEffect, useState } from "react";
import CustomImage from "../../../../UI/Image/Image";
import style from "./DashboardOverview.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/LoginStateActions";
import ConfirmationModal from "../../../../UI/ConfirmModel/ConfirmationModal";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../../constants";
import ProfilePic from "../../ProfilePic/ProfilePic";

const DashboardOverview = ({
  userDetails,
  children,
  toggleMenuBar,
  DashboardLinks,
}) => {
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hideDropdown, setHideDropdown] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (!showProfileDropDown) {
      timeoutId = setTimeout(() => {
        setHideDropdown(true);
      }, 300);
    } else {
      setHideDropdown(false);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showProfileDropDown]);

  const handleLogout = () => {
    setShowProfileDropDown(!showProfileDropDown);
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/login");
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };
  const userId = useSelector((state) => state.login.userId);
  return (
    <div className={style.mainContainer}>
      <div className={style.overviewContainer}>
        <div className={style.menuIcon} onClick={toggleMenuBar}>
          <div className={style.bar1}></div>
          <div className={style.bar2}></div>
          <div className={style.bar3}></div>
        </div>
        <h2 className={style.barTitle}>
          {DashboardLinks.find((link) => link.link === pathname)?.title}
        </h2>

        <div className={style.overviewContents}>
          {userDetails && (
            <div className={style.userDetails}>
              <span className={style.userName}>
                {userDetails.firstName} {userDetails.lastName}
              </span>
              <span className={style.userId}>#{userId}</span>
            </div>
          )}
          {/* <CustomImage
            src={require("../../../../assets/dashboard/notificationIcon.png")}
            alt=""
            style={{ cursor: "pointer" }}
          /> */}
          {userDetails && (
            <div className={style.profilePic}>
              {/* <CustomImage
                // src={require(`../../../../assets/dashboard/${
                //   userDetails.profilePic || "profilePic.png"
                // }`)}
                src={`${url.backendBaseUrl}/vrpi-user/get-image/profilePic/${userId}`}
                alt=""
                onMouseEnter={() => setShowProfileDropDown(true)}
                onMouseLeave={() => setShowProfileDropDown(false)}
              /> */}

              <ProfilePic
                onMouseEnter={() => setShowProfileDropDown(true)}
                onMouseLeave={() => setShowProfileDropDown(false)}
              />
              {/* <CustomImage
                src={require(`../../../../assets/dashboard/${
                  userDetails.profilePic || "profilePic.png"
                }`)}
                alt=""
                onMouseEnter={() => setShowProfileDropDown(true)}
                onMouseLeave={() => setShowProfileDropDown(false)}
              /> */}
            </div>
          )}
        </div>

        {!hideDropdown && (
          <div
            onMouseEnter={() => setShowProfileDropDown(true)}
            onMouseLeave={() => setShowProfileDropDown(false)}
            className={`${style.dropdown} ${
              showProfileDropDown && style.showDropdown
            }`}
          >
            <div
              className={style.options}
              onClick={() => {
                setShowProfileDropDown(!showProfileDropDown);
                navigate("/dashboard/studentProfile");
              }}
            >
              <span>Profile</span>
            </div>
            <div className={style.options} onClick={handleLogout}>
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={logoutModalOpen}
        onRequestClose={closeLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={closeLogoutModal}
      />

      <div className={style.contents} key={pathname}>
        {children}
      </div>
    </div>
  );
};

export default DashboardOverview;
