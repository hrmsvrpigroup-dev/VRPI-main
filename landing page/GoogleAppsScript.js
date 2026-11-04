/**
 * ============================================================================
 * VR PI Group — Free Industrial Internship Application Collector
 * Google Apps Script for Google Sheet:
 * https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit
 * ============================================================================
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit
 * 2. Click Extensions -> Apps Script.
 * 3. Delete any default code in Code.gs and paste this entire script.
 * 4. Click the Save icon (Ctrl+S).
 * 5. Click "Deploy" (top right) -> "New deployment".
 * 6. Select type: "Web app" (click gear icon next to "Select type" if needed).
 * 7. Fill in settings:
 *    - Description: "VR PI Internship Form Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (VERY IMPORTANT so students can submit without login)
 * 8. Click "Deploy".
 * 9. Authorize access when prompted (Click "Advanced" -> "Go to ... (unsafe)").
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/.../exec).
 * 11. Paste that Web App URL in your landing page script.js:
 *     const GOOGLE_SCRIPT_WEBAPP_URL = "YOUR_COPIED_URL";
 * ============================================================================
 */

// Spreadsheet ID from your URL
const SPREADSHEET_ID = "18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA";

/**
 * Handle POST requests from the Landing Page form submission
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent submissions to prevent collision
  lock.tryLock(30000);

  try {
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Row data to write
    const rowData = [
      timestamp,
      applicationId,
      fullName,
      email,
      phone,
      college,
      qualification,
      domain,
      internshipMode,
      portfolioUrl,
      statement,
      status
    ];

    // Write to Sheet1 (first tab)
    const sheet1 = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    if (sheet1.getLastRow() === 0) {
      setupHeaders(sheet1);
    }
    sheet1.appendRow(rowData);
    formatRow(sheet1, sheet1.getLastRow());

    // Also write to "Internship Applications" tab if it exists
    const appsSheet = ss.getSheetByName("Internship Applications");
    if (appsSheet && appsSheet.getSheetId() !== sheet1.getSheetId()) {
      if (appsSheet.getLastRow() === 0) {
        setupHeaders(appsSheet);
      }
      appsSheet.appendRow(rowData);
      formatRow(appsSheet, appsSheet.getLastRow());
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Application recorded successfully!",
        applicationId: applicationId
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function formatRow(sheet, rowNum) {
  if (rowNum < 1) return;
  sheet.getRange(rowNum, 1, 1, 12).setVerticalAlignment("middle");
  sheet.getRange(rowNum, 2).setFontFamily("Courier New").setFontWeight("bold");
}

/**
 * Run this function once in Apps Script (select 'syncToSheet1' and click Run)
 * to immediately format Sheet1 and copy any existing applications to Sheet1!
 */
function syncToSheet1() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet1 = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
  setupHeaders(sheet1);

  const appsSheet = ss.getSheetByName("Internship Applications");
  if (appsSheet && appsSheet.getSheetId() !== sheet1.getSheetId()) {
    const lastRow = appsSheet.getLastRow();
    if (lastRow > 1) {
      const data = appsSheet.getRange(2, 1, lastRow - 1, 12).getValues();
      for (let i = 0; i < data.length; i++) {
        sheet1.appendRow(data[i]);
        formatRow(sheet1, sheet1.getLastRow());
      }
      Logger.log("Successfully copied " + data.length + " rows to Sheet1!");
    }
  }
}

/**
 * Run this function once in Apps Script (select 'createHeadersNow' and click Run)
 * to immediately format and create headers on Sheet1!
 */
function createHeadersNow() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet1 = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
  setupHeaders(sheet1);
  Logger.log("Headers created successfully on " + sheet1.getName());
}

/**
 * Handle GET requests (Health check)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      service: "VR PI Internship Application Collector API",
      spreadsheetId: SPREADSHEET_ID,
      activeSheet: SHEET_NAME,
      instructions: "Send a POST request with candidate JSON payload"
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Initialize Headers & Table Formatting
 */
function setupHeaders(sheet) {
  const headers = [
    "Timestamp",
    "Application ID",
    "Full Name",
    "Email Address",
    "WhatsApp / Phone",
    "College / University",
    "Degree / Passing Year",
    "Internship Domain Track",
    "Preferred Mode",
    "Portfolio / LinkedIn URL",
    "Statement of Purpose",
    "Application Status"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Style header row with VR PI Orange and Bold White text
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#FF5722");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 38);

  // Set initial column widths
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 170); // App ID
  sheet.setColumnWidth(3, 180); // Full Name
  sheet.setColumnWidth(4, 220); // Email
  sheet.setColumnWidth(5, 150); // Phone
  sheet.setColumnWidth(6, 220); // College
  sheet.setColumnWidth(7, 180); // Qualification
  sheet.setColumnWidth(8, 260); // Domain Track
  sheet.setColumnWidth(9, 160); // Mode
  sheet.setColumnWidth(10, 220); // Portfolio
  sheet.setColumnWidth(11, 280); // Statement
  sheet.setColumnWidth(12, 140); // Status
}

