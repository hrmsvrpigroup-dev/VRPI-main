# VRPI Group of Companies Backend API

This is the Node.js Express server backend providing API integrations, including Google Sheets storage for the Internship Application Form.

## Setup Instructions

### 1. Install Dependencies
Navigate to the `backend` directory and run:
```bash
npm install
```

### 2. Configure Google Sheets Credentials
To use the Google Sheets API:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a Google Cloud Project.
3. Enable the **Google Sheets API**.
4. Create a **Service Account** under *IAM & Admin* -> *Service Accounts*.
5. Select the Service Account, click **Keys** -> **Add Key** -> **Create New Key**, and select **JSON**.
6. Download the key, rename it to `credentials.json`, and place it in this `backend` directory.
7. Open the downloaded JSON key and copy the service account email (e.g. `your-service-account@project.iam.gserviceaccount.com`).
8. Open your Google Sheet, click **Share**, and grant **Editor** access to the service account email address.

### 3. Configure Environment Variables
Create a `.env` file in this folder (copy from `.env.example`):
```env
PORT=8080
GOOGLE_SPREADSHEET_ID=your_google_spreadsheet_id_here
```
*(The spreadsheet ID is the long code in your Google Sheet URL between `/d/` and `/edit`)*.

### 4. Run the Server
To run in production mode:
```bash
npm start
```
To run in development mode with hot-reloading:
```bash
npm run dev
```
The server will start listening at `http://localhost:8080`.
