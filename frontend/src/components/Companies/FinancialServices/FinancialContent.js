import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./FinancialContent.module.css";
import heroBg from "../../../assets/financialHeroBg.png";
import logo from "../../../assets/vrpiLogo.png";
import wannaTalkBg from "../../../assets/financial/wanna_talk_bg.png";
import {
  IoSearch,
  IoPersonCircleOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoAnalyticsOutline,
  IoChatbubblesOutline,
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { FaBullseye } from "react-icons/fa";

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

// Why Choose Us image import
import imgWhyChoose from "../../../assets/financial/why_choose_woman.png";

// About Us image imports
import imgAboutChess from "../../../assets/financial/about_chess.png";
import imgAboutHands from "../../../assets/financial/about_hands_stacked.png";

/* ── Feature Cards Data ─────────────────────────────────────── */
const features = [
  {
    icon: <IoAnalyticsOutline />,
    title: "Advanced Analytic",
    desc: "Growth, focus & analysis.",
  },
  {
    icon: <FaBullseye />,
    title: "Corporate Finance",
    desc: "Strategy is the foundation.",
  },
  {
    icon: <IoChatbubblesOutline />,
    title: "Business Consultation",
    desc: "Professional skilled team.",
  },
];

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
    title: "Treasury /Debt Instructions",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
  {
    img: imgPortfolioMgmt,
    title: "Portfolio Management",
    desc: "Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.",
  },
];


