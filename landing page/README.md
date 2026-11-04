# VR PI Group — Free Industrial Internship Landing Page

This folder contains the complete, self-contained landing page for **VR PI Group's 100% Free Industrial Internship Program 2026**, built with direct design reference to [recrot.webflow.io/contact-us](https://recrot.webflow.io/contact-us).

---

## 📁 Folder Structure

```
landing page/
├── index.html        # Standalone HTML5 landing page
├── style.css         # Modern responsive stylesheet (Recrot-inspired Webflow design)
├── script.js         # Interactive form validation, FAQ accordion, localStorage persistence
├── README.md         # Documentation and setup instructions
├── InternshipLandingPage.jsx  # React component for direct app integration
└── InternshipLandingPage.module.css # React CSS module
```

---

## 🌟 Key Features

1. **Recrot.webflow.io Inspired Design**:
   - Modern hero header with pill badge (`100% Free Industrial Internship • 2026 Batch`).
   - Clean 2-column layout matching Recrot's contact section (Application form on the left/main and Corporate support/contact cards on the right).
   - High-contrast typography (`Outfit` for bold modern headings, `Inter` for crisp body copy).
   - VR PI brand color palette (`#ff5722` vibrant orange, `#0f172a` obsidian, `#f8fafc` soft neutral background).

2. **Candidate Application Form**:
   - Fields: Full Name, Academic/Personal Email, WhatsApp/Phone Number, University/College Name, Degree & Year, Internship Domain Track, Preferred Mode (Virtual, Hybrid, On-site), Portfolio/LinkedIn URL, and Statement of Purpose.
   - Client-side validation with real-time error indicators.
   - Submission state generates an official Application ID (`VRPI-INT-2026-XXXX`).
   - Automatically stores applications in browser `localStorage` (`vrpi_internship_applications`).

3. **Corporate Contact Cards**:
   - Headquarters address: `8th Floor (B-Block), Meenakshi Tech Park, Phase-2, Gachibowli, Hyderabad, Telangana 500032, India`.
   - Direct helpline numbers and official inquiry email (`info@vrpigroup.co.in`).
   - Operating hours and sprint schedule.
   - CSR trust card explaining why the program is completely free with ₹0 tuition.

4. **Program Tracks & Benefits**:
   - 6 domain cards: Full Stack Web & Mobile, Cloud & AI Engineering, Civil BIM Modeling, Corporate Finance, Food Processing QA, and Management Consulting.
   - 6 core benefits: Live Production Repositories, 1-on-1 Director Mentorship, Verified Certificate & LOR, Pre-Placement Offer (PPO) opportunities, flexible timing, and 100% free guarantee.
   - Interactive FAQ accordion and newsletter subscription bar.

---

## 🚀 How to Run Standalone

You can open `index.html` directly in any web browser:

```powershell
# In PowerShell:
Start-Process "landing page\index.html"
```

Or serve with any static web server:

```powershell
npx serve "landing page"
```

---

## ⚛️ React Integration

The React version of this landing page is provided in `InternshipLandingPage.jsx` and can be imported directly into any React route (e.g., `/free-internship` or `/landing-page`).

