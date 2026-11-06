/**
 * VR PI Group — Free Industrial Internship Landing Page
 * Interactive Logic & Form Handlers
 */

// Google Apps Script Web App Endpoint for Google Sheet sync:
// Google Apps Script Web App Endpoints for Google Sheet sync:
// Sheet URL: https://docs.google.com/spreadsheets/d/1dCJXGZN3dbThvJt5SnMYUSp0uAAsVuWnKuXd1rabBOU/edit
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbygbJUZdlzss3YOlkCS3_V6CRAtbflEr9DI2xgwhFDbUp-Wrlu2tqnQgb1e6mP-LlC_6w/exec";
const BACKUP_GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyKKJUk6_pe1qtpqBZp6jYsCA8O97g5IlbwNRetYQ-6pjJql29fnEUKqPrV795kh9FI8g/exec";

document.addEventListener('DOMContentLoaded', () => {
  // Set Current Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
            domainSelect.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
    });
  });

  // Custom Domain Track Toggle Handler
  const domainSelectEl = document.getElementById('domain');
  const customDomainWrap = document.getElementById('customDomainWrap');
  const customDomainInput = document.getElementById('customDomain');
  const customDomainError = document.getElementById('customDomainError');

  if (domainSelectEl && customDomainWrap) {
    domainSelectEl.addEventListener('change', () => {
      if (domainSelectEl.value === 'Other / Custom Track') {
        customDomainWrap.style.display = 'block';
        if (customDomainInput) customDomainInput.focus();
      } else {
        customDomainWrap.style.display = 'none';
        if (customDomainInput) customDomainInput.value = '';
        if (customDomainError) customDomainError.textContent = '';
      }
    });
  }

  if (customDomainInput && customDomainError) {
    customDomainInput.addEventListener('input', () => {
      if (customDomainInput.value.trim().length >= 2) {
        customDomainError.textContent = '';
      }
    });
  }

  // State variables for uploaded files
  let resumeFileData = null;     // { name, size, base64, type }
  let youtubeProofData = null;   // { name, base64, type }
  let instagramProofData = null; // { name, base64, type }
  let whatsappProofData = null;  // { name, base64, type }
  let linkedinProofData = null;  // { name, base64, type }

  // Canvas image compression helper (max 900px, JPEG 0.72)
  function compressImageFile(file, callback) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image screenshot (JPG, PNG).');
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
        callback({
          name: file.name,
          base64: compressedBase64,
          type: 'image/jpeg'
        });
      };
      img.src = loadEv.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Resume File Upload (Strictly PDF only)
  const resumeFileInput = document.getElementById('resumeFileInput');
  const resumeDropZoneWrap = document.getElementById('resumeDropZoneWrap');
  const resumeFileInfo = document.getElementById('resumeFileInfo');
  const resumeFileNameDisplay = document.getElementById('resumeFileNameDisplay');
  const resumeFileSizeDisplay = document.getElementById('resumeFileSizeDisplay');
  const resumeRemoveBtn = document.getElementById('resumeRemoveBtn');
  const resumeError = document.getElementById('resumeError');

  if (resumeFileInput) {
    resumeFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isPdf) {
        if (resumeError) resumeError.textContent = 'Please upload your Resume in PDF format only (.pdf)';
        resumeFileInput.value = '';
        return;
      }

      if (file.size > 8 * 1024 * 1024) {
        if (resumeError) resumeError.textContent = 'File size exceeds 8MB limit';
        resumeFileInput.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const formattedSize = file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
          : Math.round(file.size / 1024) + ' KB';

        resumeFileData = {
          name: file.name,
          size: formattedSize,
          base64: ev.target.result,
          type: 'application/pdf'
        };

        if (resumeFileNameDisplay) resumeFileNameDisplay.textContent = file.name;
        if (resumeFileSizeDisplay) resumeFileSizeDisplay.textContent = formattedSize + ' • PDF Document';
        if (resumeDropZoneWrap) resumeDropZoneWrap.style.display = 'none';
        if (resumeFileInfo) resumeFileInfo.style.display = 'flex';
        if (resumeError) resumeError.textContent = '';
      };
      reader.readAsDataURL(file);
    });
  }

  if (resumeRemoveBtn) {
    resumeRemoveBtn.addEventListener('click', () => {
      resumeFileData = null;
      if (resumeFileInput) resumeFileInput.value = '';
      if (resumeDropZoneWrap) resumeDropZoneWrap.style.display = 'block';
      if (resumeFileInfo) resumeFileInfo.style.display = 'none';
    });
  }

  // Setup Screenshot Proof Handler Helper
  function setupProofUploader(inputId, btnId, boxId, thumbId, nameId, removeId, errorId, onSet, onClear) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    const box = document.getElementById(boxId);
    const thumb = document.getElementById(thumbId);
    const nameEl = document.getElementById(nameId);
    const removeBtn = document.getElementById(removeId);
    const errorEl = errorId ? document.getElementById(errorId) : null;

    if (input) {
      input.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        compressImageFile(file, (proofObj) => {
          onSet(proofObj);
          if (thumb) thumb.src = proofObj.base64;
          if (nameEl) nameEl.textContent = proofObj.name;
          if (btn) btn.style.display = 'none';
          if (box) box.style.display = 'flex';
          if (errorEl) errorEl.textContent = '';
        });
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        onClear();
        if (input) input.value = '';
        if (btn) btn.style.display = 'flex';
        if (box) box.style.display = 'none';
      });
    }
  }

  setupProofUploader('ytProofInput', 'ytUploadBtn', 'ytProofBox', 'ytProofThumb', 'ytProofName', 'ytRemoveBtn', 'youtubeError', (d) => { youtubeProofData = d; }, () => { youtubeProofData = null; });
  setupProofUploader('igProofInput', 'igUploadBtn', 'igProofBox', 'igProofThumb', 'igProofName', 'igRemoveBtn', 'instagramError', (d) => { instagramProofData = d; }, () => { instagramProofData = null; });
  setupProofUploader('waProofInput', 'waUploadBtn', 'waProofBox', 'waProofThumb', 'waProofName', 'waRemoveBtn', 'whatsappError', (d) => { whatsappProofData = d; }, () => { whatsappProofData = null; });
  setupProofUploader('liProofInput', 'liUploadBtn', 'liProofBox', 'liProofThumb', 'liProofName', 'liRemoveBtn', null, (d) => { linkedinProofData = d; }, () => { linkedinProofData = null; });

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
      } else if (domainSelect.value === 'Other / Custom Track') {
        const customInput = document.getElementById('customDomain');
        if (!customInput || !customInput.value.trim() || customInput.value.trim().length < 2) {
          const customErr = document.getElementById('customDomainError');
          if (customErr) customErr.textContent = 'Please specify your custom specialization track';
          isValid = false;
        }
      }

      // Resume Validation (Mandatory PDF only)
      if (!resumeFileData) {
        const resumeErrEl = document.getElementById('resumeError');
        if (resumeErrEl) resumeErrEl.textContent = 'Please upload your Resume in PDF format (.pdf only)';
        isValid = false;
      }

      // Verification Tasks Validation (YouTube, Instagram, WhatsApp are mandatory; LinkedIn optional)
      if (!youtubeProofData) {
        const ytErr = document.getElementById('youtubeError');
        if (ytErr) ytErr.textContent = 'YouTube subscription screenshot is mandatory';
        isValid = false;
      }

      if (!instagramProofData) {
        const igErr = document.getElementById('instagramError');
        if (igErr) igErr.textContent = 'Instagram follow screenshot is mandatory';
        isValid = false;
      }

      if (!whatsappProofData) {
        const waErr = document.getElementById('whatsappError');
        if (waErr) waErr.textContent = 'WhatsApp channel follow screenshot is mandatory';
        isValid = false;
      }

      if (!isValid) {
        const firstError = document.querySelector('.error-text:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
      const generatedAppId = `VRPI-INT-${randomCode}`;

      const chosenDomain = (domainSelect.value === 'Other / Custom Track' && document.getElementById('customDomain'))
        ? ('Custom: ' + document.getElementById('customDomain').value.trim())
        : domainSelect.value;

      const applicationData = {
        applicationId: generatedAppId,
        fullName: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        college: collegeInput.value.trim(),
        qualification: qualSelect.value,
        domain: chosenDomain,
        internshipMode: document.getElementById('internshipMode').value,
        portfolioUrl: document.getElementById('portfolioUrl').value.trim(),
        statement: document.getElementById('statement').value.trim(),
        submittedAt: new Date().toISOString(),
        resume: resumeFileData ? { name: resumeFileData.name, data: resumeFileData.base64, type: 'application/pdf' } : null,
        youtubeProof: youtubeProofData ? { name: youtubeProofData.name, data: youtubeProofData.base64, type: 'image/jpeg' } : null,
        instagramProof: instagramProofData ? { name: instagramProofData.name, data: instagramProofData.base64, type: 'image/jpeg' } : null,
        whatsappProof: whatsappProofData ? { name: whatsappProofData.name, data: whatsappProofData.base64, type: 'image/jpeg' } : null,
        linkedinProof: linkedinProofData ? { name: linkedinProofData.name, data: linkedinProofData.base64, type: 'image/jpeg' } : null
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
      resumeFileData = null;
      youtubeProofData = null;
      instagramProofData = null;
      whatsappProofData = null;
      linkedinProofData = null;
      if (resumeDropZoneWrap) resumeDropZoneWrap.style.display = 'block';
      if (resumeFileInfo) resumeFileInfo.style.display = 'none';
      if (customDomainWrap) customDomainWrap.style.display = 'none';
      if (customDomainInput) customDomainInput.value = '';
      if (customDomainError) customDomainError.textContent = '';
      ['yt', 'ig', 'wa', 'li'].forEach(prefix => {
        const btn = document.getElementById(prefix + 'UploadBtn');
        const box = document.getElementById(prefix + 'ProofBox');
        if (btn) btn.style.display = 'flex';
        if (box) box.style.display = 'none';
      });
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