/* ── Main Component ─────────────────────────────────────────── */
const FinancialContent = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = React.useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

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
    <>
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
              <span className={style.navLink + " " + style.activeLink} onClick={() => navigate("/financial-services")}>
                Home
              </span>
              <span className={style.navLink} onClick={() => navigate("/financial-services/about")}>
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

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className={style.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={style.heroOverlay} />

        {/* Hero Central Slider content */}
        <div className={style.heroSliderContainer}>
          <button className={style.sliderArrowBtn} aria-label="Previous Slide">
            <IoArrowBackOutline />
          </button>
          
          <div className={style.heroContent}>
            <h1 className={style.heroTitle}>Corporate &<br />Finance Solutions</h1>
            <p className={style.heroSubtitle}>
              We are boutique firm designed for Private Equity, Family Offices, and
              Growth-Stage Companies seeking to maximize results
            </p>
            <button className={style.heroBtn} onClick={() => navigate("/contact")}>
              Explore More
            </button>
          </div>

          <button className={style.sliderArrowBtn} aria-label="Next Slide">
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
      <section className={style.whyChooseSection}>
        <div className={style.whyChooseHeader}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.whyChooseHeaderTitle}>Why Choose Us</h2>
        </div>

        <div className={style.whyChooseGrid}>
          {/* Column 1: Portrait with circular arc overlays */}
          <div className={style.whyChooseColImg}>
            <div className={style.whyChooseCircleWrap}>
              <img src={imgWhyChoose} alt="Why Choose Us" className={style.whyChooseImg} />
              <div className={style.whyChooseCircleRing} />
              <div className={style.whyChooseCircleRingInner} />
            </div>
          </div>

          {/* Column 2: Badge and Text description */}
          <div className={style.whyChooseColCenter}>
            <div className={style.badgeWrapper}>
              <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,5 93,30 93,80 50,95 7,80 7,30" fill="none" stroke="#ff6701" stroke-width="4" stroke-linejoin="round" />
                <polygon points="50,10 88,32 88,78 50,90 12,78 12,32" fill="none" stroke="#ff6701" stroke-width="1.5" stroke-linejoin="round" />
                <text x="50" y="27" font-family="sans-serif" font-size="7.5" font-weight="bold" fill="#333333" text-anchor="middle">Consultancy</text>
                <rect x="0" y="38" width="100" height="24" fill="#000000" />
                <text x="50" y="53" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">2020 - 2024</text>
                <text x="50" y="78" font-family="sans-serif" font-size="7.5" font-weight="bold" fill="#333333" text-anchor="middle">Of the Years</text>
              </svg>
            </div>
            
            <h3 className={style.whyChooseMainTitle}>VR Pi GROUP</h3>
            <p className={style.whyChooseDesc}>
              I am text block. Click edit button to change this text.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className={style.whyChooseBtn} onClick={() => navigate("/about")}>
              Learn More About Us
            </button>
          </div>

          {/* Column 3: Stacked Counter statistics */}
          <div className={style.whyChooseColStats}>
            <div className={style.whyChooseStatItem}>
              <span className={style.whyChooseStatNum}>384</span>
              <span className={style.whyChooseStatLabel}>In-House Engineers</span>
            </div>
            <div className={style.whyChooseStatItem}>
              <span className={style.whyChooseStatNum}>127</span>
              <span className={style.whyChooseStatLabel}>Active Status Clients</span>
            </div>
            <div className={style.whyChooseStatItem}>
              <span className={style.whyChooseStatNum}>456</span>
              <span className={style.whyChooseStatLabel}>Successful Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section className={style.servicesSection} id="services">
        {/* Watermark background text */}
        <div className={style.sectionWatermark}>SERVICES</div>

        <div className={style.sectionHeader}>
          <h2 className={style.sectionTitle}>All Banking Services We Provide</h2>
          <p className={style.sectionLabel}>COVERED IN THESE AREAS</p>
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
                <button
                  className={style.serviceLearnMore}
                  onClick={() => navigate("/contact")}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WANNA TALK CTA (Above Footer) ─────────────── */}
      <section
        className={style.wannaTalkSection}
        style={{ backgroundImage: `url(${wannaTalkBg})` }}
      >
        <div className={style.wannaTalkOverlay} />
        <div className={style.wannaTalkContent}>
          <div className={style.wannaTalkLeft}>
            <h2 className={style.wannaTalkTitle}>Wanna Talk To Us?</h2>
            <p className={style.wannaTalkSubtitle}>
              We are boutique firm designed for Private Equity, Family Offices, and
              Growth-Stage Companies seeking to maximize results
            </p>
          </div>
          <button
            className={style.wannaTalkBtn}
            onClick={() => navigate("/contact")}
          >
            LET'S CHAT
          </button>
        </div>
      </section>

      {/* ── ABOUT US (Rows) ──────────────────────────── */}
      <section className={style.aboutSection} id="about">
        <div className={style.aboutWatermark}>ABOUT US</div>
        
        <div className={style.aboutHeader}>
          <h2 className={style.aboutTitle}>About Us</h2>
          <p className={style.aboutSubtitle}>OUR LITTLE STORY</p>
        </div>

        {/* Row 1 */}
        <div className={style.aboutRow}>
          <div className={style.aboutColImg}>
            <img src={imgAboutChess} alt="About Us" className={style.aboutImg} />
          </div>
          <div className={style.aboutColText}>
            <div className={style.aboutSubSection}>
              <h3 className={style.aboutSubHeading}>
                <span className={style.underlined}>ABOUT</span> US
              </h3>
              <p className={style.aboutText}>
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per
                consectetur adipiscing elit. Nunc vulputate libero et velit
              </p>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className={style.aboutRow}>
          <div className={style.aboutColText}>
            <div className={style.aboutSubSection}>
              <h3 className={style.aboutSubHeading}>
                <span className={style.underlined}>OUR</span> COMPANY HISTORY
              </h3>
              <p className={style.aboutText}>
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per
                consectetur adipiscing elit. Nunc vulputate libero et velit
              </p>
              
              <ul className={style.aboutList}>
                <li>
                  <span className={style.listIcon}>&gt;</span>
                  Financial Management and Consulting
                </li>
                <li>
                  <span className={style.listIcon}>&gt;</span>
                  Advice and Assistance Investing
                </li>
                <li>
                  <span className={style.listIcon}>&gt;</span>
                  Comprehensive Support for Your Business
                </li>
              </ul>
            </div>
          </div>
          <div className={style.aboutColImg}>
            <img src={imgAboutHands} alt="Our Company History" className={style.aboutImg} />
          </div>
        </div>
      </section>

      {/* ── CONTACT US ─────────────────────────────────── */}
      <section className={style.contactSection} id="contact">
        <div className={style.contactWatermark}>CONTACT US</div>
        
        <div className={style.contactHeader}>
          <h2 className={style.contactTitle}>Contact Us</h2>
          <p className={style.contactSubtitle}>OUR LITTLE STORY</p>
        </div>

        <div className={style.contactGrid}>
          {/* Column 1: Contact Info */}
          <div className={style.contactColInfo}>
            <h3 className={style.contactColTitle}>
              <span className={style.underlined}>CONTACT</span> INFO
            </h3>
            
            <ul className={style.contactInfoList}>
              <li>
                <div className={style.contactIconWrap}>
                  <IoLocationOutline />
                </div>
                <div className={style.contactInfoText}>
                  2/27/163, GANDHI NAGAR STREET, JAMMI CHETTU, WANAPARTHY ,
                  Wanaparthy, TELANGANA, 509103
                </div>
              </li>
              <li>
                <div className={style.contactIconWrap}>
                  <IoMailOutline />
                </div>
                <div className={style.contactInfoText}>
                  info@vrpigroup.co.in<br />
                  Supportinfo@vrpigroup.co.in
                </div>
              </li>
              <li>
                <div className={style.contactIconWrap}>
                  <IoCallOutline />
                </div>
                <div className={style.contactInfoText}>
                  +91 8790946714<br />
                  +91 8790946714
                </div>
              </li>
            </ul>
          </div>

          {/* Column 2: Drop a Message Form */}
          <div className={style.contactColForm}>
            <h3 className={style.contactColTitle}>
              <span className={style.underlined}>DROP</span> A MESSAGE
            </h3>
            
            <form className={style.messageForm} onSubmit={(e) => e.preventDefault()}>
              <div className={style.formRow}>
                <input type="text" placeholder="Full Name*" required className={style.formInput} />
                <input type="email" placeholder="Email*" required className={style.formInput} />
              </div>
              <div className={style.formRow}>
                <input type="text" placeholder="Subject*" required className={style.formInput} />
                <input type="text" placeholder="Phone Number" className={style.formInput} />
              </div>
              <textarea placeholder="Message*" required className={style.formTextarea} rows="5"></textarea>
              <button type="submit" className={style.formSubmitBtn}>
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ'S ACCORDION SECTION ───────────────────── */}
      <section className={style.faqSection}>
        <div className={style.faqHeader}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.faqHeaderTitle}>FAQ'S</h2>
        </div>

        <div className={style.faqAccordionContainer}>
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div className={style.faqItem} key={idx}>
                <div
                  className={style.faqQuestionBar}
                  onClick={() => toggleFaq(idx)}
                >
                  <span className={style.faqQuestionText}>{faq.q}</span>
                  <span className={style.faqArrowIcon + " " + (isOpen ? style.faqArrowOpen : "")}>
                    <IoArrowForwardOutline />
                  </span>
                </div>
                
                {isOpen && (
                  <div className={style.faqAnswerBox}>
                    <p className={style.faqAnswerText}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <Footer
        links={footerLinks}
        quickLinks={quickLinks}
        ContactUs={ContactUs}
        JoinUsBarData={JoinUsBarData}
      />
    </>
  );
};

export default FinancialContent;
