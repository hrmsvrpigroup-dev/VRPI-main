/**
 * ============================================================================
 * VR PI Group — Free Industrial Internship Application Collector
 * Google Apps Script for Google Sheet:
 * https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit
 * ============================================================================
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit
 * 2. Click Extensions -> Apps Script.
 * 3. Delete everything in Code.gs and paste this entire script.
 * 4. Click the Save icon (Ctrl+S).
 * 5. (OPTIONAL) Select 'createHeadersNow' from the function dropdown at the top and click 'Run'.
 *    Check your Sheet1 — the orange headers will appear instantly!
 * 6. Click "Deploy" (top right) -> "Manage deployments" (or "New deployment").
 *    - Click the pencil (edit) icon or "New deployment"
 *    - Type: Web app
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL: MUST BE 'Anyone' so student forms submit without login!)
 * 7. Click "Deploy".
 * 8. Copy the Web app URL (ends in /exec) and use it in your code!
 * ============================================================================
 */

const SPREADSHEET_ID = "18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA";

/**
 * Handle POST requests from the Landing Page form submission
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.tryLock(30000);
  } catch (err) {}

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = (e && e.parameter) || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var applicationId = data.applicationId || ("VRPI-INT-" + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy") + "-" + Math.floor(1000 + Math.random() * 9000));
    var fullName = data.fullName || data.name || "";
    var email = data.email || "";
    var phone = (data.phone || data.whatsapp || "").toString().trim();
    if (phone.startsWith("+") || phone.startsWith("=")) {
      phone = "'" + phone;
    }
    var college = data.college || data.university || "";
    var qualification = data.qualification || data.degree || "";
    var domain = data.domain || data.track || "";
    var internshipMode = data.internshipMode || data.mode || "Virtual / Remote (Pan-India Online)";
    var portfolioUrl = data.portfolioUrl || data.linkedin || "";
    var statement = data.statement || data.goals || "";
    var status = data.status || "Under Technical Review";

    // Row data to write (12 columns matching form)
    var rowData = [
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

    // Open target spreadsheet
    var ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (err) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    // Write to Sheet1 (tab gid=0 or first tab)
    var sheet1 = ss.getSheetByName("Sheet1");
    if (!sheet1) {
      sheet1 = ss.getSheets()[0];
    }

    if (sheet1.getLastRow() === 0) {
      setupHeaders(sheet1);
    }
    sheet1.appendRow(rowData);
    formatRow(sheet1, sheet1.getLastRow());

    // Also write to "Internship Applications" tab if it exists and is distinct
    var appsSheet = ss.getSheetByName("Internship Applications");
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
        applicationId: applicationId,
        row: sheet1.getLastRow()
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
    try {
      lock.releaseLock();
    } catch (err) {}
  }
}

/**
 * Handle GET requests (Health check or browser URL testing)
 */
function doGet(e) {
  if (e && e.parameter && (e.parameter.fullName || e.parameter.name)) {
    return doPost(e);
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      service: "VR PI Internship Application Collector API",
      spreadsheetId: SPREADSHEET_ID,
      activeSheet: "Sheet1",
      instructions: "Send a POST request with candidate JSON payload"
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function formatRow(sheet, rowNum) {
  if (rowNum < 2) return;
  sheet.getRange(rowNum, 1, 1, 12).setVerticalAlignment("middle");
  sheet.getRange(rowNum, 2).setFontFamily("Courier New").setFontWeight("bold");
}

/**
 * Run this function once in Apps Script (select 'createHeadersNow' and click Run)
 * to immediately format and create headers on Sheet1!
 */
function createHeadersNow() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (err) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  var sheet1 = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
  setupHeaders(sheet1);
  Logger.log("Headers created successfully on: " + sheet1.getName());
}

/**
 * Run this function in Apps Script to insert a test application row!
 */
function testInsert() {
  createHeadersNow();
  var testPayload = {
    postData: {
      contents: JSON.stringify({
        fullName: "Test Candidate",
        email: "candidate@vrpigroup.com",
        phone: "+91 98765 43210",
        college: "VR PI Academy / JNTU",
        qualification: "B.Tech Final Year (2026)",
        domain: "Tech Solutions: Full Stack Web & Mobile",
        internshipMode: "Virtual / Remote (Pan-India Online)",
        portfolioUrl: "https://linkedin.com",
        statement: "Automated test application verified."
      })
    }
  };
  var result = doPost(testPayload);
  Logger.log("Test Result: " + result.getContent());
}

/**
 * Run this function once in Apps Script (select 'syncToSheet1' and click Run)
 * to copy any existing applications from other tabs to Sheet1!
 */
function syncToSheet1() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (err) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  var sheet1 = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
  if (sheet1.getLastRow() === 0) {
    setupHeaders(sheet1);
  }

  var appsSheet = ss.getSheetByName("Internship Applications");
  if (appsSheet && appsSheet.getSheetId() !== sheet1.getSheetId()) {
    var lastRow = appsSheet.getLastRow();
    if (lastRow > 1) {
      var data = appsSheet.getRange(2, 1, lastRow - 1, 12).getValues();
      for (var i = 0; i < data.length; i++) {
        sheet1.appendRow(data[i]);
        formatRow(sheet1, sheet1.getLastRow());
      }
      Logger.log("Successfully copied " + data.length + " rows to Sheet1!");
    }
  }
}

/**
 * Initialize Headers & Table Formatting
 */
function setupHeaders(sheet) {
  var headers = [
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
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
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
