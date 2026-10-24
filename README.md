# VR PI Group of Companies - Web Platform

This is the full-stack web application for the **VR PI Group of Companies**, built with a React frontend and a Node.js/Express backend. It includes user authentication, an educational dashboard, internship application processing, and automated integrations with Google Sheets and email services.

## Tech Stack

* **Frontend:** React, React Router, Redux (State Management), Material-UI
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (hosted on Render)
* **Integrations:** 
  * Google Sheets API (for Internship Applications and Contact Us submissions)
  * Resend API (for OTP and Password Reset emails)
  * ngrok (for local testing and exposing the environment)

## Project Structure

The project is split into two main directories:

* `/frontend` - Contains the React application.
* `/backend` - Contains the Express.js server, API routes, and database configuration.

## Features

* **User Authentication:** Complete login, registration, and logout flow using JWT.
* **Secure Password Reset:** "Forgot Password" flow utilizing 6-digit OTPs sent via email (Resend API) for secure password recovery.
* **Student Dashboard:** Dedicated dashboard for enrolled students to view profile details, educational courses, and purchase history.
* **Internship Portal:** Users can browse upcoming internships and submit applications. 
* **Google Sheets Automation:** Contact form submissions and Internship applications are automatically appended to specific Google Sheets in real-time.

## Setup & Installation

### 1. Clone the repository
Make sure you have Node.js and npm installed on your machine.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Ensure your `.env` file contains:
   * `PORT` (usually 8080)
   * `DATABASE_URL` and PostgreSQL credentials
   * `JWT_SECRET`
   * `RESEND_API_KEY`
   * `GOOGLE_SHEET_ID` (for Contact Us)
   * `GOOGLE_INTERNSHIP_SPREADSHEET_ID` (for Internships)
4. Add your Google Service Account `credentials.json` file to the `/backend` folder.
5. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The application will launch at `http://localhost:3000`.

## Testing Externally (ngrok)

If you need to test webhooks, external API connections, or view the site on a mobile device, use `ngrok` to tunnel your local servers:

```bash
# Expose the frontend
ngrok http 3000

# Expose the backend
ngrok http 8080
```
