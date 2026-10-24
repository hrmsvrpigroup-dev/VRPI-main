import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./ImportExportServices.module.css";
import ImportExportHeader from "./ImportExportHeader";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Services images
import imgIE from "../../../assets/companies/ie_service_ie.png";
import imgLogistics from "../../../assets/companies/ie_service_logistics.png";
import imgConsultants from "../../../assets/companies/ie_service_consultants.png";
import imgAir from "../../../assets/companies/ie_service_air.png";
import imgIntl from "../../../assets/companies/ie_service_intl.png";
import imgCustoms from "../../../assets/companies/ie_service_customs.png";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

const services = [
  {
    img: imgIE,
    title: "Imports & Exports",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgLogistics,
    title: "Logistics",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgConsultants,
    title: "Import Export Consultants",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgAir,
    title: "Air Cargo Agents",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgIntl,
    title: "International Cargo Agents",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgCustoms,
    title: "Customs & Clearance Handling",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
];

const ImportExportServices = () => {
  const navigate = useNavigate();

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
      <ImportExportHeader activeTab="services" />

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

export default ImportExportServices;
