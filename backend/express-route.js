/**
 * Node.js Express Route for Google Sheets integration.
 * 
 * Dependencies:
 *   npm install googleapis express dotenv
 * 
 * Requirements:
 * 1. Create a Google Cloud Project.
 * 2. Enable "Google Sheets API".
 * 3. Create a Service Account, generate a JSON Key, rename it to `credentials.json` and place it in your backend.
 * 4. Share your Google Sheet with the Service Account email (give editor permissions).
 * 5. Set GOOGLE_SPREADSHEET_ID and PORT in your backend .env file.
 */

const express = require("express");
const { google } = require("googleapis");
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

    // Simple validation
    if (!name || !email || !phone || !internshipRole || !qualification || !graduationYear || !resumeLink) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // Authenticate using credentials.json
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!spreadsheetId) {
      return res.status(500).json({
        status: "error",
        message: "GOOGLE_SPREADSHEET_ID is not configured in the backend environment variables.",
      });
    }

    // Insert row
    const timestamp = new Date().toISOString();
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:I", // Appends to Sheet1. Ensure this sheet exists.
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
      message: "Application recorded in Google Sheet successfully.",
    });

  } catch (error) {
    console.error("Google Sheets API error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to write to Google Sheets.",
      error: error.message,
    });
  }
});

module.exports = router;
