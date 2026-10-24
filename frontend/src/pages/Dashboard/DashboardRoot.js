import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./DashboardRoot.module.css";
import DashboardHeader from "../../components/Dashboard/Layout/Header/DashboardHeader";
import DashboardOverview from "../../components/Dashboard/Layout/DashboardOverview/DashboardOverview";
import UserDataComponent from "../../data/user";
import { logout } from "../../store/LoginStateActions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../UI/ConfirmModel/ConfirmationModal";
import { CircularProgress } from "@material-ui/core";
import Header from "../../components/Layout/Header/Header";
import {
  MainHeaderLinks,
  MainDropdownLinks,
  JoinUsBarData,
} from "../../data/NavData";

const DashboardRoot = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isVRPIUserLoggedIn } = useSelector((state) => state.login);

  useEffect(() => {
    if (!isVRPIUserLoggedIn) {
      navigate("/login");
    }
  }, [isVRPIUserLoggedIn, navigate]);

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/login");
  };

  // const userData = UserDataComponent();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const DashboardLinks = [
    {
      title: "My Dashboard",
      link: "/dashboard",
      iconActive: "myDashboard-p.png",
      iconInActive: "myDashboard-w.png",
    },
    {
      title: "Edu-Tech Courses",
      link: "/dashboard/courses",
      iconActive: "edutech-p.png",
      iconInActive: "edutech-w.png",
    },
    {
      title: "Internship",
      link: "/dashboard/internships",
      iconActive: "internship-p.png",
      iconInActive: "internship-w.png",
    },
    {
      title: "Profile",
      link: "/dashboard/studentProfile",
      iconActive: "profileIcon-p.png",
      iconInActive: "profileIcon-w.png",
    },
    {
      title: "Purchase History",
      link: "/dashboard/purchaseHistory",
      iconActive: "purchaseHistory-p.png",
      iconInActive: "purchaseHistory-w.png",
    },
    // {
    //   title: "Settings",
    //   link: "/dashboard/settings",
    //   iconActive: "settings-p.png",
    //   iconInActive: "settings-w.png",
    // },
    {
      title: "Help & Support",
      link: "/dashboard/helpAndSupport",
      iconActive: "support-p.png",
      iconInActive: "support-w.png",
    },
    {
      title: "Logout",
      link: false,
      iconActive: "logout-p.png",
      iconInActive: "logout-w.png",
      action: handleLogout,
    },
  ];

  const [showMenuBar, setShowMenuBar] = useState(false);

  const toggleMenuBar = () => {
    setShowMenuBar(!showMenuBar);
  };



  useEffect(() => {
    const handleScrollLock = () => {
      if (showMenuBar) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    handleScrollLock();

    return () => {
      document.body.style.overflow = "auto"; // Reset overflow when component unmounts
    };
  }, [showMenuBar]);

  const FetchUserData = UserDataComponent(true);

  useEffect(() => {
    // dispatch(fetchUserData());
    if (FetchUserData.userData) {
      // console.log("userData", FetchUserData.userData.user);
    }
  }, [FetchUserData.userData]);

  return (
    <>
      <Header
        links={MainHeaderLinks}
        dashboard={{ name: "Dashboard", link: "/dashboard", active: true }}
        buttons={[]}
        dropdownLinks={MainDropdownLinks}
        JoinUsBarData={JoinUsBarData}
      />
      <div className={style.container}>
        <ConfirmationModal
          isOpen={logoutModalOpen}
          onRequestClose={closeLogoutModal}
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onConfirm={handleLogoutConfirm}
          onCancel={closeLogoutModal}
        />
        <DashboardHeader
          showMenuBar={showMenuBar}
          toggleMenuBar={toggleMenuBar}
          DashboardLinks={DashboardLinks}
        />
      {!FetchUserData.isLoading ? (
        <DashboardOverview
          userDetails={FetchUserData?.userData?.user}
          toggleMenuBar={toggleMenuBar}
          DashboardLinks={DashboardLinks}
        >
          <Outlet />
        </DashboardOverview>
      ) : (
        <div className={style.loadingState}>
          <CircularProgress />
        </div>
      )}
    </div>
    </>
  );
};

export default DashboardRoot;
