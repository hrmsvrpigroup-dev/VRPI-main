import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./TechSolutionsContent.module.css";
import TechSolutionsHeader from "./TechSolutionsHeader";

// Images
import heroBg from "../../../assets/companies/tech_hero_bg.png";
import whyChooseImg from "../../../assets/companies/tech_why_choose.png";
import joinUsBg from "../../../assets/JoinUsBackground.png";
import benefitManImg from "../../../assets/companies/tech_benefit_man.png";

// News image imports
import imgNews1 from "../../../assets/companies/tech_news_1.png";
import imgNews2 from "../../../assets/companies/tech_news_2.png";
import imgNews3 from "../../../assets/companies/tech_news_3.png";

// Services images
import imgMobile from "../../../assets/companies/tech_service_mobile.png";
import imgWeb from "../../../assets/companies/tech_service_web.png";
import imgSoftware from "../../../assets/companies/tech_service_software.png";
import imgMarketing from "../../../assets/companies/tech_service_marketing.png";
import imgRent from "../../../assets/companies/tech_service_rent.png";
import imgEdutech from "../../../assets/companies/tech_service_edutech.png";

// Icons
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoLayersOutline,
  IoBulbOutline,
  IoHeadsetOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

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
      title: "IT Solution &\ntecnology",
      desc: "We are advisory firm designed to assist Private Equity, Family Offices, and Growth-Stage Companies seeking to convert ideas",
      bg: heroBg,
    },
    {
      title: "Transforming\nBusinesses",
      desc: "Empowering global companies with cutting edge technology, custom web architectures, and premium design implementations.",
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
      <TechSolutionsHeader activeTab="home" />

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
              <IoLayersOutline />
            </div>
            <div className={style.featureTextWrap}>
              <h3 className={style.featureTitle}>Creative Strategy</h3>
              <p className={style.featureDesc}>Growth, focus, & analysis.</p>
            </div>
          </div>

          <div className={style.featureCard}>
            <div className={style.featureIcon}>
              <IoBulbOutline />
            </div>
            <div className={style.featureTextWrap}>
              <h3 className={style.featureTitle}>Innovative Solutions</h3>
              <p className={style.featureDesc}>Design for the foundation.</p>
            </div>
          </div>

          <div className={style.featureCard}>
            <div className={style.featureIcon}>
              <IoHeadsetOutline />
            </div>
            <div className={style.featureTextWrap}>
              <h3 className={style.featureTitle}>Realtime Support</h3>
              <p className={style.featureDesc}>Professional database.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className={style.whyChooseSection}>
        <div className={style.whyChooseGrid}>
          {/* Left Column: Visual with overlapping badges */}
          <div className={style.whyChooseLeft}>
            {/* Dot Grid Decorative Background */}
            <div className={style.dotGridBg} />
            
            <div className={style.whyChooseImgWrap}>
              <img
                src={whyChooseImg}
                alt="VR and Tech Developers"
                className={style.whyChooseImg}
              />
            </div>
            
            {/* Experience badge overlay */}
            <div className={style.expBadge}>
              <span className={style.expNumber}>10+</span>
              <span className={style.expText}>Years<br />Experience</span>
            </div>
          </div>

          {/* Right Column: Descriptions */}
          <div className={style.whyChooseRight}>
            <div className={style.sectionHeaderAccent}>
              <span className={style.verticalOrangeLine} />
              <h2 className={style.accentTitle}>Why Choose Us</h2>
            </div>
            
            <h3 className={style.mainWhyHeading}>
              We Always Try to Give Smart Solution For Business
            </h3>
            
            <p className={style.whyDescText}>
              System is a term used to refer to an organized collection symbols and processes that
              may be used to operate on such symbols. Perspiciatis omnis natus error voluptatis accusae
            </p>
            
            <button className={style.learnMoreBtn} onClick={() => navigate("/login")}>
              Learn More About Us
            </button>
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
          <h2 className={style.accentTitle}>IT Solution & tecnology Benefits</h2>
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
              <img src={benefitManImg} alt="Smiling Developer" className={style.benefitsImg} />
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
