import React, { useState } from 'react';
import styles from './InternshipLandingPage.module.css';
import vrpiLogo from './vrpiLogo.png';
import {
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaFilePdf,
  FaExternalLinkAlt,
  FaCloudUploadAlt,
  FaTimes
} from 'react-icons/fa';

// Google Apps Script Web App Endpoints for Google Sheet sync:
// Sheet: https://docs.google.com/spreadsheets/d/1dCJXGZN3dbThvJt5SnMYUSp0uAAsVuWnKuXd1rabBOU/edit
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzTPKjM8bd_OoFlbXqIgH0SeiJwGzkJIInSsuXH0xhiD3udNo9yG3lhod1V-M78Et7F/exec";
const BACKUP_GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbygbJUZdlzss3YOlkCS3_V6CRAtbflEr9DI2xgwhFDbUp-Wrlu2tqnQgb1e6mP-LlC_6w/exec";

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

  const [resumeFile, setResumeFile] = useState(null); // { name, size, base64, type }
  const [youtubeProof, setYoutubeProof] = useState(null); // { name, base64, type }
  const [instagramProof, setInstagramProof] = useState(null); // { name, base64, type }
  const [whatsappProof, setWhatsappProof] = useState(null); // { name, base64, type }
  const [linkedinProof, setLinkedinProof] = useState(null); // { name, base64, type }
  const [customDomain, setCustomDomain] = useState('');
  const [submittedDomain, setSubmittedDomain] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  // Resume file handler (Strictly PDF format only)
  const handleResumeChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setErrors(prev => ({ ...prev, resume: 'Please upload your resume in PDF format only (.pdf)' }));
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'File size must be under 8MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const formattedSize = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        : Math.round(file.size / 1024) + ' KB';

      setResumeFile({
        name: file.name,
        size: formattedSize,
        base64: event.target.result,
        type: 'application/pdf'
      });
      setErrors(prev => ({ ...prev, resume: '' }));
    };
    reader.readAsDataURL(file);
  };

  const removeResume = () => {
    setResumeFile(null);
  };

  // Screenshot proof upload handler with client-side canvas compression (max 900px, JPEG 0.72)
  const handleScreenshotChange = (field, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, [field + 'Proof']: 'Please upload an image screenshot (PNG, JPG, JPEG)' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEv) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 900;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.72);

        const proofData = {
          name: file.name,
          base64: compressedBase64,
          type: 'image/jpeg'
        };

        if (field === 'youtube') setYoutubeProof(proofData);
        else if (field === 'instagram') setInstagramProof(proofData);
        else if (field === 'whatsapp') setWhatsappProof(proofData);
        else if (field === 'linkedin') setLinkedinProof(proofData);

        setErrors(prev => ({ ...prev, [field + 'Proof']: '' }));
      };
      img.src = loadEv.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removeScreenshot = (field) => {
    if (field === 'youtube') setYoutubeProof(null);
    else if (field === 'instagram') setInstagramProof(null);
    else if (field === 'whatsapp') setWhatsappProof(null);
    else if (field === 'linkedin') setLinkedinProof(null);
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
    } else if (formData.domain === 'Other / Custom Track' && (!customDomain.trim() || customDomain.trim().length < 2)) {
      newErrors.customDomain = 'Please specify your custom specialization track';
    }

    // Resume validation (Mandatory, PDF only)
    if (!resumeFile) {
      newErrors.resume = 'Please upload your Resume / CV in PDF format only (.pdf)';
    }

    // Social Verification Tasks (YouTube, Instagram, WhatsApp are mandatory; LinkedIn is optional)
    if (!youtubeProof) {
      newErrors.youtubeProof = 'YouTube subscription screenshot is mandatory';
    }
    if (!instagramProof) {
      newErrors.instagramProof = 'Instagram follow screenshot is mandatory';
    }
    if (!whatsappProof) {
      newErrors.whatsappProof = 'WhatsApp channel follow screenshot is mandatory';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector(`.${styles.inputError}, .${styles.errorText}`);
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    const code = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `VRPI-INT-${code}`;

    const chosenDomain = formData.domain === 'Other / Custom Track'
      ? `Custom: ${customDomain.trim()}`
      : formData.domain;
    setSubmittedDomain(chosenDomain);

    const newApplication = {
      ...formData,
      domain: chosenDomain,
      applicationId: generatedId,
      submittedAt: new Date().toISOString(),
      resume: resumeFile ? { name: resumeFile.name, data: resumeFile.base64, type: 'application/pdf' } : null,
      youtubeProof: youtubeProof ? { name: youtubeProof.name, data: youtubeProof.base64, type: 'image/jpeg' } : null,
      instagramProof: instagramProof ? { name: instagramProof.name, data: instagramProof.base64, type: 'image/jpeg' } : null,
      whatsappProof: whatsappProof ? { name: whatsappProof.name, data: whatsappProof.base64, type: 'image/jpeg' } : null,
      linkedinProof: linkedinProof ? { name: linkedinProof.name, data: linkedinProof.base64, type: 'image/jpeg' } : null
    };

    // Asynchronously sync to Google Sheet via Google Apps Script Web App (Primary & Fallback)
    const endpoints = [GOOGLE_SHEET_WEBAPP_URL, BACKUP_GOOGLE_SHEET_URL].filter(Boolean);
    endpoints.forEach((targetUrl) => {
      try {
        fetch(targetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(newApplication)
        }).then(() => {
          console.log('[Google Sheet] Application synced successfully to endpoint:', targetUrl);
        }).catch((err) => {
          console.warn('[Google Sheet] Sync note:', err);
        });
      } catch (syncErr) {
        console.warn('[Google Sheet] Sync error:', syncErr);
      }
    });

    // Also forward to local/cloud backend API
    try {
      fetch('/api/apply-internship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          qualification: formData.qualification,
          internshipRole: chosenDomain,
          graduationYear: formData.qualification,
          internshipMode: formData.internshipMode,
          resumeLink: formData.portfolioUrl || 'https://linkedin.com',
          message: formData.statement
        })
      }).catch(() => {});
    } catch (e) {}

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('vrpi_internship_applications') || '[]');
        existing.unshift(newApplication);
        localStorage.setItem('vrpi_internship_applications', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

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
    setCustomDomain('');
    setSubmittedDomain('');
    setResumeFile(null);
    setYoutubeProof(null);
    setInstagramProof(null);
    setWhatsappProof(null);
    setLinkedinProof(null);
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
            <span className={styles.announcementPill}>Admissions Open</span>
            <span>Applications for Summer &amp; Fall Free Industrial Internship are now live. Zero Tuition Fee.</span>
            <a href="#apply" className={styles.announcementLink}>Apply Now &rarr;</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={styles.siteHeader}>
        <div className={`${styles.container} ${styles.headerFlex}`}>
          <a href="/" className={styles.brandLogo} aria-label="VR PI Group">
            <img src={vrpiLogo} alt="VR PI Group of Companies" className={styles.siteLogoImg} />
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
              <span className={styles.badgePulseGlow}></span>
              <span className={styles.badgeIcon}>★</span>
              <span>100% Free Industrial Internship • Admissions Open</span>
            </div>

            <h1 className={styles.bannerTitle}>
              Launch Your Career with <span className={styles.highlightText}>VR PI Free Industrial</span> Internship
            </h1>

            <p className={styles.bannerDescription}>
              Bridging the academic-to-corporate gap. Work on live enterprise client projects under executive industry directors across Software, AI, Civil Infra, Finance, and Management. Absolutely zero training charges.
            </p>

            <div className={styles.bannerStatsRow}>
              <div className={styles.statPill}>
                <span className={styles.statMicroTag}>Sponsored</span>
                <strong className={styles.statNumber}>₹0</strong>
                <span className={styles.statLabel}>Zero Tuition Fee</span>
              </div>
              <div className={styles.statPill}>
                <span className={styles.statMicroTag}>Fast-Track</span>
                <strong className={styles.statNumber}>0–4</strong>
                <span className={styles.statLabel}>Weeks Duration</span>
              </div>
              <div className={styles.statPill}>
                <span className={styles.statMicroTag}>Alumni</span>
                <strong className={styles.statNumber}>1,250+</strong>
                <span className={styles.statLabel}>Interns Trained</span>
              </div>
              <div className={styles.statPill}>
                <span className={styles.statMicroTag}>Credential</span>
                <strong className={styles.statNumber}>100%</strong>
                <span className={styles.statLabel}>Verified LOR &amp; Certificate</span>
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
                          <option value="B.Tech / B.E (Engineering)">B.Tech / B.E (Engineering)</option>
                          <option value="MCA / BCA (Computer Applications)">MCA / BCA (Computer Applications)</option>
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
                          <option value="Other / Custom Track">✨ Other / Custom Track (Specify Below)</option>
                        </select>
                        {errors.domain && <span className={styles.errorText}>{errors.domain}</span>}

                        {formData.domain === 'Other / Custom Track' && (
                          <div style={{ marginTop: '8px' }}>
                            <input
                              type="text"
                              className={styles.inputField}
                              placeholder="Type your custom track (e.g. Cyber Security, UI/UX, Data Science...)"
                              value={customDomain}
                              onChange={(e) => {
                                setCustomDomain(e.target.value);
                                if (errors.customDomain) setErrors(prev => ({ ...prev, customDomain: '' }));
                              }}
                              autoFocus
                            />
                            {errors.customDomain && <span className={styles.errorText}>{errors.customDomain}</span>}
                          </div>
                        )}
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

                    {/* Resume Upload Field (PDF Format Only) */}
                    <div className={styles.resumeSection}>
                      <div className={styles.resumeLabelRow}>
                        <label className={styles.inputLabel} htmlFor="resumeFileInput">
                          Resume / CV (PDF Only) <span className={styles.required}>*</span>
                        </label>
                        <span className={styles.resumeFormatBadge}>PDF • Max 8MB</span>
                      </div>
                      
                      {!resumeFile ? (
                        <label
                          htmlFor="resumeFileInput"
                          className={`${styles.resumeDropZone} ${errors.resume ? styles.inputError : ''}`}
                        >
                          <input
                            id="resumeFileInput"
                            type="file"
                            accept=".pdf,application/pdf"
                            className={styles.taskFileInputHidden}
                            onChange={handleResumeChange}
                          />
                          <div className={styles.resumeIconWrap}>
                            <FaFilePdf />
                          </div>
                          <div className={styles.resumeTitle}>Click or Drag to Upload Resume</div>
                          <div className={styles.resumeHint}>PDF format only • File size up to 8MB</div>
                          <span className={styles.resumeBrowseBtn}>
                            <FaCloudUploadAlt /> Browse PDF File
                          </span>
                        </label>
                      ) : (
                        <div className={styles.resumeFileInfo}>
                          <div className={styles.resumeFileDetails}>
                            <div className={styles.resumeFileBadge}>
                              <FaFilePdf className={styles.resumeFileIcon} />
                            </div>
                            <div>
                              <div className={styles.resumeFileName}>{resumeFile.name}</div>
                              <div className={styles.resumeFileMeta}>
                                <span className={styles.resumeFileSize}>{resumeFile.size}</span>
                                <span className={styles.resumeVerifiedTag}>✓ PDF Attached</span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className={styles.fileRemoveBtn}
                            onClick={removeResume}
                            title="Remove and select another file"
                          >
                            <FaTimes /> Change
                          </button>
                        </div>
                      )}
                      {errors.resume && <span className={styles.errorText}>{errors.resume}</span>}
                    </div>

                    {/* Social Verification Tasks Block */}
                    <div className={styles.verificationTasksBlock}>
                      <div className={styles.tasksHeaderBlock}>
                        <span className={styles.tasksBadge}>MANDATORY VERIFICATION TASKS</span>
                        <h4 className={styles.tasksMainTitle}>Complete Social Tasks &amp; Upload Screenshot Proof</h4>
                        <p className={styles.tasksSubtitle}>
                          Follow our official channels to qualify for the 100% Free Internship. YouTube, Instagram, and WhatsApp are mandatory; LinkedIn is optional. Upload a screenshot proof for each.
                        </p>
                      </div>

                      <div className={styles.tasksCardsGrid}>
                        {/* 1. YouTube (Mandatory) */}
                        <div className={styles.taskItemCard}>
                          <div className={styles.taskItemHeader}>
                            <div className={styles.taskPlatformLeft}>
                              <div className={`${styles.platformIconWrap} ${styles.ytIcon}`}>
                                <FaYoutube />
                              </div>
                              <div>
                                <div className={styles.taskTitleText}>YouTube Channel</div>
                                <a
                                  href="https://youtube.com/@vrpitechsolutions?si=bi-gMNum0Am-3pmL"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.taskActionBtn}
                                >
                                  Subscribe Channel <FaExternalLinkAlt size={10} />
                                </a>
                              </div>
                            </div>
                            <span className={styles.taskTagMandatory}>Required *</span>
                          </div>

                          <div className={styles.taskUploadWrap}>
                            {!youtubeProof ? (
                              <label className={styles.uploadProofBtn}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className={styles.taskFileInputHidden}
                                  onChange={(e) => handleScreenshotChange('youtube', e)}
                                />
                                <FaCloudUploadAlt size={16} /> Upload Screenshot Proof
                              </label>
                            ) : (
                              <div className={styles.proofSuccessBox}>
                                <div className={styles.proofThumbWrap}>
                                  <img src={youtubeProof.base64} alt="YouTube Proof" className={styles.proofThumb} />
                                  <span className={styles.proofName} title={youtubeProof.name}>{youtubeProof.name}</span>
                                </div>
                                <button
                                  type="button"
                                  className={styles.proofRemoveBtn}
                                  onClick={() => removeScreenshot('youtube')}
                                  title="Remove proof"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            )}
                          </div>
                          {errors.youtubeProof && <span className={styles.errorText}>{errors.youtubeProof}</span>}
                        </div>

                        {/* 2. Instagram (Mandatory) */}
                        <div className={styles.taskItemCard}>
                          <div className={styles.taskItemHeader}>
                            <div className={styles.taskPlatformLeft}>
                              <div className={`${styles.platformIconWrap} ${styles.instaIcon}`}>
                                <FaInstagram />
                              </div>
                              <div>
                                <div className={styles.taskTitleText}>Instagram Page</div>
                                <a
                                  href="https://www.instagram.com/vrpitechsolutions?rpxt=eGM0Z3doenN6aTRs"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.taskActionBtn}
                                >
                                  Follow Instagram <FaExternalLinkAlt size={10} />
                                </a>
                              </div>
                            </div>
                            <span className={styles.taskTagMandatory}>Required *</span>
                          </div>

                          <div className={styles.taskUploadWrap}>
                            {!instagramProof ? (
                              <label className={styles.uploadProofBtn}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className={styles.taskFileInputHidden}
                                  onChange={(e) => handleScreenshotChange('instagram', e)}
                                />
                                <FaCloudUploadAlt size={16} /> Upload Screenshot Proof
                              </label>
                            ) : (
                              <div className={styles.proofSuccessBox}>
                                <div className={styles.proofThumbWrap}>
                                  <img src={instagramProof.base64} alt="Instagram Proof" className={styles.proofThumb} />
                                  <span className={styles.proofName} title={instagramProof.name}>{instagramProof.name}</span>
                                </div>
                                <button
                                  type="button"
                                  className={styles.proofRemoveBtn}
                                  onClick={() => removeScreenshot('instagram')}
                                  title="Remove proof"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            )}
                          </div>
                          {errors.instagramProof && <span className={styles.errorText}>{errors.instagramProof}</span>}
                        </div>

                        {/* 3. WhatsApp Channel (Mandatory) */}
                        <div className={styles.taskItemCard}>
                          <div className={styles.taskItemHeader}>
                            <div className={styles.taskPlatformLeft}>
                              <div className={`${styles.platformIconWrap} ${styles.waIcon}`}>
                                <FaWhatsapp />
                              </div>
                              <div>
                                <div className={styles.taskTitleText}>WhatsApp Channel</div>
                                <a
                                  href="https://whatsapp.com/channel/0029VbCkRWbIHphGP6mW1A1V"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.taskActionBtn}
                                >
                                  Follow 24/7 Channel <FaExternalLinkAlt size={10} />
                                </a>
                              </div>
                            </div>
                            <span className={styles.taskTagMandatory}>Required *</span>
                          </div>

                          <div className={styles.taskUploadWrap}>
                            {!whatsappProof ? (
                              <label className={styles.uploadProofBtn}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className={styles.taskFileInputHidden}
                                  onChange={(e) => handleScreenshotChange('whatsapp', e)}
                                />
                                <FaCloudUploadAlt size={16} /> Upload Screenshot Proof
                              </label>
                            ) : (
                              <div className={styles.proofSuccessBox}>
                                <div className={styles.proofThumbWrap}>
                                  <img src={whatsappProof.base64} alt="WhatsApp Proof" className={styles.proofThumb} />
                                  <span className={styles.proofName} title={whatsappProof.name}>{whatsappProof.name}</span>
                                </div>
                                <button
                                  type="button"
                                  className={styles.proofRemoveBtn}
                                  onClick={() => removeScreenshot('whatsapp')}
                                  title="Remove proof"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            )}
                          </div>
                          {errors.whatsappProof && <span className={styles.errorText}>{errors.whatsappProof}</span>}
                        </div>

                        {/* 4. LinkedIn (Optional) */}
                        <div className={styles.taskItemCard}>
                          <div className={styles.taskItemHeader}>
                            <div className={styles.taskPlatformLeft}>
                              <div className={`${styles.platformIconWrap} ${styles.liIcon}`}>
                                <FaLinkedin />
                              </div>
                              <div>
                                <div className={styles.taskTitleText}>LinkedIn Page</div>
                                <a
                                  href="https://www.linkedin.com/company/vr-pi-tech-solutions-llp-in/home/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.taskActionBtn}
                                >
                                  Follow LinkedIn <FaExternalLinkAlt size={10} />
                                </a>
                              </div>
                            </div>
                            <span className={styles.taskTagOptional}>Optional</span>
                          </div>

                          <div className={styles.taskUploadWrap}>
                            {!linkedinProof ? (
                              <label className={styles.uploadProofBtn}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className={styles.taskFileInputHidden}
                                  onChange={(e) => handleScreenshotChange('linkedin', e)}
                                />
                                <FaCloudUploadAlt size={16} /> Upload Proof (Optional)
                              </label>
                            ) : (
                              <div className={styles.proofSuccessBox}>
                                <div className={styles.proofThumbWrap}>
                                  <img src={linkedinProof.base64} alt="LinkedIn Proof" className={styles.proofThumb} />
                                  <span className={styles.proofName} title={linkedinProof.name}>{linkedinProof.name}</span>
                                </div>
                                <button
                                  type="button"
                                  className={styles.proofRemoveBtn}
                                  onClick={() => removeScreenshot('linkedin')}
                                  title="Remove proof"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
                  <div className={styles.successIconWrap}>
                    <span className={styles.successIconPulse}></span>
                    <span className={styles.successCheckmark}>✓</span>
                  </div>

                  <div className={styles.successStatusBadge}>
                    <span className={styles.badgeDotGreen}></span>
                    <span>Application Verified &amp; Recorded</span>
                  </div>

                  <h3 className={styles.successTitle}>Application Received Successfully!</h3>
                  <p className={styles.successSubtitle}>
                    Thank you, <strong>{formData.fullName}</strong>! Your application for the <strong>VR PI Free Industrial Internship Program</strong> has been logged into our technical admissions portal.
                  </p>

                  {/* Digital Admission Slip / Receipt */}
                  <div className={styles.admissionReceiptCard}>
                    <div className={styles.receiptHeader}>
                      <div className={styles.receiptBrand}>
                        <img src={vrpiLogo} alt="VR PI Group of Companies" className={styles.receiptBrandLogoImg} />
                        <span className={styles.receiptBrandTag}>ADMISSIONS SLIP</span>
                      </div>
                    </div>

                    <div className={styles.receiptGrid}>
                      <div className={styles.receiptItem}>
                        <span className={styles.receiptLabel}>Candidate Name</span>
                        <span className={styles.receiptVal}>{formData.fullName}</span>
                      </div>
                      <div className={styles.receiptItem}>
                        <span className={styles.receiptLabel}>Registered Email</span>
                        <span className={styles.receiptVal}>{formData.email}</span>
                      </div>
                      <div className={styles.receiptItem}>
                        <span className={styles.receiptLabel}>Selected Track</span>
                        <span className={`${styles.receiptVal} ${styles.receiptValHighlight}`}>{submittedDomain || formData.domain}</span>
                      </div>
                      <div className={styles.receiptItem}>
                        <span className={styles.receiptLabel}>Program Duration</span>
                        <span className={styles.receiptVal}>0–4 Weeks (₹0 Tuition)</span>
                      </div>
                    </div>

                    <div className={styles.receiptFooterStatus}>
                      <div className={styles.statusIndicator}>
                        <span className={styles.statusPulseDot}></span>
                        <span><strong>Status:</strong> Under Technical Review</span>
                      </div>
                      <span className={styles.slaText}>Target SLA: Response within 48 Business Hours</span>
                    </div>
                  </div>

                  {/* Next Steps Roadmap */}
                  <div className={styles.nextStepsSection}>
                    <h4 className={styles.nextStepsTitle}>What Happens Next?</h4>
                    <div className={styles.nextStepsGrid}>
                      <div className={styles.nextStepCard}>
                        <div className={styles.nextStepNum}>1</div>
                        <div className={styles.nextStepContent}>
                          <h5>Academic Screening</h5>
                          <p>Admissions committee reviews your degree &amp; interest statement.</p>
                        </div>
                      </div>
                      <div className={styles.nextStepCard}>
                        <div className={styles.nextStepNum}>2</div>
                        <div className={styles.nextStepContent}>
                          <h5>Onboarding Invitation</h5>
                          <p>Selected candidates receive sprint portal link &amp; batch schedule via email.</p>
                        </div>
                      </div>
                      <div className={styles.nextStepCard}>
                        <div className={styles.nextStepNum}>3</div>
                        <div className={styles.nextStepContent}>
                          <h5>Live Project Kickoff</h5>
                          <p>Assigned mentor director and work on real enterprise client deliverables.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={styles.successActions}>
                    <a href="#benefits" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>
                      Explore Curriculum
                    </a>
                    <button type="button" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`} onClick={handleReset}>
                      Submit Another Application
                    </button>
                  </div>

                  <div className={styles.successHelpNote}>
                    Need help or want to make updates? Email <strong>info@vrpigroup.co.in</strong> or call <strong>+91 91216 23456</strong>.
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
                    <span className={styles.contactValue}>8th Floor (B-Block), Meenakshi Tech Park, Phase-2, Gachibowli, Hyderabad, Telangana 500032, India</span>
                  </div>
                </div>

                <a href="tel:+919121623456" className={styles.contactCard}>
                  <div className={styles.contactIconWrap}>📞</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Admissions Helpline</span>
                    <span className={styles.contactValue}>+91 91216 23456 / +91 40 4567 8900</span>
                  </div>
                </a>

                <a href="mailto:info@vrpigroup.co.in" className={styles.contactCard}>
                  <div className={styles.contactIconWrap}>✉️</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Official Inquiries</span>
                    <span className={styles.contactValue}>info@vrpigroup.co.in</span>
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
              <a href="/" className={styles.brandLogo} aria-label="VR PI Group">
                <div className={styles.footerLogoWrap}>
                  <img src={vrpiLogo} alt="VR PI Group of Companies" className={`${styles.siteLogoImg} ${styles.footerLogoImg}`} />
                </div>
                <span className={styles.logoTagLight}>INTERNSHIPS</span>
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
            <p>&copy; {new Date().getFullYear()} VR PI Group of Companies. All Rights Reserved. Empowering future professionals through merit-based industrial internships.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Floating Quick Action Pill */}
      <div className={styles.mobileStickyCtaBar}>
        <div className={styles.mobileStickyInner}>
          <div className={styles.mobileStickyText}>
            <span className={styles.stickyLivePulse}></span>
            <span>Batch Admissions Open (₹0 Fee)</span>
          </div>
          <a href="#apply" className={styles.mobileStickyBtn}>
            Apply Now ↗
          </a>
        </div>
      </div>
    </div>
  );
}

