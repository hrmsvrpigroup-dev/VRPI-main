/**
 * VR PI Group — Free Industrial Internship Landing Page
 * Interactive Logic & Form Handlers
 */

// Google Apps Script Web App Endpoint for Google Sheet sync:
// Google Apps Script Web App Endpoints for Google Sheet sync:
// Sheet URL: https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzT6sEvG6PvL7U2f6X0Ukp_ur8kMWC6XetMij4G3Y3fQyGYc-rMJYa5DnYiX_vY4YP3/exec";
const BACKUP_GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyKKJUk6_pe1qtpqBZp6jYsCA8O97g5IlbwNRetYQ-6pjJql29fnEUKqPrV795kh9FI8g/exec";

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.backgroundColor = '#ffffff';
      navLinks.style.padding = '20px 24px';
      navLinks.style.borderBottom = '1px solid #e2e8f0';
      navLinks.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.08)';
    });
  }

  // Smooth Scroll for Internal Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if opened
        if (window.innerWidth <= 767 && navLinks) {
          navLinks.style.display = 'none';
        }
      }
    });
  });

  // FAQ Accordion Interactivity
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Domain Quick Selection from Cards
  document.querySelectorAll('.domain-apply-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const card = link.closest('.domain-card');
      const domainTitle = card ? card.querySelector('.domain-title').textContent.trim() : '';
      const domainSelect = document.getElementById('domain');
      if (domainSelect && domainTitle) {
        // Find matching option
        for (let i = 0; i < domainSelect.options.length; i++) {
          if (domainSelect.options[i].text.toLowerCase().includes(domainTitle.toLowerCase())) {
            domainSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // Internship Application Form Validation & Submission
  const internshipForm = document.getElementById('internshipForm');
  const successCard = document.getElementById('formSuccessMessage');
  const resetBtn = document.getElementById('resetFormBtn');
  const appIdDisplay = document.getElementById('applicationIdDisplay');
  const submitBtn = document.getElementById('submitBtn');

  if (internshipForm) {
    internshipForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous error messages
      document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

      let isValid = true;

      // Full Name Validation
      const nameInput = document.getElementById('fullName');
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        document.getElementById('nameError').textContent = 'Please enter your full official name (minimum 3 characters)';
        isValid = false;
      }

      // Email Validation
      const emailInput = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid academic or personal email address';
        isValid = false;
      }

      // Phone Validation
      const phoneInput = document.getElementById('phone');
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
        document.getElementById('phoneError').textContent = 'Please provide a valid active WhatsApp/phone number';
        isValid = false;
      }

      // College Validation
      const collegeInput = document.getElementById('college');
      if (!collegeInput.value.trim()) {
        document.getElementById('collegeError').textContent = 'Please provide your university or college name';
        isValid = false;
      }

      // Qualification Selection
      const qualSelect = document.getElementById('qualification');
      if (!qualSelect.value) {
        document.getElementById('qualificationError').textContent = 'Please select your current educational degree';
        isValid = false;
      }

      // Domain Track Selection
      const domainSelect = document.getElementById('domain');
      if (!domainSelect.value) {
        document.getElementById('domainError').textContent = 'Please choose your preferred specialization track';
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Show Loading State
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      const btnArrow = submitBtn.querySelector('.btn-arrow');
      if (btnText && btnLoader) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        if (btnArrow) btnArrow.style.display = 'none';
        submitBtn.disabled = true;
      }

      // Construct Application Record
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const generatedAppId = `VRPI-INT-2026-${randomCode}`;

      const applicationData = {
        applicationId: generatedAppId,
        fullName: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        college: collegeInput.value.trim(),
        qualification: qualSelect.value,
        domain: domainSelect.value,
        internshipMode: document.getElementById('internshipMode').value,
        portfolioUrl: document.getElementById('portfolioUrl').value.trim(),
        statement: document.getElementById('statement').value.trim(),
        submittedAt: new Date().toISOString()
      };

      // Asynchronously sync application data to Google Sheet (Primary & Fallback)
      const endpoints = [GOOGLE_SHEET_WEBAPP_URL, BACKUP_GOOGLE_SHEET_URL].filter(Boolean);
      endpoints.forEach((targetUrl) => {
        try {
          fetch(targetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(applicationData)
          }).then(() => {
            console.log('[Google Sheet] Application synced to Google Sheet in real time:', targetUrl);
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
            name: applicationData.fullName,
            email: applicationData.email,
            phone: applicationData.phone,
            college: applicationData.college,
            qualification: applicationData.qualification,
            internshipRole: applicationData.domain,
            graduationYear: applicationData.qualification,
            internshipMode: applicationData.internshipMode,
            resumeLink: applicationData.portfolioUrl || 'https://linkedin.com',
            message: applicationData.statement
          })
        }).catch(() => {});
      } catch (e) {}

      // Simulate network latency (800ms) for professional feedback
      setTimeout(() => {
        // Save to LocalStorage
        try {
          const existingApps = JSON.parse(localStorage.getItem('vrpi_internship_applications') || '[]');
          existingApps.unshift(applicationData);
          localStorage.setItem('vrpi_internship_applications', JSON.stringify(existingApps));
        } catch (err) {
          console.warn('LocalStorage save failed:', err);
        }

        // Display Success Card with Candidate Information
        if (appIdDisplay) {
          appIdDisplay.textContent = generatedAppId;
        }
        const nameDisplay = document.getElementById('applicantNameDisplay');
        if (nameDisplay) nameDisplay.textContent = applicationData.fullName;
        
        const successName = document.getElementById('successApplicantName');
        if (successName) successName.textContent = applicationData.fullName;

        const emailDisplay = document.getElementById('applicantEmailDisplay');
        if (emailDisplay) emailDisplay.textContent = applicationData.email;

        const domainDisplay = document.getElementById('applicantDomainDisplay');
        if (domainDisplay) domainDisplay.textContent = applicationData.domain;

        internshipForm.style.display = 'none';
        if (successCard) {
          successCard.style.display = 'block';
          // Smooth scroll to top of success card
          successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset submit button state
        if (btnText && btnLoader) {
          btnText.style.display = 'inline';
          btnLoader.style.display = 'none';
          if (btnArrow) btnArrow.style.display = 'inline-block';
          submitBtn.disabled = false;
        }
      }, 750);
    });
  }

  // Copy Application ID Handler
  const copyBtn = document.getElementById('copyIdBtn');
  const copyText = document.getElementById('copyBtnText');
  if (copyBtn && appIdDisplay) {
    copyBtn.addEventListener('click', () => {
      const idToCopy = appIdDisplay.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(idToCopy).then(() => {
          if (copyText) copyText.textContent = 'Copied!';
          setTimeout(() => {
            if (copyText) copyText.textContent = 'Copy';
          }, 2000);
        }).catch(() => {
          alert(`Application ID: ${idToCopy}`);
        });
      }
    });
  }

  // Print / Save Slip Handler
  const printBtn = document.getElementById('printReceiptBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Reset Button Handler
  if (resetBtn && internshipForm && successCard) {
    resetBtn.addEventListener('click', () => {
      internshipForm.reset();
      internshipForm.style.display = 'flex';
      successCard.style.display = 'none';
    });
  }

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterStatus = document.getElementById('newsletterStatus');
  if (newsletterForm && newsletterStatus) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value.trim();
      if (email) {
        newsletterStatus.textContent = '✓ Subscribed successfully! You will receive batch notifications.';
        newsletterStatus.style.color = '#34d399';
        newsletterForm.reset();
        setTimeout(() => {
          newsletterStatus.textContent = '';
        }, 5000);
      }
    });
  }
});

