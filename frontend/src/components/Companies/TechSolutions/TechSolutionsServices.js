import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./TechSolutionsServices.module.css";
import TechSolutionsHeader from "./TechSolutionsHeader";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Services images
import imgMobile from "../../../assets/companies/tech_service_mobile.png";
import imgWeb from "../../../assets/companies/tech_service_web.png";
import imgSoftware from "../../../assets/companies/tech_service_software.png";
import imgMarketing from "../../../assets/companies/tech_service_marketing.png";
import imgRent from "../../../assets/companies/tech_service_rent.png";
import imgEdutech from "../../../assets/companies/tech_service_edutech.png";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

const services = [
  {
    img: imgMobile,
    title: "Mobile Applications",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgWeb,
    title: "Web Solutions",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgSoftware,
    title: "Custom Software Solution",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgMarketing,
    title: "Digital Marketing",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgRent,
    title: "Rent-a-desk",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgEdutech,
    title: "Edu-Tech",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
];

const TechSolutionsServices = () => {
  const navigate = useNavigate();

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
      <TechSolutionsHeader activeTab="services" />

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
          <h2 className={style.accentTitle}>Services We Provide</h2>
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

export default TechSolutionsServices;
