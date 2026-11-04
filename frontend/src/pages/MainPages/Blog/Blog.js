import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import style from "./Blog.module.css";
import {
  BLOG_CATEGORIES,
  getStoredPosts,
  saveStoredPosts,
  recordArticleLike,
  fetchBlogPostsFromCloud,
  syncAllLocalPostsToCloud,
} from "../../../data/BlogData";
import BlogAdminPortal from "./BlogAdminPortal";
import {
  FaSearch,
  FaTimes,
  FaRegClock,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaArrowRight,
  FaEnvelope,
  FaCheckCircle,
  FaLock,
  FaTrashAlt,
  FaCheck,
  FaCrown,
  FaEdit,
  FaShieldAlt,
} from "react-icons/fa";

const STORAGE_KEY = "vrpi_blog_posts";
const ADMIN_AUTH_KEY = "vrpi_blog_admin_auth";

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load posts from localStorage if available, or use predefined defaults
  const [posts, setPosts] = useState(() => getStoredPosts());

  // Listen for storage changes and re-sync posts
  useEffect(() => {
    const handleStorageChange = () => {
      setPosts(getStoredPosts());
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

  // Synchronize latest articles from Central PostgreSQL Cloud Database
  useEffect(() => {
    let isMounted = true;
    fetchBlogPostsFromCloud().then((res) => {
      if (isMounted && res && res.articles && res.articles.length > 0) {
        setPosts(res.articles);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Admin / Editorial Authentication & View Mode
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
  });
  const [viewMode, setViewMode] = useState("live"); // "live" or "portal"

  // Check URL query parameters (e.g. ?edit=...)
  useEffect(() => {
    const editParam = searchParams.get("edit");
    if (editParam) {
      setViewMode("portal");
    }
  }, [searchParams]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [likesMap, setLikesMap] = useState(() => {
    try {
      const saved = localStorage.getItem("vrpi_blog_likes_map");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [bookmarksMap, setBookmarksMap] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Synchronize posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error("Error saving blog posts to localStorage:", e);
    }
  }, [posts]);

  // Keyboard shortcut listener (Alt + E opens editorial login)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey && e.key.toLowerCase() === "e") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e")) {
        e.preventDefault();
        setShowLoginModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.title = "VR PI Group - Blog & Industry Insights";
    window.scrollTo(0, 0);

    const articleIdParam = searchParams.get("article");
    if (articleIdParam) {
      navigate(`/blog/${articleIdParam}`, { replace: true });
    }
  }, [searchParams, navigate]);

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setAdminUsername("");
    setAdminPassword("");
    setLoginError("");
  };

  // Login handler
  const handleAdminLogin = (e) => {
    if (e) e.preventDefault();
    const email = adminUsername.trim().toLowerCase();
    const pass = adminPassword.trim();

    if (email === "vrpitechsolutions@gmail.com" && pass === "Vrpi@1234") {
      setIsAdminLoggedIn(true);
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      closeLoginModal();
      setViewMode("portal");
      showToast("Welcome to VR PI Executive Editorial Studio!");
    } else {
      setLoginError("Invalid email or password. Please enter the authorized corporate credentials.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setViewMode("live");
    showToast("Exited editorial studio.");
  };

  // Delete Post Handler
  const handleDeletePost = (postId, postTitle, e) => {
    if (e) e.stopPropagation();
    const confirmed = window.confirm(`Are you sure you want to delete "${postTitle}"?`);
    if (confirmed) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      showToast("Article deleted successfully.");
    }
  };

  // Like & Bookmark Handlers
  const handleToggleLike = (articleId, e) => {
    if (e) e.stopPropagation();
    const currentlyLiked = !!likesMap[articleId];
    const nextLiked = !currentlyLiked;

    setLikesMap((prev) => {
      const updated = {
        ...prev,
        [articleId]: nextLiked,
      };
      try {
        localStorage.setItem("vrpi_blog_likes_map", JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });

    try {
      if (nextLiked) {
        localStorage.setItem(`vrpi_liked_${articleId}`, "true");
      } else {
        localStorage.removeItem(`vrpi_liked_${articleId}`);
      }
    } catch (err) {}

    const updated = recordArticleLike(articleId, nextLiked);
    if (updated) {
      setPosts(updated);
    }
  };

  const handleToggleBookmark = (articleId, e) => {
    if (e) e.stopPropagation();
    setBookmarksMap((prev) => {
      const isBookmarked = !prev[articleId];
      showToast(isBookmarked ? "Saved to reading list" : "Removed from reading list");
      return { ...prev, [articleId]: isBookmarked };
    });
  };

  // Share Handler
  const handleShare = (article, e) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/blog/${article.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast("Article link copied to clipboard!");
      });
    } else {
      showToast("Link copied!");
    }
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim().length > 4) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSubmitted(false);
      }, 4000);
    }
  };

  // Filtered Articles
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.subtitle.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q) ||
          post.tags?.some((t) => t.toLowerCase().includes(q)) ||
          post.author.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, selectedCategory, searchQuery]);

  // Featured Post
  const featuredPost = useMemo(() => {
    if (searchQuery.trim()) return null;
    return filteredPosts.find((p) => p.featured) || (selectedCategory === "All" ? filteredPosts[0] : null);
  }, [filteredPosts, searchQuery, selectedCategory]);

  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  // If in Portal view mode, render the dedicated Enterprise Editorial Studio
  if (viewMode === "portal") {
    return (
      <div className={style.blogPage}>
        {toastMessage && (
          <div className={style.copyToast}>
            <FaCheckCircle style={{ color: "#ff6501" }} />
            <span>{toastMessage}</span>
          </div>
        )}

        <BlogAdminPortal
          posts={posts}
          onSavePosts={(updatedPosts) => {
            setPosts(updatedPosts);
            saveStoredPosts(updatedPosts);
            syncAllLocalPostsToCloud(updatedPosts);
          }}
          onLogout={handleAdminLogout}
          onViewLiveSite={() => {
            setViewMode("live");
            setSearchParams({});
          }}
          onPreviewArticle={(art) => navigate(`/blog/${art.id}`)}
          initialEditId={searchParams.get("edit")}
          onClearEdit={() => setSearchParams({})}
          showToast={showToast}
        />
      </div>
    );
  }

  // Otherwise, render the Public Blog with Editorial Bar
  return (
    <div className={style.blogPage}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={style.copyToast}>
          <FaCheckCircle style={{ color: "#ff6501" }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Editorial Controls Bar (Only visible when logged in - hidden from normal users) */}
      {isAdminLoggedIn && (
        <div className={style.adminTopBar}>
          <div className={style.adminActiveBar}>
            <span className={style.adminBadge}>
              <span className={style.adminDot}></span>
              Executive Editorial Active
            </span>

            <button
              className={style.addPostBtn}
              onClick={() => setViewMode("portal")}
              title="Open full-featured Editorial Studio to Add, Edit, or Delete articles"
            >
              <FaCrown /> Open Editorial Studio
            </button>

            <button
              className={style.adminExitBtn}
              onClick={handleAdminLogout}
              title="Exit editorial mode"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className={style.heroSection}>
        <div className={style.heroEyebrow}>
          <span className={style.pulseDot}></span> VR PI Insights
        </div>

        <h1 className={style.heroTitle}>
          Stories, Ideas & <span className={style.heroTitleAccent}>Perspectives</span>
        </h1>

        <p className={style.heroSubtitle}>
          Real-world insights and engineering perspectives across technology, infrastructure, finance, food processing, and global trade.
        </p>

        {/* Floating Search Bar */}
        <div className={style.searchContainer}>
          <div className={style.searchBox}>
            <FaSearch className={style.searchIcon} />
            <input
              type="text"
              placeholder="Search by topic, technology, keyword, or author..."
              className={style.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className={style.clearSearchBtn}
                onClick={() => setSearchQuery("")}
                title="Clear Search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Minimalist Category Tabs */}
        <div className={style.categoryBar}>
          {BLOG_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                className={`${style.categoryTab} ${isActive ? style.activeCategoryTab : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Active Alert */}
      {searchQuery && (
        <div className={style.filterAlert}>
          <span>
            Showing results matching: <strong>"{searchQuery}"</strong>
          </span>
          <button
            onClick={() => setSearchQuery("")}
            className={style.clearFilterLink}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Featured Article Section */}
      {featuredPost && (
        <section className={style.featuredSection}>
          <div
            className={style.featuredCard}
            onClick={() => navigate(`/blog/${featuredPost.id}`)}
          >
            {/* Quick edit & delete badges if admin is active */}
            {isAdminLoggedIn && (
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  display: "flex",
                  gap: "0.5rem",
                  zIndex: 10,
                }}
              >
                <button
                  className={style.deleteCardBtn}
                  style={{ position: "static", background: "#ff6501" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchParams({ edit: featuredPost.id });
                    setViewMode("portal");
                  }}
                  title="Edit article in portal"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className={style.deleteCardBtn}
                  style={{ position: "static" }}
                  onClick={(e) => handleDeletePost(featuredPost.id, featuredPost.title, e)}
                  title="Delete this article"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            )}

            <div
              className={style.featuredImageWrap}
              style={{
                backgroundColor: featuredPost.coverImageFit === "contain" ? (featuredPost.coverImageBg || "#0f172a") : undefined,
              }}
            >
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className={style.featuredImage}
                style={{
                  objectFit: featuredPost.coverImageFit || "cover",
                }}
                loading="lazy"
              />
              <span className={style.featuredBadge}>Featured Story</span>
            </div>

            <div className={style.featuredContent}>
              <div className={style.metaRow}>
                <span className={style.categoryTag}>{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FaRegClock /> {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>

              <h2 className={style.featuredTitle}>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {featuredPost.title}
                </Link>
              </h2>
              <p className={style.featuredSubtitle}>{featuredPost.subtitle}</p>

              {featuredPost.tags && Array.isArray(featuredPost.tags) && featuredPost.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", margin: "0.5rem 0 1rem 0" }}>
                  {featuredPost.tags.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: "600",
                        color: "#ea580c",
                        background: "#fff7ed",
                        border: "1px solid #fed7aa",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "9999px",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className={style.featuredAuthorRow}>
                <div className={style.authorInfo}>
                  <img
                    src={
                      featuredPost.author?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        featuredPost.author?.name || "VR PI"
                      )}&background=ffedd5&color=ff6501&bold=true`
                    }
                    alt={featuredPost.author?.name || "Author"}
                    className={style.authorAvatar}
                  />
                  <div>
                    <h4 className={style.authorName}>{featuredPost.author.name}</h4>
                    <p className={style.authorRole}>{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.id}`}
                  className={style.readMoreBtn}
                  onClick={(e) => e.stopPropagation()}
                >
                  Read Article <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <div className={style.gridHeaderRow}>
        <h3 className={style.gridTitle}>
          {selectedCategory === "All" ? "Recent Articles" : `${selectedCategory} Articles`}
        </h3>
        <span className={style.articleCountBadge}>
          {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        </span>
      </div>

      {gridPosts.length === 0 && !featuredPost ? (
        <div className={style.emptyState}>
          <h4 className={style.emptyTitle}>No articles found</h4>
          <p className={style.emptyText}>
            We couldn't find any articles matching your search. Try another keyword or browse all categories.
          </p>
          <button
            className={style.resetBtn}
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Show All Articles
          </button>
        </div>
      ) : (
        <div className={style.articlesGrid}>
          {gridPosts.map((post) => {
            const isLiked = !!likesMap[post.id];
            const isBookmarked = !!bookmarksMap[post.id];
            const likeCount = post.likes || 0;

            return (
              <article
                key={post.id}
                className={style.articleCard}
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {/* Admin Actions */}
                {isAdminLoggedIn && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      display: "flex",
                      gap: "0.4rem",
                      zIndex: 10,
                    }}
                  >
                    <button
                      className={style.deleteCardBtn}
                      style={{ position: "static", background: "#ff6501" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchParams({ edit: post.id });
                        setViewMode("portal");
                      }}
                      title="Edit article"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={style.deleteCardBtn}
                      style={{ position: "static" }}
                      onClick={(e) => handleDeletePost(post.id, post.title, e)}
                      title="Delete this article"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}

                <div
                  className={style.cardImageWrap}
                  style={{
                    backgroundColor: post.coverImageFit === "contain" ? (post.coverImageBg || "#0f172a") : undefined,
                  }}
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className={style.cardImage}
                    style={{
                      objectFit: post.coverImageFit || "cover",
                    }}
                    loading="lazy"
                  />
                  <span className={style.cardCategory}>{post.category}</span>
                </div>

                <div className={style.cardBody}>
                  <div className={style.cardMetaRow}>
                    <span className="flex items-center gap-1">
                      <FaRegClock /> {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className={style.cardTitle}>
                    <Link
                      to={`/blog/${post.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className={style.cardExcerpt}>{post.subtitle}</p>

                  {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", margin: "0.4rem 0 0.8rem 0" }}>
                      {post.tags.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "600",
                            color: "#ea580c",
                            background: "#fff7ed",
                            border: "1px solid #fed7aa",
                            padding: "0.15rem 0.45rem",
                            borderRadius: "9999px",
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={style.cardFooter}>
                    <div className={style.cardAuthor}>
                      <img
                        src={
                          post.author?.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            post.author?.name || "VR PI"
                          )}&background=ffedd5&color=ff6501&bold=true`
                        }
                        alt={post.author?.name || "Author"}
                        className={style.cardAuthorAvatar}
                      />
                      <span className={style.cardAuthorName}>{post.author.name}</span>
                    </div>

                    <div className={style.cardActions}>
                      <button
                        className={`${style.iconBtn} ${isLiked ? style.likedIconBtn : ""}`}
                        onClick={(e) => handleToggleLike(post.id, e)}
                        title="Like"
                      >
                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                        <span>{likeCount}</span>
                      </button>

                      <button
                        className={style.iconBtn}
                        onClick={(e) => handleToggleBookmark(post.id, e)}
                        title="Save article"
                      >
                        {isBookmarked ? (
                          <FaBookmark style={{ color: "#ff6501" }} />
                        ) : (
                          <FaRegBookmark />
                        )}
                      </button>

                      <button
                        className={style.iconBtn}
                        onClick={(e) => handleShare(post, e)}
                        title="Share"
                      >
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Clean Newsletter Subscription Banner */}
      <section className={style.newsletterBanner}>
        <p className={style.newsletterEyebrow}>Stay Informed</p>
        <h3 className={style.newsletterTitle}>VR PI Executive Digest</h3>
        <p className={style.newsletterSubtitle}>
          Get high-level technology insights, infrastructure trends, and global market analyses sent directly to your inbox.
        </p>

        {newsletterSubmitted ? (
          <div className={style.newsletterSuccess}>
            <FaCheck style={{ display: "inline", marginRight: "6px" }} />
            Thank you! You have subscribed to the VR PI digest.
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className={style.newsletterForm}>
            <input
              type="email"
              required
              placeholder="Enter your corporate email address..."
              className={style.newsletterInput}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" className={style.newsletterBtn}>
              Subscribe <FaEnvelope style={{ display: "inline", marginLeft: "4px" }} />
            </button>
          </form>
        )}
      </section>

      {/* Discreet Bottom Bar (subtle staff link that general readers won't notice) */}
      <div className={style.discreetBottomBar}>
        <span>VR PI Group of Companies • Insights & Research</span>
        {!isAdminLoggedIn && (
          <button
            className={style.discreetStaffBtn}
            onClick={() => setShowLoginModal(true)}
            title="Staff Portal (Alt + E)"
          >
            <FaLock style={{ fontSize: "0.65rem", opacity: 0.6 }} />
            <span>Staff</span>
          </button>
        )}
      </div>

      {/* Subtle Floating Lock Trigger (Bottom-left corner, very discreet) */}
      {!isAdminLoggedIn && (
        <button
          className={style.discreetFloatingTrigger}
          onClick={() => setShowLoginModal(true)}
          title="Staff Portal (Alt + E)"
        >
          <FaLock />
        </button>
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className={style.modalOverlay} onClick={closeLoginModal}>
          <div
            className={style.adminLoginCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.adminModalHeader}>
              <h3 className={style.adminModalTitle}>
                <FaShieldAlt style={{ color: "#ff6501" }} /> Editorial Suite Login
              </h3>
              <button
                className={style.adminModalClose}
                onClick={closeLoginModal}
              >
                <FaTimes />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Access the VR PI Enterprise Editorial Studio to compose, update, and manage published articles.
            </p>

            <form onSubmit={handleAdminLogin} className={style.loginForm} autoComplete="off">
              <div className={style.formGroup}>
                <label className={style.formLabel}>Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="Enter corporate email..."
                  autoComplete="off"
                  className={style.formInput}
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </div>

              <div className={style.formGroup}>
                <label className={style.formLabel}>Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password..."
                  autoComplete="new-password"
                  className={style.formInput}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-xs font-semibold mt-1">
                  {loginError}
                </p>
              )}

              <button type="submit" className={style.loginSubmitBtn}>
                Unlock Editorial Studio
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
