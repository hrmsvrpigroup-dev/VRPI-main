import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./FinancialServicesSubPage.module.css";
import logo from "../../../assets/vrpiLogo.png";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Service image imports
import imgLifeIns       from "../../../assets/financial/svc_life_insurance.png";
import imgHealthIns     from "../../../assets/financial/svc_health_insurance.png";
import imgVehicleIns    from "../../../assets/financial/svc_vehicle_insurance.png";
import imgHomeLoans     from "../../../assets/financial/svc_home_loans.png";
import imgMortgage      from "../../../assets/financial/svc_mortgage_loans.png";
import imgStartup       from "../../../assets/financial/svc_startup_loans.png";
import imgEducation     from "../../../assets/financial/svc_education_loan.png";
import imgStudentLoan   from "../../../assets/financial/svc_student_loan.png";
import imgCapitalRest   from "../../../assets/financial/svc_capital_restructuring.png";
import imgTreasuryInst  from "../../../assets/financial/svc_treasury_instructions.png";
import imgPortfolioMgmt from "../../../assets/financial/svc_portfolio_management.png";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

// Icons
import {
  IoSearch,
  IoPersonCircleOutline,
} from "react-icons/io5";

/* ── Services Cards Data ────────────────────────────────────── */
const services = [
  {
    img: imgStudentLoan,
    title: "Student Loan",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgStartup,
    title: "Startup Loans",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgEducation,
    title: "Education Loan",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgLifeIns,
    title: "Life Insurance",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgHealthIns,
    title: "Health Insurance",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgVehicleIns,
    title: "Vehicle Insurance",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgHomeLoans,
    title: "Home Loans",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgMortgage,
    title: "Mortgage Loans",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgCapitalRest,
    title: "Capital Restructuring",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgTreasuryInst,
    title: "Treasury /Deft Instructions",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgPortfolioMgmt,
    title: "Portfolio Management",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
];

const FinancialServicesSubPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
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
              <span className={style.navLink} onClick={() => navigate("/financial-services")}>
                Home
              </span>
              <span className={style.navLink} onClick={() => navigate("/financial-services/about")}>
                About Us
              </span>
              <span className={style.navLink + " " + style.activeLink} onClick={() => navigate("/financial-services/services")}>
                Services
              </span>
              <span className={style.navLink} onClick={() => navigate("/financial-services/contact")}>
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

      {/* ── BREADCRUMB ───────────────────────────────── */}
      <section className={style.breadcrumbSection}>
        <div className={style.breadcrumbTitle}>
          <span className={style.orangeLetter}>S</span>ervices
        </div>
        <div className={style.breadcrumbPath}>
          Home / <span className={style.orangePath}>Services</span>
        </div>
      </section>

      {/* ── SERVICES WE PROVIDE ──────────────────────── */}
      <section className={style.servicesSection}>
        <div className={style.servicesHeaderAccent}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.accentTitle}>All Banking Services We Provide</h2>
        </div>

        <div className={style.servicesGrid}>
          {services.map((s, idx) => (
            <div className={style.serviceCard} key={idx}>
              <div className={style.serviceCardImgWrap}>
                <img src={s.img} alt={s.title} className={style.serviceCardImg} />
              </div>
              <div className={style.serviceCardBody}>
                <h3 className={style.serviceCardTitle}>{s.title}</h3>
                <p className={style.serviceCardDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOIN OUR COMMUNITY BANNER ────────────────── */}
      <section
        className={style.joinCommunitySection}
        style={{ backgroundImage: `url(${joinUsBg})` }}
      >
        <div className={style.joinOverlay} />
        
        <div className={style.joinContent}>
          <h2 className={style.joinTitle}>Join Our Community</h2>
          
          <form className={style.subscribeForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter email address"
              required
              className={style.subscribeInput}
            />
            <button type="submit" className={style.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer
        links={footerLinks}
        quickLinks={quickLinks}
        ContactUs={ContactUs}
        JoinUsBarData={JoinUsBarData}
      />
    </div>
  );
};

export default FinancialServicesSubPage;
