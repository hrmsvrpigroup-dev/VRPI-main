require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function insertUser() {
  try {
    await client.connect();

    const id = "user_" + Math.random().toString(36).substr(2, 9);
    const email = "shvia@gmail.com";
    const password = "Shiva@112";

    const query = `
      INSERT INTO users (id, email, password, "firstName", "lastName", role, roles)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [id, email, password, "Shiva", "", "student", "student"];

    await client.query(query, values);
    console.log("User inserted successfully: " + email);
  } catch (error) {
    if (error.code === '23505') {
      console.log("User already exists.");
    } else {
      console.error("Error inserting user:", error);
    }
  } finally {
    await client.end();
  }
}

insertUser();
