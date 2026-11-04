const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // 1. Get all blog articles
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, "fullArticleData", "updatedAt" FROM blog_articles ORDER BY "updatedAt" DESC;'
      );

      const articles = result.rows.map((row) => {
        const article = row.fullArticleData || {};
        article.id = row.id;
        article.updatedAt = row.updatedAt;
        return article;
      });

      return res.status(200).json({
        status: "success",
        count: articles.length,
        articles: articles,
      });
    } catch (err) {
      console.error("Error fetching blog articles:", err.message);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch blog articles",
      });
    }
  });

  // 2. Get single blog article by ID or slug
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'SELECT id, "fullArticleData", "updatedAt" FROM blog_articles WHERE id = $1 OR slug = $1 LIMIT 1;',
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }

      const article = result.rows[0].fullArticleData || {};
      article.id = result.rows[0].id;
      article.updatedAt = result.rows[0].updatedAt;

      return res.status(200).json({
        status: "success",
        article: article,
      });
    } catch (err) {
      console.error("Error fetching article:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });

  // 3. Upsert (Create or Update) single blog article
  router.post("/", async (req, res) => {
    try {
      const article = req.body;
      if (!article || !article.id) {
        return res.status(400).json({
          status: "error",
          message: "Article must contain a valid id",
        });
      }

      const id = article.id;
      const title = article.title || "Untitled Article";
      const slug = article.slug || article.id;

      const query = `
        INSERT INTO blog_articles (id, title, slug, "fullArticleData", "updatedAt")
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        ON CONFLICT (id) 
        DO UPDATE SET 
          title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          "fullArticleData" = EXCLUDED."fullArticleData",
          "updatedAt" = CURRENT_TIMESTAMP
        RETURNING *;
      `;

      const result = await pool.query(query, [id, title, slug, article]);

      return res.status(200).json({
        status: "success",
        message: "Article saved to central database successfully",
        article: result.rows[0].fullArticleData,
      });
    } catch (err) {
      console.error("Error saving blog article:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });

  // 4. Batch sync from local storage / other laptops
  router.post("/batch-sync", async (req, res) => {
    try {
      const { articles } = req.body;
      if (!Array.isArray(articles) || articles.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "articles must be a non-empty array",
        });
      }

      let syncedCount = 0;
      for (const article of articles) {
        if (!article || !article.id) continue;
        const id = article.id;
        const title = article.title || "Untitled Article";
        const slug = article.slug || article.id;

        const query = `
          INSERT INTO blog_articles (id, title, slug, "fullArticleData", "updatedAt")
          VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
          ON CONFLICT (id) 
          DO UPDATE SET 
            title = EXCLUDED.title,
            slug = EXCLUDED.slug,
            "fullArticleData" = EXCLUDED."fullArticleData",
            "updatedAt" = CURRENT_TIMESTAMP;
        `;
        await pool.query(query, [id, title, slug, article]);
        syncedCount++;
      }

      return res.status(200).json({
        status: "success",
        message: `Successfully synchronized ${syncedCount} articles to PostgreSQL database!`,
        syncedCount,
      });
    } catch (err) {
      console.error("Error in batch sync:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });

  // 5. Delete an article
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM blog_articles WHERE id = $1;", [id]);
      return res.status(200).json({
        status: "success",
        message: "Article deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting article:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });

  // 6. Record article view telemetry
  router.post("/:id/view", async (req, res) => {
    const { id } = req.params;
    try {
      const selectQuery =
        'SELECT "fullArticleData" FROM blog_articles WHERE id = $1;';
      const selectRes = await pool.query(selectQuery, [id]);
      if (selectRes.rowCount === 0) {
        return res.status(404).json({ status: "error", message: "Not found" });
      }

      const data = selectRes.rows[0].fullArticleData || {};
      const currentViews = parseInt(data.views, 10) || 0;
      data.views = currentViews + 1;

      await pool.query(
        'UPDATE blog_articles SET "fullArticleData" = $1 WHERE id = $2;',
        [data, id]
      );

      return res.status(200).json({
        status: "success",
        views: data.views,
      });
    } catch (err) {
      console.error("Error recording view:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });

  // 7. Record article like telemetry
  router.post("/:id/like", async (req, res) => {
    const { id } = req.params;
    const { increment } = req.body; // true to like, false to unlike
    try {
      const selectQuery =
        'SELECT "fullArticleData" FROM blog_articles WHERE id = $1;';
      const selectRes = await pool.query(selectQuery, [id]);
      if (selectRes.rowCount === 0) {
        return res.status(404).json({ status: "error", message: "Not found" });
      }

      const data = selectRes.rows[0].fullArticleData || {};
      const currentLikes = parseInt(data.likes, 10) || 0;
      data.likes = increment !== false ? currentLikes + 1 : Math.max(0, currentLikes - 1);

      await pool.query(
        'UPDATE blog_articles SET "fullArticleData" = $1 WHERE id = $2;',
        [data, id]
      );

      return res.status(200).json({
        status: "success",
        likes: data.likes,
      });
    } catch (err) {
      console.error("Error recording like:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });

  return router;
};
