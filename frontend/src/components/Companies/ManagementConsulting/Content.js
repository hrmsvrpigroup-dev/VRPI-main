import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ManagementConsultingContent.module.css";
import ManagementConsultingHeader from "./ManagementConsultingHeader";

// Images
import heroBg from "../../../assets/companies/management2.webp";
import whyChooseImg from "../../../assets/companies/mc_why_choose.png";
import joinUsBg from "../../../assets/JoinUsBackground.png";
import benefitManImg from "../../../assets/companies/mc_benefit_man.png";

// News images
import imgNews1 from "../../../assets/companies/mc_news_1.png";
import imgNews2 from "../../../assets/companies/mc_news_2.png";
import imgNews3 from "../../../assets/companies/mc_news_3.png";

// Services images
import imgRoc from "../../../assets/companies/mc_service_roc.png";
import imgTcon from "../../../assets/companies/mc_service_tcon.png";
import imgGst from "../../../assets/companies/mc_service_gst.png";
import imgAuditing from "../../../assets/companies/mc_service_auditing.png";
import imgTax from "../../../assets/companies/mc_service_tax.png";
import imgAssessment from "../../../assets/companies/mc_service_assessment.png";

// Icons
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoTrendingUpOutline,
  IoGitBranchOutline,
  IoTrendingDownOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

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

const newsData = [
  {
    img: imgNews1,
    date: "JUNE 6, 2026",
    title: "I sink under the weight",
  },
  {
    img: imgNews2,
    date: "JUNE 6, 2026",
    title: "Possession of my entire soul",
  },
  {
    img: imgNews3,
    date: "JUNE 6, 2026",
    title: "I am so happy, my dear friend",
  },
];

const faqs = [
  {
    q: "How many courses can be taken for enrollment?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac gravida nunc. Vestibulum tristique sodales lorem nec porta.",
  },
  {
    q: "How long does it typically take for a student to complete the course?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac gravida nunc. Vestibulum tristique sodales lorem nec porta.",
  },
  {
    q: "For what kinds of jobs and positions does the program train its students?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac gravida nunc. Vestibulum tristique sodales lorem nec porta.",
  },
  {
    q: "How old do i have to be to take on online class?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac gravida nunc. Vestibulum tristique sodales lorem nec porta.",
  },
];

const Content = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const heroSlides = [
    {
      title: "Management &\nConsulting",
      desc: "We are boutique firm designed for Private Equity, Family Offices, and Growth-Stage Companies seeking to maximize results.",
      bg: heroBg,
    },
    {
      title: "Strategy &\nExecution",
      desc: "Providing insight-driven transformations, organization design, and strategic consulting to drive business efficiency.",
      bg: require("../../../assets/companies/techSolution2.webp"),
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const toggleFaq = (idx) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
      <ManagementConsultingHeader activeTab="home" />

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className={style.heroSection}
        style={{ backgroundImage: `url(${heroSlides[currentSlide].bg})` }}
      >
        <div className={style.heroOverlay} />
        
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>
            {heroSlides[currentSlide].title.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
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
                alt="Management Group Team huddle"
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

      {/* ── BENEFITS ─────────────────────────────────── */}
      <section className={style.benefitsSection}>
        <div className={style.sectionHeaderAccent}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.accentTitle}>Management & Consulting Benefits</h2>
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
              <img src={benefitManImg} alt="Smiling Consultant" className={style.benefitsImg} />
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ─────────────────────────────── */}
      <section className={style.newsSection}>
        <div className={style.newsContainer}>
          <div className={style.sectionHeaderAccent}>
            <span className={style.verticalOrangeLine} />
            <h2 className={style.accentTitle}>Latest News</h2>
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
                  <button className={style.newsBtn} onClick={() => navigate("/login")}>READ MORE</button>
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
          <div className={style.sectionHeaderAccent}>
            <span className={style.verticalOrangeLine} />
            <h2 className={style.accentTitle}>FAQ'S</h2>
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
