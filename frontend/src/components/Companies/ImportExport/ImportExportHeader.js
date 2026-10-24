import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./ImportExportHeader.module.css";
import logo from "../../../assets/vrpiLogo.png";

// Icons
import {
  IoSearch,
  IoPersonCircleOutline,
} from "react-icons/io5";

const ImportExportHeader = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <header className={style.customHeader}>
      {/* Left Column: Logo */}
      <div className={style.headerLeft}>
        <img
          src={logo}
          alt="VRPI Logo"
          onClick={() => navigate("/")}
          title="Back to Home"
          className={style.headerLogo}
        />
      </div>

      {/* Right Column: Top Socials, Bottom Skewed Nav Banner */}
      <div className={style.headerRight}>
        <div className={style.joinUsBar}>
          <span className={style.joinUsLabel}>Join Us Via</span>
          <div className={style.socialIcons}>
            <a href="https://wa.link/lj2wfw" target="_blank" rel="noopener noreferrer">
              <img src={require("../../../assets/socialMediaIcons/WhatsApp.png")} alt="WhatsApp" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={require("../../../assets/socialMediaIcons/TwitterX.png")} alt="Twitter X" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={require("../../../assets/socialMediaIcons/YouTube.png")} alt="YouTube" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={require("../../../assets/socialMediaIcons/Email.png")} alt="Email" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={require("../../../assets/socialMediaIcons/Facebook.png")} alt="Facebook" />
            </a>
            <a href="https://www.linkedin.com/company/vr-pi-tech-solutions-llp-in/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <img src={require("../../../assets/socialMediaIcons/LinkedIn.png")} alt="LinkedIn" />
            </a>
            <a href="https://www.instagram.com/sandeepkumar.pikili/" target="_blank" rel="noopener noreferrer">
              <img src={require("../../../assets/socialMediaIcons/Instagram.png")} alt="Instagram" />
            </a>
          </div>
        </div>

        <div className={style.skewedNavContainer}>
          <nav className={style.navLinks}>
            <span
              className={`${style.navLink} ${activeTab === "home" ? style.activeLink : ""}`}
              onClick={() => navigate("/imports-exports")}
            >
              Home
            </span>
            <span
              className={`${style.navLink} ${activeTab === "about" ? style.activeLink : ""}`}
              onClick={() => navigate("/imports-exports/about")}
            >
              About Us
            </span>
            <span
              className={`${style.navLink} ${activeTab === "services" ? style.activeLink : ""}`}
              onClick={() => navigate("/imports-exports/services")}
            >
              Services
            </span>
            <span
              className={`${style.navLink} ${activeTab === "contact" ? style.activeLink : ""}`}
              onClick={() => navigate("/imports-exports/contact")}
            >
              Contact Us
            </span>
          </nav>

          <div className={style.navIcons}>
            <span className={style.navIcon}>
              <IoSearch />
            </span>
            <span className={style.navIcon} onClick={() => navigate("/login")}>
              <IoPersonCircleOutline />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ImportExportHeader;
