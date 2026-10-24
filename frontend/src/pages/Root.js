import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/Layout/Header/Header";
import style from "./Root.module.css";
import {
  MainHeaderLinks,
  MainDropdownLinks,
  JoinUsBarData,
  KnowledgeHubHeaderLinks,
  footerLinks,
  quickLinks,
  ContactUs,
  buttonsLinks,
} from "../data/NavData";
import Footer from "../components/Layout/Footer/Footer";
import JoinUs from "../components/JoinUs/JoinUs";
import ComingSoon from "../UI/ComingSoon/ComingSoon";
import { useDispatch, useSelector } from "react-redux";
import Message from "../UI/Popup/Message";
import { clearMessage } from "../store/MessageDisplay/MessageActions";

const hideHeaderRoutes = [
  "/educationalDetails",
  "/educationaldetails",
  "/companydetails",
  // "/dashboard",
  // "/dashboard/courses",
  // "/dashboard/internships",
  // "/dashboard/helpAndSupport",
  // "/dashboard/settings",
  // "/forgetPassword",
  // "/resetPassword",
].map((route) => route.replace(/\/+$/, ""));

const RootLayout = () => {
  const location = useLocation();
  const { email, otp } = useParams();
  const { isVRPIUserLoggedIn } = useSelector((state) => state.login);

  const { message, type, dontClose, time } = useSelector(
    (state) => state.message
  );
  const dispatch = useDispatch();

  const handleErrorClose = () => {
    dispatch(clearMessage());
  };

  const dashboardLink = {
    name: "Dashboard",
    link: "/dashboard",
    active: isVRPIUserLoggedIn,
  };
  // useEffect(() => {
  //   if (isVRPIUserLoggedIn && userId) {
  //     console.log(isVRPIUserLoggedIn);
  //   }
  // }, [isVRPIUserLoggedIn, userId]);

  const isHeaderHidden = hideHeaderRoutes.some((route) => {
    const normalizedPath = location.pathname.replace(/\/+$/, ""); // Remove trailing slashes from the current path
    return normalizedPath.endsWith(route);
  });

  const shouldRenderHeader = email === undefined || otp === undefined;

  const headerLinks =
    location.pathname === "/edutech" ||
    location.pathname === "/internships" ||
    location.pathname === "/terms-and-conditions"
      ? KnowledgeHubHeaderLinks
      : MainHeaderLinks;

  const dropdownLinks =
    location.pathname === "/edutech" ||
    location.pathname === "/internships" ||
    location.pathname === "/terms-and-conditions"
      ? null
      : MainDropdownLinks;

  return (
    <div className={style.root}>
      <ComingSoon />

      {shouldRenderHeader && !isHeaderHidden && (
        <Header
          links={headerLinks}
          dashboard={dashboardLink}
          buttons={!isVRPIUserLoggedIn ? buttonsLinks : []}
          dropdownLinks={dropdownLinks}
          JoinUsBarData={JoinUsBarData}
        />
      )}
      <main
        className={`${style.main} ${isHeaderHidden && style.noMargin} ${
          !shouldRenderHeader && style.noMargin
        }`}
      >
        {message && (
          <Message
            message={message}
            type={type}
            onClose={handleErrorClose}
            dontClose={dontClose}
            time={time || 4000}
          />
        )}
        <Outlet />
      </main>
      {shouldRenderHeader && !isHeaderHidden && <JoinUs />}
      {shouldRenderHeader && !isHeaderHidden && (
        <Footer
          links={footerLinks}
          quickLinks={quickLinks}
          ContactUs={ContactUs}
          JoinUsBarData={JoinUsBarData}
        />
      )}
    </div>
  );
};

export default RootLayout;
