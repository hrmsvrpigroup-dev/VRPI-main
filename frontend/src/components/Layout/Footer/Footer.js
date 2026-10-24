import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import style from "./Footer.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setComingSoon } from "../../../store/ComingSoonSlice";

const Footer = ({ links, quickLinks, ContactUs, JoinUsBarData }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 700;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // const handleClickingInActiveLink=()=>{
  //   dispatch(setComingSoon(true)
  // }

  const navElements = (
    <div className={style.navElements}>
      {links.map((link, index) => (
        <li key={index} className={style.element}>
          <NavLink
            to={link.address}
            title={`Link to ${link.name}`}
            className={({ isActive }) =>
              isActive
                ? `${style.active} ${style.mainNavLink}`
                : style.mainNavLink
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </div>
  );

  const QuickLinks = (
    <div className={style.navElements}>
      <p className={style.head}>Quick Links</p>
      {quickLinks.map((link, index) => (
        <li key={index} className={style.element}>
          {link.active ? (
            <NavLink
              to={link.address}
              onClick={handleScrollToTop}
              title={`Link to ${link.name}`}
              className={({ isActive }) =>
                isActive
                  ? `${style.active} ${style.mainNavLink}`
                  : style.mainNavLink
              }
              style={{ marginLeft: "1rem" }}
            >
              {link.name}
            </NavLink>
          ) : (
            <NavLink
              // to={link.address}
              onClick={() => dispatch(setComingSoon(true))}
              title={`Link to ${link.name}`}
              className={({ isActive }) =>
                isActive
                  ? `${style.active} ${style.mainNavLink}`
                  : style.mainNavLink
              }
              style={{ marginLeft: "1rem" }}
            >
              {link.name}
            </NavLink>
          )}
        </li>
      ))}
    </div>
  );

  const ContactUsSection = (
    <div className={style.contactUs}>
      <p className={style.head}>Contact Us</p>
      <div className={style.allContacts}>
        <div className={style.contact}>
          <img
            src={require("../../../assets/footer/Location.png")}
            alt=""
          ></img>
          {/* <p>{ContactUs.address}</p> */}
          <div>
            {ContactUs.address.map((addrr, index) => (
              <p style={{ marginBottom: "0.5rem" }} key={index}>
                {addrr}
              </p>
            ))}
          </div>
        </div>
        <div className={style.contact}>
          <img src={require("../../../assets/footer/Call.png")} alt=""></img>
          <p>{ContactUs.phoneNumber}</p>
        </div>
        <div className={style.contact}>
          <img src={require("../../../assets/footer/Email.png")} alt=""></img>
          <p>{ContactUs.infoEmailId}</p>
        </div>
      </div>
    </div>
  );

  const JoinUsBar = (
    <div className={style.joinUsBar}>
      <p className={style.head}>Join Us Via</p>
      <ul>
        {JoinUsBarData.socialMediaIcons.map((icon, index) => (
          <li key={index}>
            <a href={icon.address} target="_blank" rel="noopener noreferrer">
              <img
                src={require(`../../../assets/socialMediaIcons/${icon.src}`)}
                alt={icon.alt}
              ></img>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const lowerBar = (
    <div className={style.lowerBar}>
      <p>Copyright &copy; 2021 VR PI Group - All Rights Reserved</p>
      <p>Powered by VR PI Group of Companies</p>
    </div>
  );

  return (
    <div className={style.container}>
      <div className={style.brand}>
        <Logo className={style.logo} />
        <div className={style.tagLine}>
          <h1>“Like TATA...... </h1>
          <h1>Like VR PI.......”</h1>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div className={style.Footer}>
          {width < breakpoint ? (
            <>
              <div className={style.navAndQuick}>
                {/* {navElements} */}
                {QuickLinks}
              </div>
              <div className={style.contactAndJoin}>
                {ContactUsSection}
                {JoinUsBar}
              </div>
            </>
          ) : (
            <>
              {/* {navElements} */}
              {QuickLinks}
              {ContactUsSection}
              {JoinUsBar}
            </>
          )}
        </div>
        {lowerBar}
      </div>
    </div>
  );
};
export default Footer;
