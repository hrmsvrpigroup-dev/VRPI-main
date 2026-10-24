import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./ManagementConsultingServices.module.css";
import ManagementConsultingHeader from "./ManagementConsultingHeader";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Services images
import imgRoc from "../../../assets/companies/mc_service_roc.png";
import imgTcon from "../../../assets/companies/mc_service_tcon.png";
import imgGst from "../../../assets/companies/mc_service_gst.png";
import imgAuditing from "../../../assets/companies/mc_service_auditing.png";
import imgTax from "../../../assets/companies/mc_service_tax.png";
import imgAssessment from "../../../assets/companies/mc_service_assessment.png";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

const services = [
  {
    img: imgRoc,
    title: "ROC",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgTcon,
    title: "T Consulting",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgGst,
    title: "GST Management",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgAuditing,
    title: "Auditing Book Keeping",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgTax,
    title: "Tax Savings",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgAssessment,
    title: "Assessment (IT/GST)",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
];

const ManagementConsultingServices = () => {
  const navigate = useNavigate();

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
      <ManagementConsultingHeader activeTab="services" />

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

export default ManagementConsultingServices;
