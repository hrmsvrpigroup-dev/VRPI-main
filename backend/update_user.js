require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function updateUser() {
  try {
    await client.connect();

    const oldEmail = "shvia@gmail.com";
    const newEmail = "shiva@gmail.com";

    const query = `
      UPDATE users SET email = $1 WHERE email = $2
    `;
    const values = [newEmail, oldEmail];

    const res = await client.query(query, values);
    if (res.rowCount > 0) {
      console.log(`Successfully updated email from ${oldEmail} to ${newEmail}`);
    } else {
      console.log(`User with email ${oldEmail} not found.`);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  } finally {
    await client.end();
  }
}

updateUser();
