# Google Sheet Integration Guide for VR PI Internship Applications

This guide explains how to connect your Google Sheet to the Free Industrial Internship Landing Page so that every student application is automatically saved into your spreadsheet in real time.

---

## 📊 Your Target Google Sheet

**URL**: [https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit](https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit)  
**Spreadsheet ID**: `18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA`

---

## ⚡ Step-by-Step Setup (Takes 2 Minutes)

### Step 1: Open Apps Script in your Google Sheet
1. Open your Google Sheet in your web browser.
2. In the top menu bar, click on **Extensions** &rarr; **Apps Script**.
3. A new tab will open with the script editor containing an empty `Code.gs` file.

### Step 2: Paste the Collector Script
1. Delete any existing code in the editor (`function myFunction() { ... }`).
2. Open [`landing page/GoogleAppsScript.js`](./GoogleAppsScript.js) in your project.
3. Copy the entire contents and paste it into the Apps Script editor.
4. Click the **Save** icon at the top (or press `Ctrl + S`).

### Step 3: Deploy as a Web App
1. In the top right corner of Apps Script, click the blue **Deploy** button &rarr; select **New deployment**.
2. Click the gear icon (**Select type**) next to "Select type" and choose **Web app**.
3. Configure the settings:
   - **Description**: `VR PI Internship Application Collector`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(⚠️ Crucial: Must be "Anyone" so students submitting the form from any device can submit without needing Google account permission).*
4. Click **Deploy**.

### Step 4: Authorize Permissions
1. Google will show an "Authorization required" popup. Click **Authorize access**.
2. Choose your Google account.
3. Click **Advanced** (at the bottom of the warning screen).
4. Click **Go to Untitled project (unsafe)**.
5. Click **Allow**.

### Step 5: Copy Your Web App URL
1. You will see a popup showing:
   - **Web app URL**: `https://script.google.com/macros/s/AKfycb.../exec`
2. Copy this URL.

### Step 6: Paste the URL in the Landing Page
Open [`landing page/script.js`](./script.js) and [`landing page/InternshipLandingPage.jsx`](./InternshipLandingPage.jsx):
Find the line:
```javascript
const GOOGLE_SCRIPT_WEBAPP_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```
Paste your copied Web App URL inside the quotation marks!

---

## 📋 What Gets Saved to the Google Sheet?

Every time a student submits an application, the script appends a new row with:
1. **Timestamp**: Date & Time (IST)
2. **Application ID**: Unique tracking code (`VRPI-INT-2026-XXXX`)
3. **Full Name**: Official candidate name
4. **Email Address**: Registered student email
5. **WhatsApp / Phone**: Contact number
6. **College / University**: Academic institution
7. **Degree / Passing Year**: e.g., B.Tech CSE (2024-2027)
8. **Internship Domain Track**: e.g., Tech Solutions, AI, Civil, etc.
9. **Preferred Mode**: Virtual / Remote, Hybrid, or On-Site
10. **Portfolio / LinkedIn**: Profile link
11. **Statement of Purpose**: Candidate's motivation statement
12. **Status**: Set automatically to `Under Review`

