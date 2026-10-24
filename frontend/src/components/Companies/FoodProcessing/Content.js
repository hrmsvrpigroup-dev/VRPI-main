import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./FoodProcessingContent.module.css";
import FoodProcessingHeader from "./FoodProcessingHeader";

// Images
import heroBg from "../../../assets/companies/foodProcessing2.webp";
import whyChooseImg from "../../../assets/companies/fp_why_choose.png";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Services images
import imgCapital from "../../../assets/companies/fp_service_capital.png";
import imgInsurance from "../../../assets/companies/fp_service_insurance.png";
import imgBlockchain from "../../../assets/companies/fp_service_blockchain.png";
import imgTech from "../../../assets/companies/fp_service_tech.png";
import imgFinance from "../../../assets/companies/fp_service_finance.png";
import imgPortfolio from "../../../assets/companies/fp_service_portfolio.png";

// Icons
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoTrendingUpOutline,
  IoGitBranchOutline,
  IoTrendingDownOutline,
} from "react-icons/io5";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

const services = [
  {
    img: imgCapital,
    title: "Capital Markets",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgInsurance,
    title: "Insurance",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgBlockchain,
    title: "Blockchain",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgTech,
    title: "Technology Advisory",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgFinance,
    title: "Finance & Risk",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgPortfolio,
    title: "Portfolio Management",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgTech,
    title: "Technology Advisory",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgFinance,
    title: "Finance & Risk",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgPortfolio,
    title: "Portfolio Management",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
];

const Content = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Food Processing",
      desc: "We are boutique firm designed for Private Equity, Family Offices, and Growth-Stage Companies seeking to maximize results.",
      bg: heroBg,
    },
    {
      title: "Quality & Safety",
      desc: "Harnessing cutting-edge technology and industry expertise to optimize food production, safety, and supply chains globally.",
      bg: require("../../../assets/companies/importExport2.webp"),
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
      <FoodProcessingHeader activeTab="home" />

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className={style.heroSection}
        style={{ backgroundImage: `url(${heroSlides[currentSlide].bg})` }}
      >
        <div className={style.heroOverlay} />
        
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>
            {heroSlides[currentSlide].title}
          </h1>
          <p className={style.heroDesc}>{heroSlides[currentSlide].desc}</p>
          <button className={style.heroBtn} onClick={() => navigate("/login")}>
            Explore More
          </button>
        </div>

        {/* Slide Controls */}
        <button className={style.slideArrowLeft} onClick={handlePrevSlide}>
          <IoArrowBackOutline />
        </button>
        <button className={style.slideArrowRight} onClick={handleNextSlide}>
          <IoArrowForwardOutline />
        </button>

        {/* Hero Features Strip (Overlapping at bottom) */}
        <div className={style.featuresStrip}>
          <div className={style.featureCard}>
            <div className={style.featureIcon}>
              <IoTrendingUpOutline />
            </div>
            <div className={style.featureTextWrap}>
              <h3 className={style.featureTitle}>Research and Analysis</h3>
              <p className={style.featureDesc}>Growth, focus & analysis.</p>
            </div>
          </div>

          <div className={style.featureCard}>
            <div className={style.featureIcon}>
              <IoGitBranchOutline />
            </div>
            <div className={style.featureTextWrap}>
              <h3 className={style.featureTitle}>Development</h3>
              <p className={style.featureDesc}>Strategy is the foundation.</p>
            </div>
          </div>

          <div className={style.featureCard}>
            <div className={style.featureIcon}>
              <IoTrendingDownOutline />
            </div>
            <div className={style.featureTextWrap}>
              <h3 className={style.featureTitle}>Implementation</h3>
              <p className={style.featureDesc}>Professional skilled team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className={style.whyChooseSection}>
        <div className={style.whyChooseGrid}>
          {/* Left Column: Descriptions */}
          <div className={style.whyChooseLeft}>
            <div className={style.sectionHeaderAccent}>
              <span className={style.verticalOrangeLine} />
              <h2 className={style.accentTitle}>Why Choose Us</h2>
            </div>
            
            <h3 className={style.mainWhyHeading}>
              Creating one of the fastest way to grow your business successfully
            </h3>
            
            <p className={style.whyDescText}>
              System is a term used to refer to an organized collection symbols and processes that
              may be used to operate on such symbols.
            </p>
            
            <span className={style.readMoreLink} onClick={() => navigate("/login")}>
              READ MORE &gt;
            </span>
          </div>

          {/* Right Column: Visual image */}
          <div className={style.whyChooseRight}>
            <div className={style.whyChooseImgWrap}>
              <img
                src={whyChooseImg}
                alt="Food Processing Team huddle"
                className={style.whyChooseImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES WE PROVIDE ──────────────────────── */}
      <section className={style.servicesSection}>
        <div className={style.sectionHeaderAccent}>
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

export default Content;
