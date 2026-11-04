import React, { useState } from 'react';
import styles from './InternshipLandingPage.module.css';

export default function InternshipLandingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    qualification: '',
    domain: '',
    internshipMode: 'Virtual / Remote (Pan-India)',
    portfolioUrl: '',
    statement: '',
    termsAccepted: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [activeFaq, setActiveFaq] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full official name (min 3 characters)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = 'Please provide an active WhatsApp/contact number';
    }
    if (!formData.college.trim()) {
      newErrors.college = 'College/University name is required';
    }
    if (!formData.qualification) {
      newErrors.qualification = 'Please select your current educational degree';
    }
    if (!formData.domain) {
      newErrors.domain = 'Please choose an internship specialization track';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const code = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `VRPI-INT-2026-${code}`;

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('vrpi_internship_applications') || '[]');
        existing.unshift({
          ...formData,
          applicationId: generatedId,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('vrpi_internship_applications', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      setApplicationId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      qualification: '',
      domain: '',
      internshipMode: 'Virtual / Remote (Pan-India)',
      portfolioUrl: '',
      statement: '',
      termsAccepted: true
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterMsg('✓ Subscribed successfully! You will receive batch notifications.');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterMsg(''), 4500);
    }
  };

  const domains = [
    {
      badge: 'Tech Solutions',
      title: 'Full Stack Web & Mobile',
      summary: 'Build scalable enterprise apps using React 18, Next.js, Node.js, Express, PostgreSQL, and AWS cloud deployment.',
      tags: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker'],
      domainValue: 'Tech Solutions: Full Stack Web & Mobile'
    },
    {
      badge: 'AI & Data',
      title: 'Cloud & Generative AI',
      summary: 'Deploy autonomous agent workflows, LLM fine-tuning, vector databases, RAG architecture, and Kubernetes pipelines.',
      tags: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'AWS'],
      domainValue: 'Cloud Architecture & AI/ML Engineering'
    },
    {
      badge: 'Infrastructure',
      title: 'Civil BIM & Smart Modeling',
      summary: 'Work on structural analysis, Revit BIM models, AutoCAD drafting, and sustainable urban infrastructure plans.',
      tags: ['AutoCAD', 'Revit', 'ETABS', 'BIM', 'GIS'],
      domainValue: 'Civil & Infrastructure BIM Modeling'
    },
    {
      badge: 'Financial Services',
      title: 'Corporate Finance & FinTech',
      summary: 'Financial statement analysis, discounted cash flow (DCF) modeling, portfolio risk hedging, and algorithmic reconciliation.',
      tags: ['Financial Modeling', 'PowerBI', 'FinTech', 'Valuation'],
      domainValue: 'Financial Valuation & FinTech Analytics'
    },
    {
      badge: 'Food Processing',
      title: 'Food Tech & Supply Chain QA',
      summary: 'HACCP compliance standards, cold-chain logistics optimization, food safety inspection, and export traceability.',
      tags: ['QA/QC', 'HACCP', 'Supply Chain', 'Cold Chain'],
      domainValue: 'AgriTech & Food Processing Engineering'
    },
    {
      badge: 'Consulting',
      title: 'Management Consulting & Strategy',
      summary: 'Market research, operational KPI audits, corporate pitch decks, competitor reconnaissance, and client proposals.',
      tags: ['Strategy', 'Market Analysis', 'Agile Scrum', 'KPIs'],
      domainValue: 'Management Consulting & Business Analytics'
    }
  ];

  const faqs = [
    {
      q: 'Is this internship really 100% free of cost?',
      a: 'Yes, absolutely. VR PI Group does not charge any application fee, registration fee, examination charge, or training fee. This is an industry talent initiative aimed at grooming high-potential talent.'
    },
    {
      q: 'Who is eligible to apply for this internship?',
      a: 'Undergraduate and postgraduate students (B.Tech, B.E, MCA, BCA, B.Sc, MBA, B.Com, Civil/Mechanical) from any recognized university across India are eligible. Fresh graduates and self-taught developers are also encouraged to apply.'
    },
    {
      q: 'What is the selection and screening process?',
      a: 'After submitting the application form, candidates are screened based on their academic background, project interest, and statement. Shortlisted candidates receive an online assessment or technical interaction link within 48 business hours.'
    },
    {
      q: 'Will I receive a certificate and Letter of Recommendation (LOR)?',
      a: 'Yes. Upon successful completion of assigned sprint deliverables and project evaluation, all interns receive an official VR PI Group Internship Certificate with digital verification ID. High-performing interns receive a formal Letter of Recommendation (LOR) signed by the department director.'
    },
    {
      q: 'Can I do this internship alongside my college classes?',
      a: 'Yes! Our remote and hybrid tracks are structured with flexible sprint milestones and recorded weekend mentor workshops to ensure candidates can balance academic commitments seamlessly.'
    }
  ];

  return (
    <div className={styles.landingWrapper}>
      {/* Announcement Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.container}>
          <div className={styles.announcementInner}>
            <span className={styles.announcementPill}>Cohort 2026 Open</span>
            <span>Applications for Summer &amp; Fall Free Industrial Internship are now live. Zero Tuition Fee.</span>
            <a href="#apply" className={styles.announcementLink}>Apply Now &rarr;</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={styles.siteHeader}>
        <div className={`${styles.container} ${styles.headerFlex}`}>
          <a href="/" className={styles.brandLogo}>
            <span className={styles.logoAccent}>VR</span><span className={styles.logoDark}>PI</span>
            <span className={styles.logoTag}>INTERNSHIPS</span>
          </a>

          <nav className={styles.navLinks}>
            <a href="#about" className={styles.navLink}>About Program</a>
            <a href="#benefits" className={styles.navLink}>Why VR PI</a>
            <a href="#domains" className={styles.navLink}>Domains</a>
            <a href="#faq" className={styles.navLink}>FAQs</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>

          <a href="#apply" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>
            <span>Apply For Free</span>
            <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className={styles.bannerSection} id="about">
        <div className={styles.container}>
          <div className={styles.bannerInner}>
            <div className={styles.subTitleV2}>
              <span className={styles.badgeIcon}>★</span>
              <span>100% Free Industrial Internship • 2026 Batch</span>
            </div>

            <h1 className={styles.bannerTitle}>
              Launch Your Career with <span className={styles.highlightText}>VR PI Free Industrial</span> Internship
            </h1>

            <p className={styles.bannerDescription}>
              Bridging the academic-to-corporate gap. Work on live enterprise client projects under executive industry directors across Software, AI, Civil Infra, Finance, and Management. Absolutely zero training charges.
            </p>

            <div className={styles.bannerStatsRow}>
              <div className={styles.statPill}>
                <strong className={styles.statNumber}>₹0</strong>
                <span className={styles.statLabel}>Zero Tuition Fee</span>
              </div>
              <div className={styles.statPill}>
                <strong className={styles.statNumber}>8–12</strong>
                <span className={styles.statLabel}>Weeks Duration</span>
              </div>
              <div className={styles.statPill}>
                <strong className={styles.statNumber}>1,250+</strong>
                <span className={styles.statLabel}>Interns Trained</span>
              </div>
              <div className={styles.statPill}>
                <strong className={styles.statNumber}>100%</strong>
                <span className={styles.statLabel}>Verified Certificate &amp; LOR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section: Recrot Two-Column Form & Details */}
      <section className={styles.contactSection} id="apply">
        <div className={styles.container}>
          <div className={styles.contactLayout}>

            {/* Left Column: Application Form */}
            <div className={styles.contactFormBlock}>
              {!isSubmitted ? (
                <>
                  <div className={styles.formHeader}>
                    <span className={styles.formTag}>Official Registration</span>
                    <h2 className={styles.formTitle}>Candidate Application Form</h2>
                    <p className={styles.formSubtitle}>Fill in your details accurately. Our technical review committee processes applications within 48 business hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.internshipForm} noValidate>
                    <div className={styles.formGrid2}>
                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>Full Name <span className={styles.required}>*</span></label>
                        <input
                          type="text"
                          name="fullName"
                          className={styles.inputField}
                          placeholder="e.g. Rahul Sharma"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                        {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                      </div>

                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>Email Address <span className={styles.required}>*</span></label>
                        <input
                          type="email"
                          name="email"
                          className={styles.inputField}
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                      </div>
                    </div>

                    <div className={styles.formGrid2}>
                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>WhatsApp / Contact No <span className={styles.required}>*</span></label>
                        <input
                          type="tel"
                          name="phone"
                          className={styles.inputField}
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                      </div>

                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>College / University <span className={styles.required}>*</span></label>
                        <input
                          type="text"
                          name="college"
                          className={styles.inputField}
                          placeholder="e.g. IIT, NIT, JNTU, Osmania..."
                          value={formData.college}
                          onChange={handleChange}
                        />
                        {errors.college && <span className={styles.errorText}>{errors.college}</span>}
                      </div>
                    </div>

                    <div className={styles.formGrid2}>
                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>Degree &amp; Passing Year <span className={styles.required}>*</span></label>
                        <select
                          name="qualification"
                          className={`${styles.inputField} ${styles.selectField}`}
                          value={formData.qualification}
                          onChange={handleChange}
                        >
                          <option value="">Select Qualification</option>
                          <option value="B.Tech / B.E (2024-2027)">B.Tech / B.E (Engineering)</option>
                          <option value="MCA / BCA (2024-2027)">MCA / BCA (Computer Applications)</option>
                          <option value="B.Sc / M.Sc (IT/Data/Science)">B.Sc / M.Sc (CS / Data)</option>
                          <option value="MBA / BBA / B.Com (Finance/HR)">MBA / BBA / B.Com (Business/Finance)</option>
                          <option value="Civil / Structural / Mech">Civil / Architectural / Mech Eng</option>
                          <option value="Recent Graduate / Career Changer">Recent Graduate / Career Switcher</option>
                        </select>
                        {errors.qualification && <span className={styles.errorText}>{errors.qualification}</span>}
                      </div>

                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>Specialization Track <span className={styles.required}>*</span></label>
                        <select
                          name="domain"
                          className={`${styles.inputField} ${styles.selectField}`}
                          value={formData.domain}
                          onChange={handleChange}
                        >
                          <option value="">Choose Specialization Track</option>
                          <option value="Tech Solutions: Full Stack Web & Mobile">Tech Solutions: Full Stack Web &amp; Mobile</option>
                          <option value="Cloud Architecture & AI/ML Engineering">Cloud Architecture &amp; AI/ML Engineering</option>
                          <option value="Civil & Infrastructure BIM Modeling">Civil &amp; Infrastructure BIM Modeling</option>
                          <option value="Financial Valuation & FinTech Analytics">Financial Valuation &amp; FinTech Analytics</option>
                          <option value="AgriTech & Food Processing Engineering">AgriTech &amp; Food Processing Engineering</option>
                          <option value="Management Consulting & Business Analytics">Management Consulting &amp; Business Analytics</option>
                        </select>
                        {errors.domain && <span className={styles.errorText}>{errors.domain}</span>}
                      </div>
                    </div>

                    <div className={styles.formGrid2}>
                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>Internship Mode</label>
                        <select
                          name="internshipMode"
                          className={`${styles.inputField} ${styles.selectField}`}
                          value={formData.internshipMode}
                          onChange={handleChange}
                        >
                          <option value="Virtual / Remote (Pan-India)">Virtual / Remote (Pan-India Online)</option>
                          <option value="Hybrid (Office & Remote)">Hybrid (Office &amp; Remote)</option>
                          <option value="On-Site (Corporate Office, Hyderabad)">On-Site (Corporate Office, Hyderabad)</option>
                        </select>
                      </div>

                      <div className={styles.inputFieldWrap}>
                        <label className={styles.inputLabel}>LinkedIn / GitHub URL</label>
                        <input
                          type="url"
                          name="portfolioUrl"
                          className={styles.inputField}
                          placeholder="https://linkedin.com/in/username"
                          value={formData.portfolioUrl}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className={styles.inputFieldWrap}>
                      <label className={styles.inputLabel}>Statement of Purpose / Goals (Optional)</label>
                      <textarea
                        name="statement"
                        rows="3"
                        className={`${styles.inputField} ${styles.textareaField}`}
                        placeholder="Tell us what you aim to achieve and your technical background..."
                        value={formData.statement}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={styles.formCheckboxWrap}>
                      <input
                        type="checkbox"
                        id="reactTerms"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                      />
                      <label htmlFor="reactTerms">
                        I confirm this is a <strong>100% Free Industrial Program</strong> with ₹0 tuition fee, sponsored by VR PI Group. I agree to attend weekly sprint reviews and submit project milestones.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing Application...' : 'Submit Free Application'}
                      {!isSubmitting && (
                        <svg className={styles.btnArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successMessage}>
                  <div className={styles.successIconWrap}>✓</div>
                  <h3>Application Submitted Successfully!</h3>
                  <p>
                    Your Reference ID is <strong>{applicationId}</strong>. Our academic admissions desk will evaluate your profile and contact you via email within 48 business hours.
                  </p>
                  <div className={styles.successActions}>
                    <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={handleReset}>
                      Submit Another Application
                    </button>
                    <a href="#benefits" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
                      View Curriculum
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Support & Contact Cards (Recrot Pattern) */}
            <div className={styles.contactInfoBlock} id="contact">
              <div className={styles.contactInfoTitle}>
                <span className={styles.infoTag}>Admissions Helpdesk</span>
                <h2 className={styles.h4}>Contact Info</h2>
                <div className={styles.textSm}>
                  Have questions about domains, project allocations, or selection criteria? Contact our program coordinators directly.
                </div>
              </div>

              <div className={styles.contactButtonBlock}>
                <div className={styles.contactCard}>
                  <div className={styles.contactIconWrap}>📍</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Corporate Headquarters</span>
                    <span className={styles.contactValue}>VR PI Group, HITEC City, Madhapur, Hyderabad, Telangana 500081</span>
                  </div>
                </div>

                <a href="tel:+919121623456" className={styles.contactCard}>
                  <div className={styles.contactIconWrap}>📞</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Admissions Helpline</span>
                    <span className={styles.contactValue}>+91 91216 23456 / +91 40 4567 8900</span>
                  </div>
                </a>

                <a href="mailto:internships@vrpigroup.com" className={styles.contactCard}>
                  <div className={styles.contactIconWrap}>✉️</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Official Inquiries</span>
                    <span className={styles.contactValue}>internships@vrpigroup.com</span>
                  </div>
                </a>

                <div className={`${styles.contactCard} ${styles.noHover}`}>
                  <div className={styles.contactIconWrap}>🕒</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Office &amp; Review Hours</span>
                    <span className={styles.contactValue}>Monday – Saturday: 9:30 AM – 6:30 PM IST</span>
                  </div>
                </div>
              </div>

              <div className={styles.trustHighlightCard}>
                <div className={styles.trustHeader}>
                  <span className={styles.trustBadge}>CSR Initiative</span>
                  <h4>Why is this Internship 100% Free?</h4>
                </div>
                <p>
                  VR PI Group believes in empowering budding engineers and professionals. We do not charge students for technical training, portal access, project assignments, or certification. Selection is strictly merit and enthusiasm-based.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection} id="benefits">
        <div className={styles.container}>
          <div className={styles.sectionTitleWrap}>
            <span className={styles.subTitleV2}>Industrial Advantages</span>
            <h2 className={styles.sectionHeading}>Everything You Need for a High-Growth Corporate Career</h2>
            <p className={styles.sectionSubheading}>Designed for university students and fresh graduates who want practical execution over theoretical slideshows.</p>
          </div>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>💻</div>
              <h3 className={styles.benefitTitle}>Live Enterprise Codebases</h3>
              <p className={styles.benefitDesc}>Work on real client deliverables, microservices, and production pipelines instead of toy to-do apps. Build portfolio-ready software.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>👨‍💼</div>
              <h3 className={styles.benefitTitle}>1-on-1 Executive Mentorship</h3>
              <p className={styles.benefitDesc}>Weekly one-on-one code reviews, architectural feedback, and career guidance from senior tech leaders and department heads.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>📜</div>
              <h3 className={styles.benefitTitle}>Verified Certification &amp; LOR</h3>
              <p className={styles.benefitDesc}>Receive a tamper-proof QR-verifiable Internship Completion Certificate and formal Letter of Recommendation for top contributors.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🚀</div>
              <h3 className={styles.benefitTitle}>Pre-Placement Offer (PPO)</h3>
              <p className={styles.benefitDesc}>Exceptional interns are offered fast-track pre-placement offers (PPOs) across VR PI Group subsidiary companies.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>⏰</div>
              <h3 className={styles.benefitTitle}>Flexible Timings</h3>
              <p className={styles.benefitDesc}>College-friendly pacing with evening and weekend sprint catch-ups so your academic exams are never disrupted.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🛡️</div>
              <h3 className={styles.benefitTitle}>100% Free Guarantee</h3>
              <p className={styles.benefitDesc}>Zero deposit, zero study-material fee, zero test fee. Everything from software tools to mentor sessions is completely complimentary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className={styles.domainsSection} id="domains">
        <div className={styles.container}>
          <div className={styles.sectionTitleWrap}>
            <span className={styles.subTitleV2}>Specialized Tracks</span>
            <h2 className={styles.sectionHeading}>Available Internship Domains</h2>
            <p className={styles.sectionSubheading}>Choose the track that matches your technical passion and career goals.</p>
          </div>

          <div className={styles.domainsGrid}>
            {domains.map((dom, idx) => (
              <div key={idx} className={styles.domainCard}>
                <span className={styles.domainBadge}>{dom.badge}</span>
                <h3 className={styles.domainTitle}>{dom.title}</h3>
                <p className={styles.domainSummary}>{dom.summary}</p>
                <div className={styles.domainTags}>
                  {dom.tags.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
                <a
                  href="#apply"
                  className={styles.domainApplyLink}
                  onClick={() => setFormData(prev => ({ ...prev, domain: dom.domainValue }))}
                >
                  Apply For This Track &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection} id="faq">
        <div className={`${styles.container} ${styles.faqContainer}`}>
          <div className={styles.sectionTitleWrap}>
            <span className={styles.subTitleV2}>Clear Answers</span>
            <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubheading}>Everything you need to know about eligibility, selection, and program deliverables.</p>
          </div>

          <div className={styles.faqAccordion}>
            {faqs.map((f, i) => (
              <div key={i} className={`${styles.faqItem} ${activeFaq === i ? styles.faqItemActive : ''}`}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className={styles.faqChevron}>{activeFaq === i ? '▲' : '▼'}</span>
                </button>
                {activeFaq === i && (
                  <div className={styles.faqAnswer}>
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContentBlock}>
            <div>
              <h2 className={styles.ctaTitle}>Subscribe to VR PI Internship &amp; Placement Alerts</h2>
              <p className={styles.ctaDescription}>Receive notifications regarding upcoming cohort schedules, guest director lectures, and campus recruitment drives.</p>
            </div>
            <div className={styles.ctaFormBlock}>
              <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <input
                  type="email"
                  className={styles.newsletterInput}
                  placeholder="Enter your college or personal email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className={`${styles.btn} ${styles.btnSecondary}`}>
                  <span>Subscribe</span>
                </button>
              </form>
              {newsletterMsg && <span className={styles.newsletterStatus}>{newsletterMsg}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContentBlock}>
            <div className={styles.footerBrandColumn}>
              <a href="/" className={styles.brandLogo}>
                <span className={styles.logoAccent}>VR</span><span className={styles.logoLight}>PI</span>
                <span className={styles.logoTagLight}>GROUP OF COMPANIES</span>
              </a>
              <p className={styles.footerDesc}>
                VR PI Group is an integrated conglomerate operating across Technology Solutions, Infrastructure, Financial Services, and Global Trade.
              </p>
            </div>

            <div className={styles.footerLinksGroup}>
              <div className={styles.footerLinksBlock}>
                <h4 className={styles.footerLinkTitle}>Internship Tracks</h4>
                <div className={styles.footerLinksWrap}>
                  <a href="#domains" className={styles.footerLink}>Tech Solutions</a>
                  <a href="#domains" className={styles.footerLink}>Cloud &amp; AI</a>
                  <a href="#domains" className={styles.footerLink}>Civil BIM</a>
                  <a href="#domains" className={styles.footerLink}>Corporate Finance</a>
                </div>
              </div>

              <div className={styles.footerLinksBlock}>
                <h4 className={styles.footerLinkTitle}>Quick Links</h4>
                <div className={styles.footerLinksWrap}>
                  <a href="#about" className={styles.footerLink}>Program Overview</a>
                  <a href="#benefits" className={styles.footerLink}>Why Choose Us</a>
                  <a href="#apply" className={styles.footerLink}>Apply Now</a>
                  <a href="#faq" className={styles.footerLink}>Candidate FAQs</a>
                </div>
              </div>

              <div className={styles.footerLinksBlock}>
                <h4 className={styles.footerLinkTitle}>Group Entities</h4>
                <div className={styles.footerLinksWrap}>
                  <a href="https://vrpitechsolutions.com/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>VR PI Tech Solutions &nearr;</a>
                  <a href="/" className={styles.footerLink}>VR PI Constructions</a>
                  <a href="/" className={styles.footerLink}>VR PI Financial Services</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerBottomRow}>
            <p>&copy; 2026 VR PI Group of Companies. All Rights Reserved. Empowering future professionals through merit-based industrial internships.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

