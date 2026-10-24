import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./FinancialAboutUs.module.css";
import logo from "../../../assets/vrpiLogo.png";
import imgGroup from "../../../assets/financial/consulting_team_group.png";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

// Icons
import {
  IoSearch,
  IoPersonCircleOutline,
  IoLogoLinkedin,
} from "react-icons/io5";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const FinancialAboutUs = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
      linkedin: "https://www.linkedin.com/",
    },
  ];

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
              <span className={style.navLink + " " + style.activeLink} onClick={() => navigate("/financial-services/about")}>
                About Us
              </span>
              <span className={style.navLink} onClick={() => navigate("/financial-services/services")}>
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
          <span className={style.orangeLetter}>A</span>BOUT
        </div>
        <div className={style.breadcrumbPath}>
          Home / <span className={style.orangePath}>About</span>
        </div>
      </section>

      {/* ── ABOUT VR PI GROUP ─────────────────────────── */}
      <section className={style.aboutGroupSection}>
        <div className={style.aboutGroupGrid}>
          {/* Left Text Column */}
          <div className={style.aboutGroupTextCol}>
            <div className={style.sectionHeaderAccent}>
              <span className={style.verticalOrangeLine} />
              <h2 className={style.accentTitle}>About VR Pi Group</h2>
            </div>
            
            <h3 className={style.largeIntroHeading}>
              We collaborate with you to tackle your top priorities.
            </h3>
            
            <p className={style.introParagraph}>
              <strong>“VR PI Group of Companies”</strong> thrives as a dynamic and forward-thinking
              enterprise, specializing in cutting-edge industry solutions. Our core emphasis
              on pioneering software technology ensures the delivery of top-tier services, all while
              nurturing a culture of creativity, inclusivity, and unwavering excellence. By upholding
              integrity, fostering innovation, and promoting collaboration, we aspire to propel growth,
              generate value, and effect positive change within our industry and wider community.
            </p>
          </div>

          {/* Right Image with overlay experience badge */}
          <div className={style.aboutGroupImgCol}>
            <div className={style.groupImageContainer}>
              <img src={imgGroup} alt="Consulting Group" className={style.groupImg} />
              
              <div className={style.experienceBadge}>
                <span className={style.expNum}>10+</span>
                <span className={style.expText}>
                  Years Experience<br />in Consulting.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ──────────────────────────── */}
      <section className={style.visionMissionSection}>
        <div className={style.visionMissionGrid}>
          <div className={style.visionCol}>
            <h3 className={style.vmTitle}>Our Vision</h3>
            <p className={style.vmText}>
              VR Pi Group of Companies is dedicated to delivering excellence across diverse sectors,
              striving to build a sustainable future through innovation, collaboration, and responsible
              business practices. Our mission is to consistently exceed expectations in construction &amp;
              infrastructure, financial services, management and consulting, food, imports and exports,
              and tech solutions.
            </p>
          </div>

          <div className={style.missionCol}>
            <h3 className={style.vmTitle}>Our Mission</h3>
            <p className={style.vmText}>
              We envision VR Pi Group of Companies as a global leader, driving positive change and
              creating lasting value in every industry we operate. Our vision is to be recognized for
              our unwavering commitment to quality, ethical business practices, and innovative solutions
              that contribute to the well-being of our stakeholders and the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONSULTING TEAM ───────────────────────────── */}
      <section className={style.teamSection}>
        <div className={style.teamHeaderAccent}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.accentTitle}>Our Consulting Team</h2>
        </div>

        <div className={style.teamGrid}>
          {team.map((t, idx) => (
            <div className={style.teamCard} key={idx}>
              <div className={style.avatarCircle}>
                {getInitials(t.name)}
              </div>
              <div className={style.teamCardText}>
                <h4 className={style.teamCardName}>{t.name}</h4>
                <span className={style.teamCardRole}>{t.role}</span>
              </div>
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={style.linkedinBtn}
                aria-label="LinkedIn"
              >
                <IoLogoLinkedin />
              </a>
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

export default FinancialAboutUs;
