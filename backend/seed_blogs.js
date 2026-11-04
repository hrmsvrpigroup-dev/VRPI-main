const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://vrpi_website_db_user:lplDycC5g37fT0Eiu2Lr34ivRtNTIgnK@dpg-d97h8st7vvec73c7mjtg-a.ohio-postgres.render.com/vrpi_website_db",
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  const seedFile = path.join(__dirname, "seed_articles.json");
  if (!fs.existsSync(seedFile)) {
    console.error("seed_articles.json not found");
    process.exit(1);
  }

  const articles = JSON.parse(fs.readFileSync(seedFile, "utf8"));
  console.log(`Starting seed of ${articles.length} articles...`);

  for (const art of articles) {
    const query = `
      INSERT INTO blog_articles (id, title, slug, "fullArticleData", "updatedAt")
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        "fullArticleData" = EXCLUDED."fullArticleData",
        "updatedAt" = CURRENT_TIMESTAMP;
    `;
    await pool.query(query, [art.id, art.title, art.slug || art.id, art]);
    console.log(`✓ Seeded: ${art.title.substring(0, 45)}...`);
  }

  const count = await pool.query("SELECT count(*) FROM blog_articles;");
  console.log(`\n🎉 Success! Total blog articles in cloud database: ${count.rows[0].count}`);
  await pool.end();
}

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  pool.end();
});

