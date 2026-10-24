/**
 * Google Apps Script backend for handling Internship Form submissions.
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click on "Extensions" -> "Apps Script".
 * 3. Delete any existing code in Code.gs and paste this code.
 * 4. Save the project (disk icon).
 * 5. Click "Deploy" -> "New deployment".
 * 6. Select type "Web app".
 * 7. Configure:
 *    - Description: "Internship Application Form Backend"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (crucial for API access)
 * 8. Click "Deploy", authorize the permissions, and copy the "Web app" URL.
 * 9. Paste this URL in your React app's .env file as REACT_APP_INTERNSHIP_GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  // Setup CORS response headers
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    
    // Attempt to open or create "Internship Applications" sheet
    var sheetName = "Internship Applications";
    var sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      // Initialize Header Row
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email Address",
        "Mobile Number",
        "Internship Role",
        "Educational Qualification",
        "Year of Graduation",
        "Resume Link",
        "Cover Message"
      ]);
      // Format headers: Bold and grey background
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f1f5f9");
    }

    // Parse incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var internshipRole = data.internshipRole || "";
    var qualification = data.qualification || "";
    var graduationYear = data.graduationYear || "";
    var resumeLink = data.resumeLink || "";
    var message = data.message || "";

    // Append application details to the sheet
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      internshipRole,
      qualification,
      graduationYear,
      resumeLink,
      message
    ]);

    // Return success response
    var output = JSON.stringify({
      status: "success",
      message: "Application recorded successfully"
    });

    return ContentService.createTextOutput(output)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    var errorOutput = JSON.stringify({
      status: "error",
      message: error.toString()
    });

    return ContentService.createTextOutput(errorOutput)
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle preflight CORS requests
function doOptions(e) {
  var output = ContentService.createTextOutput("");
  return output;
}
