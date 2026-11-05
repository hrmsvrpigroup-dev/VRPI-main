const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { Pool } = require("pg");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for frontend requests (supports both live domain and local/laptop development)
const allowedOrigins = [
  "https://www.thevrpigroup.com",
  "https://thevrpigroup.com",
  "http://localhost:3000",
  "http://localhost:3001"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith("thevrpigroup.com") || origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"]
}));

// Parse JSON request bodies
app.use(express.json());

// Initialize PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper function to initialize database tables if they don't exist
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        role VARCHAR(50),
        roles VARCHAR(50),
        "profileData" JSONB,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS education_details (
        id SERIAL PRIMARY KEY,
        "userId" VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        details JSONB,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS posted_internships (
        id SERIAL PRIMARY KEY,
        details JSONB,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS applied_internships (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        "internshipRole" VARCHAR(255),
        qualification VARCHAR(255),
        "graduationYear" VARCHAR(50),
        "resumeLink" TEXT,
        message TEXT,
        status VARCHAR(50) DEFAULT 'Pending Review',
        "appliedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS blog_articles (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        slug VARCHAR(255),
        "fullArticleData" JSONB NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Add profileData column if it doesn't exist (migration for existing table)
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='profileData') THEN
          ALTER TABLE users ADD COLUMN "profileData" JSONB;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='otp') THEN
          ALTER TABLE users ADD COLUMN otp VARCHAR(10);
        END IF;
      END
      $$;
    `);
    
    // Auto-seed baseline articles if table is empty
    try {
      const blogCountResult = await pool.query('SELECT count(*) FROM blog_articles;');
      if (parseInt(blogCountResult.rows[0].count, 10) === 0) {
        const seedPath = path.join(__dirname, "seed_articles.json");
        if (fs.existsSync(seedPath)) {
          const defaultArticles = JSON.parse(fs.readFileSync(seedPath, "utf8"));
          for (const art of defaultArticles) {
            await pool.query(
              `INSERT INTO blog_articles (id, title, slug, "fullArticleData", "updatedAt")
               VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
               ON CONFLICT (id) DO NOTHING;`,
              [art.id, art.title, art.slug || art.id, art]
            );
          }
          console.log(`Auto-seeded ${defaultArticles.length} initial blog articles.`);
        }
      }
    } catch (seedErr) {
      console.warn("Blog auto-seed warning:", seedErr.message);
    }
    
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Database initialization failed:", error.message);
  }
};
initDb();

// 1. User registration: POST /vrpi-user/create
const vrpiUserCreateHandler = async (req, res) => {
  const { email, password, firstName, lastName, role, roles } = req.body;
  if (!email) {
    return res.status(400).json({ status: "error", message: "Email is required" });
  }

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existingUser.rowCount > 0) {
      return res.status(400).json({ status: "error", message: "User already exists" });
    }

    const selectedRole = role || roles || "student";
    const id = "user_" + Math.random().toString(36).substr(2, 9);
    // Frontend sends createPassword, so we check for it, otherwise fallback to password
    const pwd = req.body.createPassword || password || "password123";
    const fName = firstName || "";
    const lName = lastName || "";

    // Extract remaining fields to store in profileData
    const { fathersName, gender, phoneNumber, dateOfBirth, address, occupation, aadharCardNumber } = req.body;
    const profileData = {
      fathersName,
      gender,
      phoneNumber,
      dateOfBirth,
      address,
      occupation,
      aadharCardNumber
    };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const insertQuery = `
      INSERT INTO users (id, email, password, "firstName", "lastName", role, roles, "profileData", otp) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;
    const result = await pool.query(insertQuery, [id, email.toLowerCase(), pwd, fName, lName, selectedRole, selectedRole, profileData, otp]);

    try {
      await resend.emails.send({
        from: 'info@thevrpigroup.com',
        to: email.toLowerCase(),
        subject: 'VR PI Group - Verification OTP',
        html: `<p>Your account verification OTP is: <strong>${otp}</strong></p><p>Please use this OTP to verify your email address. Or you can use this link to verify: <a href="http://localhost:3000/vrpi-user/verify-account/${email.toLowerCase()}/${otp}">Verify Account</a></p>`
      });
      console.log(`OTP email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send OTP email via Resend:", emailError);
    }

    console.log(`Registered user: ${result.rows[0].email} with role ${result.rows[0].role}`);
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.post("/api/vrpi-user/create", vrpiUserCreateHandler);
app.post("/vrpi-user/create", vrpiUserCreateHandler);

// 2. User login: POST /vrpi-user/login
const vrpiUserLoginHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ status: "error", message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ status: "error", message: "Password is required" });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const user = result.rows[0];
    
    // Check password
    if (user.password !== password) {
      return res.status(401).json({ status: "error", message: "Invalid password" });
    }
    
    // Merge profileData into the top-level user object so frontend doesn't break
    const mergedUser = { ...user, ...(user.profileData || {}) };
    
    console.log(`User logged in: ${mergedUser.email}`);
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user: mergedUser
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.post("/api/vrpi-user/login", vrpiUserLoginHandler);
app.post("/vrpi-user/login", vrpiUserLoginHandler);

// 3. User details: GET /vrpi-user/get-user-details/:id
const vrpiUserDetailsHandler = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const user = result.rows[0];
    const mergedUser = { ...user, ...(user.profileData || {}) };

    return res.status(200).json({
      status: "success",
      user: mergedUser
    });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.get("/api/vrpi-user/get-user-details/:id", vrpiUserDetailsHandler);
app.get("/vrpi-user/get-user-details/:id", vrpiUserDetailsHandler);

// 4. Update user details: PUT /vrpi-user/update-user/:id
const vrpiUserUpdateHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const user = result.rows[0];
    
    // Separate core fields from dynamic profile fields
    const newFirstName = updateData.firstName !== undefined ? updateData.firstName : user.firstName;
    const newLastName = updateData.lastName !== undefined ? updateData.lastName : user.lastName;
    
    const { firstName, lastName, email, password, role, roles, id: reqId, createdAt, profileData, ...profileFields } = updateData;
    const newProfileData = { ...(user.profileData || {}), ...profileFields };

    const updateQuery = `
      UPDATE users 
      SET "firstName" = $1, "lastName" = $2, "profileData" = $3 
      WHERE id = $4 
      RETURNING *
    `;
    const updated = await pool.query(updateQuery, [newFirstName, newLastName, newProfileData, id]);
    
    const mergedUser = { ...updated.rows[0], ...(updated.rows[0].profileData || {}) };
    console.log(`Updated user profile: ${mergedUser.email}`);

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      user: mergedUser
    });
  } catch (error) {
    console.error("Error updating user details:", error.message);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.put("/api/vrpi-user/update-user/:id", vrpiUserUpdateHandler);
app.put("/vrpi-user/update-user/:id", vrpiUserUpdateHandler);

// 5. Upload docs: PUT /vrpi-user/update-doc/:id
const vrpiUserUpdateDocHandler = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Documents uploaded successfully (Compatibility Mode)"
  });
};
app.put("/api/vrpi-user/update-doc/:id", vrpiUserUpdateDocHandler);
app.put("/vrpi-user/update-doc/:id", vrpiUserUpdateDocHandler);

// 6. Verify account: GET /vrpi-user/verify-account/:email/:otp
const vrpiUserVerifyHandler = async (req, res) => {
  const { email, otp } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND otp = $2', [email.toLowerCase(), otp]);
    if (result.rowCount === 0) {
      return res.status(400).json({ status: "error", message: "Invalid OTP or User not found" });
    }

    // Clear the OTP to signify verification is complete
    await pool.query('UPDATE users SET otp = NULL WHERE email = $1', [email.toLowerCase()]);

    return res.status(200).json({
      status: "success",
      message: "Account verified successfully"
    });
  } catch (error) {
    console.error("Error verifying account OTP:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.get("/api/vrpi-user/verify-account/:email/:otp", vrpiUserVerifyHandler);
app.get("/vrpi-user/verify-account/:email/:otp", vrpiUserVerifyHandler);

// 7. Forgot password: POST /vrpi-user/forgot-password
const vrpiUserForgotPasswordHandler = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ status: "error", message: "Email is required" });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: "error", message: "Email address not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await pool.query('UPDATE users SET otp = $1 WHERE email = $2', [otp, email.toLowerCase()]);

    await resend.emails.send({
      from: 'info@thevrpigroup.com',
      to: email.toLowerCase(),
      subject: 'VR PI Group - Password Reset',
      html: `<p>You have requested to reset your password.</p><p>Please use this link to reset your password: <a href="http://localhost:3000/resetPassword/${email.toLowerCase()}/${otp}">Reset Password</a></p><p>If you did not request this, please ignore this email.</p>`
    });

    console.log(`Password reset email sent to ${email}`);

    return res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email"
    });
  } catch (error) {
    console.error("Error in forgot-password:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.post("/api/vrpi-user/forgot-password", vrpiUserForgotPasswordHandler);
app.post("/vrpi-user/forgot-password", vrpiUserForgotPasswordHandler);

// 7.1. Reset password: POST /vrpi-user/reset-password
const vrpiUserResetPasswordHandler = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND otp = $2', [email.toLowerCase(), otp]);
    if (result.rowCount === 0) {
      return res.status(400).json({ status: "error", message: "Invalid or expired reset link" });
    }

    await pool.query('UPDATE users SET password = $1, otp = NULL WHERE email = $2', [newPassword, email.toLowerCase()]);

    console.log(`Password reset successful for ${email}`);

    return res.status(200).json({
      status: "success",
      message: "Password has been successfully reset"
    });
  } catch (error) {
    console.error("Error in reset-password:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.post("/api/vrpi-user/reset-password", vrpiUserResetPasswordHandler);
app.post("/vrpi-user/reset-password", vrpiUserResetPasswordHandler);

const { google } = require("googleapis");
let credentials = {};
try {
  credentials = require("./credentials.json");
} catch (error) {
  console.log("Warning: credentials.json not found. Google Sheets integration may fail.");
}

// 8. Contact Us: POST /vrpi-user/contact-us
const vrpiUserContactUsHandler = async (req, res) => {
  const { name, email, phone, description } = req.body;
  const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID;

  if (SPREADSHEET_ID) {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });

      const now = new Date();
      const date = now.toLocaleDateString('en-IN');
      const time = now.toLocaleTimeString('en-IN');

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A:F", 
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[date, time, name || "", email || "", phone || "", description || ""]],
        },
      });
      console.log(`Saved Contact Us form for ${email} to Google Sheets`);
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
    }
  }

  return res.status(200).json({
    status: "success",
    message: "Message received. We will contact you soon."
  });
};
app.post("/api/vrpi-user/contact-us", vrpiUserContactUsHandler);
app.post("/vrpi-user/contact-us", vrpiUserContactUsHandler);

// 9. Get Image: GET /vrpi-user/get-image/profilePic/:id
const vrpiUserGetImageHandler = (req, res) => {
  return res.redirect("https://www.w3schools.com/howto/img_avatar.png");
};
app.get("/api/vrpi-user/get-image/profilePic/:id", vrpiUserGetImageHandler);
app.get("/vrpi-user/get-image/profilePic/:id", vrpiUserGetImageHandler);

// 10. Education details: POST /education-details/create-education-details/:userId
const createEducationDetailsHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    await pool.query('INSERT INTO education_details ("userId", details) VALUES ($1, $2)', [userId, req.body]);
    return res.status(201).json({
      status: "success",
      message: "Educational details saved successfully"
    });
  } catch (error) {
    console.error("Error saving education details:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.post("/api/education-details/create-education-details/:userId", createEducationDetailsHandler);
app.post("/education-details/create-education-details/:userId", createEducationDetailsHandler);

// 11. Course enrollment: POST /course/enroll-course
const enrollCourseHandler = (req, res) => {
  return res.status(200).send("http://localhost:3000/dashboard");
};
app.post("/api/course/enroll-course", enrollCourseHandler);
app.post("/course/enroll-course", enrollCourseHandler);

// 12. Client Post Internship: POST /client/post-internship
const postInternshipHandler = async (req, res) => {
  try {
    await pool.query('INSERT INTO posted_internships (details) VALUES ($1)', [req.body]);
    return res.status(201).json({
      status: "success",
      message: "Internship posted successfully"
    });
  } catch (error) {
    console.error("Error posting internship:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
app.post("/api/client/post-internship", postInternshipHandler);
app.post("/client/post-internship", postInternshipHandler);

// 13. Mount Google Sheets Internship Application Route & Database Insert
app.post(["/api/apply-internship", "/apply-internship"], async (req, res, next) => {
  const candidateName = req.body.fullName || req.body.name || "";
  const candidateEmail = req.body.email || "";
  const candidatePhone = req.body.phone || req.body.whatsapp || "";
  const candidateCollege = req.body.college || req.body.university || "";
  const candidateQualification = req.body.qualification || req.body.degree || "";
  const candidateRole = req.body.domain || req.body.internshipRole || req.body.track || "";
  const candidateMode = req.body.internshipMode || req.body.mode || "Virtual / Remote (Pan-India Online)";
  const candidatePortfolio = req.body.portfolioUrl || req.body.resumeLink || req.body.linkedin || "";
  const candidateMessage = req.body.statement || req.body.message || "";

  if (candidateEmail) {
    try {
      const id = "app_" + Math.random().toString(36).substr(2, 9);
      const query = `
        INSERT INTO applied_internships 
        (id, name, email, phone, "internshipRole", qualification, "graduationYear", "resumeLink", message) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      await pool.query(query, [
        id, candidateName, candidateEmail.toLowerCase(), candidatePhone, candidateRole, 
        candidateQualification, candidateCollege, candidatePortfolio, candidateMessage
      ]);
      console.log(`Recorded internship application for ${candidateEmail} - Role: ${candidateRole}`);

      // Forward to Google Apps Script Web App endpoints
      const https = require("https");
      const webAppPayload = JSON.stringify({
        fullName: candidateName,
        email: candidateEmail,
        phone: candidatePhone,
        college: candidateCollege,
        qualification: candidateQualification,
        domain: candidateRole,
        internshipMode: candidateMode,
        portfolioUrl: candidatePortfolio,
        statement: candidateMessage,
        timestamp: new Date().toISOString()
      });

      const webAppUrls = [
        "https://script.google.com/macros/s/AKfycbzT6sEvG6PvL7U2f6X0Ukp_ur8kMWC6XetMij4G3Y3fQyGYc-rMJYa5DnYiX_vY4YP3/exec",
        "https://script.google.com/macros/s/AKfycbyKKJUk6_pe1qtpqBZp6jYsCA8O97g5IlbwNRetYQ-6pjJql29fnEUKqPrV795kh9FI8g/exec"
      ];

      webAppUrls.forEach(urlStr => {
        try {
          const u = new URL(urlStr);
          const postReq = https.request({
            hostname: u.hostname,
            path: u.pathname + u.search,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(webAppPayload)
            }
          }, (postRes) => {
            if (postRes.statusCode === 302 && postRes.headers.location) {
              https.get(postRes.headers.location, () => {});
            }
          });
          postReq.on("error", (e) => console.warn("Google Apps Script forward error:", e.message));
          postReq.write(webAppPayload);
          postReq.end();
        } catch (e) {}
      });

      // Google Sheets Integration (Service Account if configured)
      const INTERNSHIP_SPREADSHEET_ID = process.env.GOOGLE_INTERNSHIP_SPREADSHEET_ID;
      if (INTERNSHIP_SPREADSHEET_ID && credentials && credentials.client_email) {
        try {
          const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
          });
          const sheets = google.sheets({ version: "v4", auth });

          const now = new Date();
          const date = now.toLocaleDateString('en-IN');
          const time = now.toLocaleTimeString('en-IN');

          await sheets.spreadsheets.values.append({
            spreadsheetId: INTERNSHIP_SPREADSHEET_ID,
            range: "Sheet1!A:J", 
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [[
                date, time, candidateName, candidateEmail, candidatePhone, 
                candidateRole, candidateQualification, 
                candidateCollege, candidatePortfolio, candidateMessage
              ]],
            },
          });
          console.log(`Saved Internship Application for ${candidateEmail} to Google Sheets`);
        } catch (sheetError) {
          console.error("Error saving internship to Google Sheets:", sheetError.message);
        }
      }

    } catch (error) {
      console.error("Error saving internship application:", error.message);
    }
  }
  
  return res.status(200).json({
    status: "success",
    message: "Internship application submitted successfully!"
  });
});

// Endpoint to fetch applied internships
app.get("/api/vrpi-user/applied-internships/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query('SELECT * FROM applied_internships WHERE email = $1', [email.toLowerCase()]);
    return res.status(200).json({
      status: "success",
      applications: result.rows
    });
  } catch (error) {
    console.error("Error fetching applied internships:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

const internshipRoutes = require("./routes/internship");
app.use("/api/internships", internshipRoutes);
app.use("/internships", internshipRoutes);
app.use("/api", internshipRoutes); // Covers POST /api/apply-internship
app.use("/", internshipRoutes);    // Covers POST /apply-internship

// Blog Articles API Routes
const blogRoutes = require("./routes/blog")(pool);
app.use("/api/blogs", blogRoutes);
app.use("/blogs", blogRoutes);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: "ok", message: "Server is running, Database is connected" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server is running, but Database connection failed" });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
