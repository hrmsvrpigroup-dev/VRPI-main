import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ConstructionContent.module.css";
import ConstructionHeader from "./ConstructionHeader";
import logo from "../../../assets/vrpiLogo.png";
import heroBg from "../../../assets/companies/construction2.webp";
import whyChooseImg from "../../../assets/companies/construction_why_choose.png";
import benefitWorkerImg from "../../../assets/companies/construction_benefit_worker.png";

// News image imports
import imgNews1 from "../../../assets/companies/construction_news_1.png";
import imgNews2 from "../../../assets/companies/construction_news_2.png";
import imgNews3 from "../../../assets/companies/construction_news_3.png";

// Service image imports
import imgHomes from "../../../assets/construction1.png";
import imgApartments from "../../../assets/Construction2.png";
import imgTenders from "../../../assets/Construction3.png";
import imgArchitecture from "../../../assets/companies/construction_architecture.png";
import imgInterior from "../../../assets/companies/construction_interior.png";
import imgMaterial from "../../../assets/companies/construction_material.png";

// Icon imports
import {
  IoSearch,
  IoPersonCircleOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

// Sub-components
import JoinUs from "../../JoinUs/JoinUs";
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

const Content = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const heroSlides = [
    {
      title: "Construction & Infrastructure",
      subtitle: "We look for new business opportunities and can help you work with your existing customers to get more of them to buy.",
    },
    {
      title: "Innovation & Integrity",
      subtitle: "Building modern structures with state-of-the-art technology, sustainable practices, and expert craftsmanship.",
    },
    {
      title: "Shaping the Future",
      subtitle: "From towering commercial complexes to cozy residential spaces, we bring your vision to life with precision.",
    }
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const features = [
    {
      icon: <IoShieldCheckmarkOutline />,
      title: "Quality Check",
      desc: "Growth, focus & analysis.",
    },
    {
      icon: <IoTimeOutline />,
      title: "On Time Delivery",
      desc: "Strategy is the foundation.",
    },
    {
      icon: <IoPeopleOutline />,
      title: "Expertize Team",
      desc: "Professional skilled team.",
    },
  ];

  const services = [
    {
      img: imgHomes,
      title: "Independent Homes & Residential",
      desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
    },
    {
      img: imgApartments,
      title: "Apartments",
      desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
    },
    {
      img: imgTenders,
      title: "Government Tenders",
      desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
    },
    {
      img: imgArchitecture,
      title: "Architecture",
      desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
    },
    {
      img: imgInterior,
      title: "Interior Designing",
      desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
    },
    {
      img: imgMaterial,
      title: "Material Supply",
      desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
    },
  ];

  const newsData = [
    {
      img: imgNews1,
      date: "June 6, 2026",
      title: "I sink under the weight",
    },
    {
      img: imgNews2,
      date: "June 6, 2026",
      title: "Possession of my entire soul",
    },
    {
      img: imgNews3,
      date: "June 6, 2026",
      title: "I am so happy, my dear friend",
    },
  ];

  const faqs = [
    {
      q: "How many courses can be taken for enrollment?",
      a: "You can enroll in multiple courses simultaneously depending on your learning capacity. We recommend beginning with one core path to maximize your understanding and focus."
    },
    {
      q: "How long does it typically take for a student to complete the course?",
      a: "Course duration typically ranges from 4 to 8 weeks. However, since the curriculum is completely self-paced, you can move faster or slower based on your schedule."
    },
    {
      q: "For what kinds of jobs and positions does the program train its students?",
      a: "Our training programs prepare students for high-value roles including Business Consultants, Corporate Finance Associates, Financial Analysts, and Risk Managers."
    },
    {
      q: "How old do i have to be to take on online class?",
      a: "There are no age restrictions to join our classes. Anyone with a passion for corporate and financial solutions can enroll and build industry-relevant skills."
    }
  ];

  return (
    <div id="home">
      {/* Skewed Header Navigation Bar */}
      <ConstructionHeader activeTab="home" />

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className={style.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={style.heroOverlay} />

        <div className={style.heroSliderContainer}>
          <button className={style.sliderArrowBtn} onClick={handlePrevSlide} aria-label="Previous Slide">
            <IoArrowBackOutline />
          </button>
          
          <div className={style.heroContent}>
            <h1 className={style.heroTitle}>{heroSlides[currentSlide].title}</h1>
            <p className={style.heroSubtitle}>
              {heroSlides[currentSlide].subtitle}
            </p>
            <button className={style.heroBtn} onClick={() => scrollToSection("services")}>
              Explore More
            </button>
          </div>

          <button className={style.sliderArrowBtn} onClick={handleNextSlide} aria-label="Next Slide">
            <IoArrowForwardOutline />
          </button>
        </div>
      </section>

      {/* ── FEATURE STRIP (Overlapping Bottom of Hero) ────── */}
      <section className={style.featuresStrip}>
        <div className={style.featuresGrid}>
          {features.map((f) => (
            <div className={style.featureCard} key={f.title}>
              <div className={style.featureIcon}>{f.icon}</div>
              <div className={style.featureTextWrap}>
                <h3 className={style.featureTitle}>{f.title}</h3>
                <p className={style.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className={style.whyChooseSection} id="about-us">
        <div className={style.whyChooseHeader}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.whyChooseHeaderTitle}>Why Choose Us</h2>
        </div>

        <div className={style.whyChooseGrid}>
          {/* Column 1: Info and Text description */}
          <div className={style.whyChooseColLeft}>
            <span className={style.whyChooseSubtitle}>PLET'S WORK TOGETHER</span>
            <h3 className={style.whyChooseMainTitle}>THE WORLD'S LARGEST BUILDINGS CONSTRUCTION</h3>
            <p className={style.whyChooseDesc}>
              Pro ne mutat velit impedit, sit mediocrem iudicabit definiebas mauris commodo quis tellus inquando sensibus contentiones mea. Mauris eget ligula hendrerit ati quis vulputate volutpat.
            </p>
            <button className={style.whyChooseBtn} onClick={() => navigate("/about")}>
              Learn More About Us
            </button>
          </div>

          {/* Column 2: Portrait image with stats overlays */}
          <div className={style.whyChooseColImg}>
            <div className={style.whyChooseCircleWrap}>
              <img src={whyChooseImg} alt="Why Choose Us" className={style.whyChooseImg} />
              
              <div className={style.statsOverlayLeft}>
                <span className={style.statsNum}>55</span>
                <span className={style.statsLabel}>Projects</span>
              </div>
              
              <div className={style.statsOverlayRight}>
                <span className={style.statsNum}>1200</span>
                <span className={style.statsLabel}>Happy customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section className={style.servicesSection} id="services">
        <div className={style.servicesContainer}>
          <div className={style.whyChooseHeader}>
            <span className={style.verticalOrangeLine} />
            <h2 className={style.whyChooseHeaderTitle}>Services We Provide</h2>
          </div>

          <div className={style.servicesGrid}>
            {services.map((s) => (
              <div className={style.serviceCard} key={s.title}>
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
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────── */}
      <section className={style.benefitsSection}>
        <div className={style.whyChooseHeader}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.whyChooseHeaderTitle}>Construction & Infrastructure Benefits</h2>
        </div>

        <div className={style.benefitsBox}>
          <div className={style.benefitsContent}>
            <div className={style.benefitsTextWrap}>
              <p className={style.benefitsDesc}>
                EduTech has the potential to transform education, making it more accessible, engaging, and effective for learners of all ages and backgrounds.
              </p>
              <div className={style.benefitsList}>
                <div className={style.benefitItem}>
                  <IoCheckmarkCircleOutline className={style.benefitCheckIcon} />
                  <span>Course Certification</span>
                </div>
                <div className={style.benefitItem}>
                  <IoCheckmarkCircleOutline className={style.benefitCheckIcon} />
                  <span>Internship with Real-Time Project</span>
                </div>
                <div className={style.benefitItem}>
                  <IoCheckmarkCircleOutline className={style.benefitCheckIcon} />
                  <span>Scholarship / Fee Reimbursement</span>
                </div>
                <div className={style.benefitItem}>
                  <IoCheckmarkCircleOutline className={style.benefitCheckIcon} />
                  <span>Virtual Classes</span>
                </div>
                <div className={style.benefitItem}>
                  <IoCheckmarkCircleOutline className={style.benefitCheckIcon} />
                  <span>Recorded Classes</span>
                </div>
              </div>
            </div>

            <div className={style.benefitsImgWrap}>
              <img src={benefitWorkerImg} alt="Construction Worker" className={style.benefitsImg} />
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ─────────────────────────────── */}
      <section className={style.newsSection}>
        <div className={style.newsContainer}>
          <div className={style.whyChooseHeader}>
            <span className={style.verticalOrangeLine} />
            <h2 className={style.whyChooseHeaderTitle}>Latest News</h2>
          </div>

          <div className={style.newsGrid}>
            {newsData.map((item, index) => (
              <div className={style.newsCard} key={index}>
                <div className={style.newsImgWrap}>
                  <img src={item.img} alt={item.title} className={style.newsImg} />
                </div>
                <div className={style.newsBody}>
                  <span className={style.newsDate}>{item.date}</span>
                  <h3 className={style.newsTitle}>{item.title}</h3>
                  <button className={style.newsBtn} onClick={() => navigate("/about")}>READ MORE</button>
                </div>
              </div>
            ))}
          </div>

          <div className={style.newsIndicators}>
            <div className={style.indicatorLine}></div>
            <div className={style.indicatorDot}></div>
            <div className={style.indicatorDot}></div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className={style.faqSection}>
        <div className={style.faqContainer}>
          <div className={style.whyChooseHeader}>
            <span className={style.verticalOrangeLine} />
            <h2 className={style.whyChooseHeaderTitle}>FAQ'S</h2>
          </div>

          <div className={style.faqList}>
            {faqs.map((faq, idx) => (
              <div className={style.faqItem} key={idx}>
                <button className={style.faqQuestionRow} onClick={() => toggleFaq(idx)}>
                  <span className={style.faqQuestion}>{faq.q}</span>
                  <span className={`${style.faqArrow} ${activeFaq === idx ? style.arrowActive : ""}`}>
                    <IoArrowForwardOutline />
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className={style.faqAnswerRow}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN US ──────────────────────────────────── */}
      <JoinUs />

      {/* ── FOOTER ───────────────────────────────────── */}
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
