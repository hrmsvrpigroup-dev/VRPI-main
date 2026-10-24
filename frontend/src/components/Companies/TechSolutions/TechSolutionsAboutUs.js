import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./TechSolutionsAboutUs.module.css";
import TechSolutionsHeader from "./TechSolutionsHeader";

// Image imports
import imgGroup from "../../../assets/companies/construction_about_group.png";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

// Icons
import { IoLogoLinkedin } from "react-icons/io5";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const TechSolutionsAboutUs = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
    },
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
    },
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
    },
    {
      name: "Gayatri Meena Kumar",
      role: "Security Manager",
    },
  ];

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
      <TechSolutionsHeader activeTab="about" />

      {/* ── BREADCRUMB ───────────────────────────────── */}
      <section className={style.breadcrumbSection}>
        <div className={style.breadcrumbTitle}>
          <span className={style.orangeLetter}>A</span>BOUT
        </div>
        <div className={style.breadcrumbPath}>
          Home / <span className={style.orangePath}>About</span>
        </div>
      </section>

      {/* ── ABOUT VR PI GROUP ────────────────────────── */}
      <section className={style.aboutIntroSection}>
        <div className={style.aboutIntroGrid}>
          {/* Column 1: Intro Text */}
          <div className={style.introTextCol}>
            <div className={style.sectionHeaderAccent}>
              <span className={style.verticalOrangeLine} />
              <h2 className={style.accentTitle}>About VR Pi Group</h2>
            </div>
            
            <h3 className={style.introTitle}>
              We collaborate with you to tackle your top priorities.
            </h3>
            
            <p className={style.introBodyText}>
              <strong>"VR PI Group of Companies"</strong> thrives as a dynamic and forward-thinking enterprise, specializing in cutting-edge industry solutions. Our core emphasis on pioneering software technology ensures the delivery of top-tier services, all while nurturing a culture of creativity, inclusivity, and unwavering excellence. By upholding integrity, fostering innovation, and promoting collaboration, we aspire to propel growth, generate value, and effect positive change within our industry and wider community.
            </p>
          </div>

          {/* Column 2: Visual with badge */}
          <div className={style.introImgCol}>
            <div className={style.imgContainer}>
              <img src={imgGroup} alt="Team Discussion" className={style.introGroupImg} />
              
              <div className={style.experienceOverlay}>
                <span className={style.expYears}>10+</span>
                <span className={style.expLabel}>Years Experience<br />in Consulting.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ─────────────────────────── */}
      <section className={style.visionMissionSection}>
        <div className={style.visionMissionGrid}>
          {/* Vision */}
          <div className={style.visionCol}>
            <h3 className={style.visionTitle}>Our Vision</h3>
            <p className={style.visionText}>
              VR Pi Group of Companies is dedicated to delivering excellence across diverse sectors,
              striving to build a sustainable future through innovation, collaboration, and responsible
              business practices. Our mission is to consistently exceed expectations in construction &
              infrastructure, financial services, management and consulting, food, imports and exports,
              and tech solutions.
            </p>
          </div>

          {/* Mission */}
          <div className={style.missionCol}>
            <h3 className={style.missionTitle}>Our Mission</h3>
            <p className={style.missionText}>
              We envision VR Pi Group of Companies as a global leader, driving positive change and
              creating lasting value in every industry we operate. Our vision is to be recognized for
              our unwavering commitment to quality, ethical business practices, and innovative solutions
              that contribute to the well-being of our stakeholders and the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONSULTING TEAM ──────────────────────────── */}
      <section className={style.teamSection}>
        <div className={style.sectionHeaderAccent}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.accentTitle}>Our Consulting Team</h2>
        </div>

        <div className={style.teamGrid}>
          {team.map((member, idx) => (
            <div className={style.teamCard} key={idx}>
              <div className={style.avatarCircle}>
                {getInitials(member.name)}
              </div>
              <div className={style.teamOverlayText}>
                <h4 className={style.memberName}>{member.name}</h4>
                <p className={style.memberRole}>{member.role}</p>
              </div>
              <a href="#" className={style.linkedinBtn}>
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

export default TechSolutionsAboutUs;
