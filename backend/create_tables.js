require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTables() {
  try {
    await client.connect();
    console.log('Connected to the database successfully.');

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        role VARCHAR(50),
        roles VARCHAR(50),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createEducationTable = `
      CREATE TABLE IF NOT EXISTS education_details (
        id SERIAL PRIMARY KEY,
        "userId" VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        details JSONB,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createPostedInternshipsTable = `
      CREATE TABLE IF NOT EXISTS posted_internships (
        id SERIAL PRIMARY KEY,
        details JSONB,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createAppliedInternshipsTable = `
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
    `;

    await client.query(createUsersTable);
    console.log('Users table created or verified.');

    await client.query(createEducationTable);
    console.log('Education details table created or verified.');

    await client.query(createPostedInternshipsTable);
    console.log('Posted internships table created or verified.');

    await client.query(createAppliedInternshipsTable);
    console.log('Applied internships table created or verified.');

    console.log('All necessary tables are ready in the database.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await client.end();
  }
}

createTables();
