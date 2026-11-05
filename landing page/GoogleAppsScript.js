/**
 * ============================================================================
 * VR PI Group — Free Industrial Internship Application Collector
 * Google Apps Script for Google Sheet:
 * https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit
 * ============================================================================
 *
 * HOW TO UPDATE YOUR SCRIPT IN GOOGLE APPS SCRIPT:
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA/edit
 * 2. Click Extensions -> Apps Script.
 * 3. Delete everything in Code.gs and replace it with this entire script.
 * 4. Click the Save icon (Ctrl+S).
 * 5. (OPTIONAL) Select 'createHeadersNow' from the function dropdown at the top and click 'Run'.
 *    Sheet1 will automatically update with all 17 column headers!
 * 6. Click "Deploy" (top right) -> "Manage deployments".
 *    - Click the pencil (edit) icon
 *    - Under "Version", select "New version"
 *    - Ensure "Who has access" is set to "Anyone"
 *    - Click "Deploy".
 * ============================================================================
 */

const SPREADSHEET_ID = "18v_CQQpYldVTW2-0ibFNSdG0yUsziEiCU9VmEtJe-EA";
const DRIVE_FOLDER_NAME = "VR PI Internship Submissions";

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

    // Process file attachments (Resume PDF and Verification Screenshots)
    var resumeUrl = saveBase64ToDrive(data.resume || data.resumeFile, DRIVE_FOLDER_NAME, applicationId + "_Resume.pdf");
    var ytProofUrl = saveBase64ToDrive(data.youtubeProof, DRIVE_FOLDER_NAME, applicationId + "_YouTube_Proof.jpg");
    var igProofUrl = saveBase64ToDrive(data.instagramProof, DRIVE_FOLDER_NAME, applicationId + "_Instagram_Proof.jpg");
    var waProofUrl = saveBase64ToDrive(data.whatsappProof, DRIVE_FOLDER_NAME, applicationId + "_WhatsApp_Proof.jpg");
    var liProofUrl = saveBase64ToDrive(data.linkedinProof, DRIVE_FOLDER_NAME, applicationId + "_LinkedIn_Proof.jpg");

    // Row data to write (17 columns matching complete application)
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
      status,
      resumeUrl,
      ytProofUrl,
      igProofUrl,
      waProofUrl,
      liProofUrl
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

    if (sheet1.getLastRow() === 0 || sheet1.getLastColumn() < 17) {
      setupHeaders(sheet1);
    }
    sheet1.appendRow(rowData);
    formatRow(sheet1, sheet1.getLastRow());

    // Also write to "Internship Applications" tab if it exists and is distinct
    var appsSheet = ss.getSheetByName("Internship Applications");
    if (appsSheet && appsSheet.getSheetId() !== sheet1.getSheetId()) {
      if (appsSheet.getLastRow() === 0 || appsSheet.getLastColumn() < 17) {
        setupHeaders(appsSheet);
      }
      appsSheet.appendRow(rowData);
      formatRow(appsSheet, appsSheet.getLastRow());
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Application recorded to Sheet1 successfully!",
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
 * Helper to save base64 files into Google Drive and return their accessible URLs
 */
function saveBase64ToDrive(fileObj, folderName, defaultFileName) {
  if (!fileObj) return "Not Provided";
  try {
    var rawData = typeof fileObj === "object" ? fileObj.data : fileObj;
    if (!rawData || typeof rawData !== "string") {
      return (typeof fileObj === "object" && fileObj.name) ? fileObj.name : "Not Provided";
    }

    var name = (typeof fileObj === "object" && fileObj.name) ? fileObj.name : defaultFileName;
    var mimeType = (typeof fileObj === "object" && fileObj.type) ? fileObj.type : "application/octet-stream";

    var base64Data = rawData;
    if (rawData.indexOf("base64,") !== -1) {
      var parts = rawData.split("base64,");
      var match = parts[0].match(/data:(.*?);/);
      if (match && match[1]) mimeType = match[1];
      base64Data = parts[1];
    }

    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, mimeType, name);

    var folder;
    var folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }

    var file = folder.createFile(blob);
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {}

    return file.getUrl();
  } catch (err) {
    Logger.log("Drive Save Note: " + err);
    var fallbackName = (typeof fileObj === "object" && fileObj.name) ? fileObj.name : defaultFileName;
    return "Uploaded (" + fallbackName + ") [Drive Note: " + err.message + "]";
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
      columns: 17,
      instructions: "Send a POST request with candidate JSON payload"
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function formatRow(sheet, rowNum) {
  if (rowNum < 2) return;
  sheet.getRange(rowNum, 1, 1, 17).setVerticalAlignment("middle");
  sheet.getRange(rowNum, 2).setFontFamily("Courier New").setFontWeight("bold");
}

/**
 * Initialize Headers & Table Formatting (17 Columns)
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
    "Application Status",
    "Resume (PDF)",
    "YouTube Task Proof",
    "Instagram Task Proof",
    "WhatsApp Task Proof",
    "LinkedIn Task Proof"
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

  // Set column widths
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
  sheet.setColumnWidth(13, 260); // Resume PDF
  sheet.setColumnWidth(14, 240); // YouTube Proof
  sheet.setColumnWidth(15, 240); // Instagram Proof
  sheet.setColumnWidth(16, 240); // WhatsApp Proof
  sheet.setColumnWidth(17, 240); // LinkedIn Proof
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
