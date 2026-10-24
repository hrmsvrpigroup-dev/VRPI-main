const express = require("express");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.post("/apply-internship", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      internshipRole,
      qualification,
      graduationYear,
      resumeLink,
      message,
    } = req.body;

    // Basic Validation
    if (
      !name ||
      !email ||
      !phone ||
      !internshipRole ||
      !qualification ||
      !graduationYear ||
      !resumeLink
    ) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    const credentialsPath = path.join(__dirname, "../credentials.json");
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const hasCredentials = fs.existsSync(credentialsPath);
    const hasSpreadsheetId = spreadsheetId && spreadsheetId !== "your_google_spreadsheet_id_here";

    // Fallback: If credentials.json is missing or spreadsheet ID is default, log to server console
    if (!hasCredentials || !hasSpreadsheetId) {
      console.log("\n[DEVELOPMENT MODE] Google Sheets integration is not fully configured.");
      console.log("Mocking sheet writing. Application received:");
      console.log({
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        internshipRole,
        qualification,
        graduationYear,
        resumeLink,
        message: message || "",
      });
      console.log("------------------------------------------------------------------\n");

      return res.status(200).json({
        status: "success",
        message: "Application recorded in terminal (Development Mode). Configure credentials.json and GOOGLE_SPREADSHEET_ID to write to Google Sheets.",
      });
    }

    // Google Sheets API credentials setup
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // Typo resolution: candidates list for common optical recognition typos
    const candidates = [
      spreadsheetId,
      "1zl9XtPA1Mb-I3ppBsGvFyKHXuE-7nxmEDk7QJbLlFts",
      "1zl9XtPA1Mb-I3ppBsGvFyKHXuE-7nxmEDk7QJbLIFts",
      "1zl9XtPA1Mb-I3ppBs6vFyKHXuE-7nxmEDk7QJbLlFts",
      "1zl9XtPA1Mb-I3ppBs6vFyKHXuE-7nxmEDk7QJbLIFts"
    ];

    let successfulId = null;
    let sheetName = null;
    let lastError = null;

    for (const id of candidates) {
      if (!id || id === "your_google_spreadsheet_id_here") continue;
      try {
        const spreadsheetInfo = await googleSheets.spreadsheets.get({
          auth,
          spreadsheetId: id,
        });
        successfulId = id;
        sheetName = spreadsheetInfo.data.sheets[0].properties.title;
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!successfulId) {
      // If we couldn't find the spreadsheet, it's likely a sharing issue
      const serviceAccountEmail = require(credentialsPath).client_email || "your service account email";
      throw new Error(`Google Sheet could not be accessed. Ensure you have clicked the blue 'Share' button in Google Sheets and added '${serviceAccountEmail}' as an Editor.`);
    }

    const timestamp = new Date().toISOString();

    // Append to the dynamically found sheet tab
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId: successfulId,
      range: `${sheetName}!A:I`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            timestamp,
            name,
            email,
            phone,
            internshipRole,
            qualification,
            graduationYear,
            resumeLink,
            message || "",
          ],
        ],
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Application submitted and written to Google Sheets successfully.",
    });

  } catch (error) {
    console.error("Google Sheets API error:", error);
    
    // Extract a clear error message from Google API response
    const apiErrorMessage = error.response?.data?.error?.message || error.message;

    return res.status(500).json({
      status: "error",
      message: `${apiErrorMessage}`,
      error: apiErrorMessage,
    });
  }
});

module.exports = router;
