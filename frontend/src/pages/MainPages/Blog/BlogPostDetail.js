import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import style from "./BlogPostDetail.module.css";
import {
  getStoredPosts,
  saveStoredPosts,
  recordArticleView,
  recordArticleLike,
  ADMIN_AUTH_KEY,
} from "../../../data/BlogData";
import RichArticleRenderer from "./RichArticleRenderer";
import {
  FaArrowLeft,
  FaRegClock,
  FaCalendarAlt,
  FaRegEye,
  FaHeart,
  FaRegHeart,
  FaLinkedinIn,
  FaWhatsapp,
  FaTwitter,
  FaCopy,
  FaCheckCircle,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

export default function BlogPostDetail() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState(() => getStoredPosts());
  const [isLiked, setIsLiked] = useState(() => {
    try {
      return localStorage.getItem(`vrpi_liked_${articleId}`) === "true";
    } catch (e) {
      return false;
    }
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Record real-time view and sync stored posts
  useEffect(() => {
    if (articleId) {
      try {
        setIsLiked(localStorage.getItem(`vrpi_liked_${articleId}`) === "true");
      } catch (e) {}

      // Increment real view counter if new session visit
      const updated = recordArticleView(articleId);
      if (updated) {
        setPosts(updated);
      } else {
        setPosts(getStoredPosts());
      }
    }
  }, [articleId]);

  // Re-sync with stored posts whenever storage event fires or window gains focus
  useEffect(() => {
    const syncPosts = () => {
      setPosts(getStoredPosts());
    };

    window.addEventListener("storage", syncPosts);
    window.addEventListener("focus", syncPosts);
    return () => {
      window.removeEventListener("storage", syncPosts);
      window.removeEventListener("focus", syncPosts);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Comments state
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Pooja Mehta",
      date: "Nov 2, 2026",
      text: "Exceptional breakdown. The strategic alignment across infrastructure and zero-trust engineering is paramount for high-growth firms.",
    },
  ]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");

  const isAdminLoggedIn = localStorage.getItem(ADMIN_AUTH_KEY) === "true";

  // Find the requested article
  const article = useMemo(() => {
    return posts.find((p) => p.id === articleId);
  }, [posts, articleId]);

  // Related articles (from the same category or other featured posts)
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return posts
      .filter((p) => p.id !== article.id && (p.category === article.category || p.featured))
      .slice(0, 2);
  }, [posts, article]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) {
      document.title = `${article.title} | VR PI Insights`;
    } else {
      document.title = "Article Not Found | VR PI Group";
    }
  }, [article]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleToggleLike = () => {
    if (!article) return;
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    try {
      if (nextLiked) {
        localStorage.setItem(`vrpi_liked_${article.id}`, "true");
      } else {
        localStorage.removeItem(`vrpi_liked_${article.id}`);
      }
    } catch (e) {}

    const updated = recordArticleLike(article.id, nextLiked);
    if (updated) {
      setPosts(updated);
    }
    showToast(nextLiked ? "Story endorsed! Thank you for reading." : "Endorsement removed.");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast("Article link copied to clipboard!");
      });
    } else {
      showToast("Link copied!");
    }
  };

  const handleDeleteArticle = () => {
    if (!article) return;
    const confirmed = window.confirm(`Are you sure you want to delete "${article.title}"?`);
    if (confirmed) {
      const updated = posts.filter((p) => p.id !== article.id);
      saveStoredPosts(updated);
      alert("Article deleted successfully.");
      navigate("/blog");
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newCmt = {
      id: Date.now(),
      author: newAuthor.trim() || "Industry Executive",
      date: "Just now",
      text: newText.trim(),
    };

    setComments([newCmt, ...comments]);
    setNewAuthor("");
    setNewText("");
    showToast("Thank you! Your thought has been published.");
  };

  if (!article) {
    return (
      <div className={style.postPage} style={{ textAlign: "center", padding: "5rem 1.5rem" }}>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h2>
        <p className="text-slate-500 mb-6">
          The requested article may have been archived or removed.
        </p>
        <Link to="/blog" className={style.backBtn}>
          <FaArrowLeft /> Return to Blog
        </Link>
      </div>
    );
  }

  const likeCount = article.likes || 0;

  return (
    <article className={style.postPage}>
      {/* Top Reading Progress Indicator */}
      <div className={style.progressBar} style={{ width: `${readingProgress}%` }} />

      <div className={style.articleContainer}>
        {toastMessage && (
          <div className={style.copyToast}>
            <FaCheckCircle style={{ color: "#ff6501" }} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Breadcrumb Navigation */}
        <nav className={style.breadcrumbNav}>
          <Link to="/" className={style.breadcrumbLink}>
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className={style.breadcrumbLink}>
            Blog
          </Link>
          <span>/</span>
          <span className={style.breadcrumbLink}>{article.category}</span>
          <span>/</span>
          <span className={style.breadcrumbCurrent}>{article.title}</span>
        </nav>

        {/* Top Actions Row */}
        <div className={style.topActionsRow}>
          <Link to="/blog" className={style.backBtn}>
            <FaArrowLeft /> Back to All Articles
          </Link>

          {isAdminLoggedIn && (
            <div className={style.adminArticleActions}>
              <button
                className={style.editArticleBtn}
                onClick={() => navigate(`/blog?edit=${article.id}`)}
                title="Edit in portal"
              >
                <FaEdit /> Edit Story
              </button>
              <button
                className={style.deleteArticleBtn}
                onClick={handleDeleteArticle}
                title="Delete story"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Article Header */}
        <header className={style.articleHeader}>
          <div className={style.categoryBadge}>
            <span className={style.categoryBadgeDot}></span>
            <span>{article.category}</span>
          </div>
          <h1 className={style.articleTitle}>{article.title}</h1>
          <p className={style.articleSubtitle}>{article.subtitle}</p>

          {/* Author Metadata Bar */}
          <div className={style.authorMetaBar}>
            <div className={style.authorInfoGroup}>
              <img
                src={
                  article.author?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    article.author?.name || "VR PI"
                  )}&background=ffedd5&color=ff6501&bold=true`
                }
                alt={article.author?.name || "Author"}
                className={style.authorAvatar}
              />
              <div>
                <h3 className={style.authorName}>{article.author.name}</h3>
                <p className={style.authorRole}>{article.author.role}</p>
              </div>
            </div>

            <div className={style.articleTimeMeta}>
              <span className={style.metaPill}>
                <FaCalendarAlt style={{ color: "#ff6501" }} /> {article.date}
              </span>
              <span className={style.metaPill}>
                <FaRegClock style={{ color: "#ff6501" }} /> {article.readTime}
              </span>
              <span className={style.metaPill} title="Real-time verified article readers">
                <FaRegEye style={{ color: "#ff6501" }} /> {article.views || 0} {article.views === 1 ? "reader" : "readers"}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image with Custom Sizing */}
        <div
          className={style.coverImageWrap}
          style={{
            backgroundColor: article.coverImageFit === "contain" ? (article.coverImageBg || "#0f172a") : "#f1f5f9",
            maxHeight: article.coverImageHeight === "auto" ? "none" : (article.coverImageHeight || "540px"),
          }}
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className={style.coverImage}
            style={{
              objectFit: article.coverImageFit || "cover",
              maxHeight: article.coverImageHeight === "auto" ? "none" : (article.coverImageHeight || "540px"),
              height: article.coverImageHeight === "auto" ? "auto" : undefined,
              width: "100%",
            }}
          />
        </div>

        {/* Optimal Line-Length Reading Column */}
        <div className={style.articleReadingCol}>
          {/* Key Strategic Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className={style.takeawaysBox}>
              <h4 className={style.takeawaysHeading}>
                <FaCheckCircle /> Key Strategic Takeaways
              </h4>
              <ul className={style.takeawaysList}>
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className={style.takeawaysItem}>
                    <FaCheckCircle className={style.takeawayIcon} />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div className={style.articleBody}>
            <RichArticleRenderer
              content={article.contentParagraphs || article.content}
            />
          </div>

          {/* Article Topic Tags */}
          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className={style.articleTagsSection}>
              <span className={style.tagsSectionLabel}>Topics & Tags:</span>
              <div className={style.tagsPillList}>
                {article.tags.map((tag, idx) => (
                  <span key={idx} className={style.articleTagPill}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interaction & Sharing Bar */}
          <div className={style.interactionBar}>
            <button
              className={`${style.likeBtn} ${isLiked ? style.likeBtnActive : ""}`}
              onClick={handleToggleLike}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <span>{isLiked ? "Endorsed (" : "Endorse ("}{likeCount})</span>
            </button>

            <div className={style.shareGroup}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Share:
              </span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${article.title} - ${window.location.href}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={style.shareIconBtn}
                title="Share on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={style.shareIconBtn}
                title="Share on LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  article.title
                )}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={style.shareIconBtn}
                title="Share on X"
              >
                <FaTwitter />
              </a>
              <button
                className={style.shareIconBtn}
                onClick={handleShare}
                title="Copy Link"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          {/* Author Bio Card */}
          <div className={style.authorBioCard}>
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className={style.bioAvatar}
            />
            <div className={style.bioInfo}>
              <h4>About {article.author.name}</h4>
              <p>{article.author.role}</p>
              <span className={style.bioCompanyTag}>VR PI Group of Companies</span>
            </div>
          </div>

          {/* Reader Discussion Section */}
          <section className={style.commentsSection}>
            <h3 className={style.commentsHeading}>
              Executive Discussion ({comments.length})
            </h3>

            <form onSubmit={handleAddComment} className={style.commentForm}>
              <input
                type="text"
                placeholder="Your name or organization (optional)"
                className={`${style.commentInput} ${style.commentAuthorInput}`}
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <textarea
                rows={3}
                required
                placeholder="Contribute your thought, strategic critique, or question..."
                className={style.commentInput}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <button type="submit" className={style.postCommentBtn}>
                Post Contribution
              </button>
            </form>

            <div className={style.commentsList}>
              {comments.map((cmt) => (
                <div key={cmt.id} className={style.singleComment}>
                  <div className={style.commentHeader}>
                    <span className={style.commentAuthor}>{cmt.author}</span>
                    <span className={style.commentDate}>{cmt.date}</span>
                  </div>
                  <p className={style.commentText}>{cmt.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section className={style.relatedSection}>
              <h3 className={style.relatedHeading}>Related Articles</h3>
              <div className={style.relatedGrid}>
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/blog/${rel.id}`}
                    className={style.relatedCard}
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className={style.relatedThumb}
                    />
                    <div className={style.relatedInfo}>
                      <p className={style.relatedCategory}>{rel.category}</p>
                      <h4 className={style.relatedTitle}>{rel.title}</h4>
                      <span className={style.relatedMeta}>{rel.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
