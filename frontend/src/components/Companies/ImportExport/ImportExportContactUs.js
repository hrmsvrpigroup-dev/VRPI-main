import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./ImportExportContactUs.module.css";
import ImportExportHeader from "./ImportExportHeader";
import joinUsBg from "../../../assets/JoinUsBackground.png";

// Footer imports
import Footer from "../../Layout/Footer/Footer";
import { footerLinks, quickLinks, ContactUs, JoinUsBarData } from "../../../data/NavData";

// Icons
import {
  IoCallOutline,
  IoMailOutline,
  IoMapOutline,
} from "react-icons/io5";

const ImportExportContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className={style.pageWrapper}>
      {/* Skewed Header Navigation Bar */}
      <ImportExportHeader activeTab="contact" />

      {/* ── BREADCRUMB ───────────────────────────────── */}
      <section className={style.breadcrumbSection}>
        <div className={style.breadcrumbTitle}>
          <span className={style.orangeLetter}>C</span>ontact Us
        </div>
        <div className={style.breadcrumbPath}>
          Home / <span className={style.orangePath}>Contact Us</span>
        </div>
      </section>

      {/* ── EASY WAY TO CONTACT ──────────────────────── */}
      <section className={style.easyContactSection}>
        <div className={style.accentHeader}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.accentTitle}>Contact us</h2>
        </div>
        
        <div className={style.introGrid}>
          <h3 className={style.introHeading}>Easy way to contact with us</h3>
          <p className={style.introText}>
            Fill out our easy-to-use contact form on our website. Just provide your name, email, and a
            brief message, and we'll get back to you promptly.
          </p>
        </div>
      </section>

      {/* ── THREE CONTACT INFO CARDS ─────────────────── */}
      <section className={style.infoCardsSection}>
        <div className={style.infoCardsGrid}>
          {/* Card 1 */}
          <div className={style.infoCard}>
            <div className={style.cardIcon}>
              <IoCallOutline />
            </div>
            <h4 className={style.cardTitle}>Phone support</h4>
            <span className={style.cardValue}>+91 8790946714</span>
          </div>

          {/* Card 2 */}
          <div className={style.infoCard}>
            <div className={style.cardIcon}>
              <IoMailOutline />
            </div>
            <h4 className={style.cardTitle}>Email us</h4>
            <span className={style.cardValue}>info@vrpigroup.co.in</span>
          </div>

          {/* Card 3 */}
          <div className={style.infoCard}>
            <div className={style.cardIcon}>
              <IoMapOutline />
            </div>
            <h4 className={style.cardTitle}>Address</h4>
            <span className={style.cardValue}>Wanaparthy, TELANGANA</span>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM & MAP ───────────────────────── */}
      <section className={style.formMapSection}>
        <div className={style.accentHeader}>
          <span className={style.verticalOrangeLine} />
          <h2 className={style.accentTitle}>CONTACT FORM</h2>
        </div>
        
        <h3 className={style.largeFormHeading}>Let's discuss</h3>

        <div className={style.formMapGrid}>
          {/* Form */}
          <div className={style.formCol}>
            <form className={style.discussForm} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required className={style.formInput} />
              <input type="email" placeholder="Your Email" required className={style.formInput} />
              <input type="text" placeholder="Subject" required className={style.formInput} />
              <textarea placeholder="Your Message" required className={style.formTextarea} rows="6"></textarea>
              <button type="submit" className={style.submitBtn}>
                Send Message
              </button>
            </form>
          </div>

          {/* Map (embedded pointer pointing to Wanaparthy) */}
          <div className={style.mapCol}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15328.799799279768!2d78.0505187707439!3d16.363999971032585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba8bf546a15e61%3A0xe102e3b2e59dfd3!2sWanaparthy%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px", borderRadius: "6px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wanaparthy Location Map"
            ></iframe>
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

export default ImportExportContactUs;
