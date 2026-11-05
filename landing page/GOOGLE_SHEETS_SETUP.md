# 📊 Automated Google Sheet Integration Guide

**Your Spreadsheet URL**: [https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit?usp=sharing](https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit?usp=sharing)  
**Spreadsheet ID**: `18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA`  
**Target Tab**: `Sheet1` (First Tab)  
**Active Web App Endpoint**: `https://script.google.com/macros/s/AKfycbygbJUZdlzss3YOlkCS3_V6CRAtbflEr9DI2xgwhFDbUp-Wrlu2tqnQgb1e6mP-LlC_6w/exec`  
**Deployment ID**: `AKfycbygbJUZdlzss3YOlkCS3_V6CRAtbflEr9DI2xgwhFDbUp-Wrlu2tqnQgb1e6mP-LlC_6w`

---

## 🚀 How to Enable Automatic Form Filling (Takes 2 Minutes)

### Step 1: Open Apps Script in Your Google Sheet
1. Open your Google Sheet in Chrome: [https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit](https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit)
2. In the top menu bar, click **Extensions** &rarr; **Apps Script**.
3. The Apps Script editor tab will open (`Untitled project - Project Editor`).

---

### Step 2: Paste the Updated Collector Script
1. Delete any existing code inside `Code.gs`.
2. Copy the entire contents of [`landing page/GoogleAppsScript.js`](./GoogleAppsScript.js).
3. Paste it directly into `Code.gs`.
4. Press `Ctrl + S` to save the project.

---

### Step 3: Automatically Generate the 12 Headers (Instant)
1. At the top of the Apps Script screen, locate the function dropdown (it currently says `doPost` or `myFunction`).
2. Click the dropdown and select **`createHeadersNow`**.
3. Click the **Run** button (play icon ▶️).
4. If Google asks for authorization:
   - Click **Review permissions** &rarr; select your Google account.
   - Click **Advanced** (small link at bottom left) &rarr; click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
5. Switch to your Google Sheet tab — all 12 official orange column headers will instantly appear on **`Sheet1`**!

---

### Step 4: Test Automatic Row Insertion (Instant Verification)
1. In Apps Script, select **`testInsert`** from the top function dropdown.
2. Click **Run** (▶️).
3. Switch to your Google Sheet — row 2 will immediately fill with a sample test candidate application!

---

### Step 5: Deploy with Public Access ("Anyone")
⚠️ **This is the critical step so candidate submissions from your website can reach the sheet without Google blocking them with a login screen**:
1. Click the blue **Deploy** button (top right) &rarr; **Manage deployments**.
2. Click the **Pencil (Edit)** icon next to your Web App deployment.
3. Check these exact settings:
   - **Execute as**: `Me (your google email)`
   - **Who has access**: **`Anyone`**  *(⚠️ MUST be "Anyone", NOT "Only myself")*
4. Click **Deploy**.
5. Copy the **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

---

### Step 6: Verify Endpoint in Code
The Web App URL is already registered in:
- `frontend/src/pages/LandingPage/InternshipLandingPage.js`
- `landing page/InternshipLandingPage.jsx`
- `landing page/script.js`

If Google generated a new deployment URL in Step 5, paste it into line 7 of those files:
```javascript
const GOOGLE_SHEET_WEBAPP_URL = "YOUR_NEW_WEB_APP_URL";
```

---

## 📋 The 12 Details Automatically Filled Into Google Sheets

Every candidate who clicks **"Submit Free Application"** automatically fills:

| Col | Header | Form Input Field | Example Value |
|---|---|---|---|
| **A** | **Timestamp** | Auto-generated Date & Time | `2026-11-05 10:45:00` |
| **B** | **Application ID** | Auto-generated Reference ID | `VRPI-INT-2026-7438` |
| **C** | **Full Name** | Full Name * | `Rahul Sharma` |
| **D** | **Email Address** | Email Address * | `rahul@example.com` |
| **E** | **WhatsApp / Phone** | WhatsApp / Contact No * | `+91 98765 43210` |
| **F** | **College / University** | College / University * | `IIT Hyderabad` |
| **G** | **Degree / Passing Year** | Degree & Passing Year * | `B.Tech CSE (2024-2027)` |
| **H** | **Internship Domain Track** | Specialization Track * | `Tech Solutions: Full Stack Web & Mobile` |
| **I** | **Preferred Mode** | Internship Mode | `Virtual / Remote (Pan-India Online)` |
| **J** | **Portfolio / LinkedIn URL** | LinkedIn / GitHub URL | `https://linkedin.com/in/rahul` |
| **K** | **Statement of Purpose** | Statement of Purpose / Goals | `Looking to gain hands-on production experience...` |
| **L** | **Application Status** | Initial Review Status | `Under Technical Review` |
