import React, { useState, useMemo, useRef } from "react";
import style from "./BlogAdminPortal.module.css";
import {
  BLOG_CATEGORIES,
  resetTelemetryStats,
  fetchBlogPostsFromCloud,
  syncAllLocalPostsToCloud,
  saveBlogPostToCloud,
  deleteBlogPostFromCloud,
} from "../../../data/BlogData";
import RichArticleRenderer from "./RichArticleRenderer";
import {
  FaCrown,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaChartLine,
  FaBookOpen,
  FaUserShield,
  FaSearch,
  FaCheckCircle,
  FaSignOutAlt,
  FaStar,
  FaRegEye,
  FaRegHeart,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaCloudUploadAlt,
  FaSyncAlt,
  FaLink,
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaQuoteLeft,
  FaListUl,
  FaListOl,
  FaMinus,
  FaCode,
  FaDesktop,
  FaPenNib,
  FaImage,
  FaCamera,
  FaCropAlt,
} from "react-icons/fa";

const PRESET_AVATARS = [
  { label: "Dr. Arvind (Tech)", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
  { label: "Executive Leader", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
  { label: "Specialist", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
  { label: "Director", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
];

const PRESET_IMAGES = [
  { label: "Technology", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
  { label: "Infrastructure", url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80" },
  { label: "Finance", url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80" },
  { label: "Food Processing", url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" },
  { label: "Global Trade", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" },
  { label: "Consulting", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" },
  { label: "EduTech", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" },
];

export function parseContentToBlocks(raw) {
  if (!raw || typeof raw !== "string") {
    return [{ id: "txt_0", type: "text", value: "" }];
  }

  // Normalize multi-line image tags
  const normalized = raw
    .replace(/\r\n/g, "\n")
    .replace(/!\[([^\]]*?)\]\s*\(([\s\S]*?)\)/g, (match, alt, url) => {
      const cleanAlt = alt.replace(/\n+/g, " ").trim();
      const cleanUrl = url.replace(/\s+/g, "").trim();
      return `\n\n![${cleanAlt}](${cleanUrl})\n\n`;
    });

  const imgRegex = /!\[([^\]]*?)\]\(([\s\S]*?)\)/g;
  const blocks = [];
  let lastIndex = 0;
  let match;
  let idCounter = 1;

  while ((match = imgRegex.exec(normalized)) !== null) {
    const textBefore = normalized.substring(lastIndex, match.index).trim();
    if (textBefore) {
      blocks.push({ id: `txt_${idCounter++}`, type: "text", value: textBefore });
    }
    const rawAlt = match[1];
    const url = match[2].trim();
    let caption = rawAlt;
    let width = "100%";
    let align = "center";
    if (rawAlt && rawAlt.includes("|")) {
      const parts = rawAlt.split("|");
      caption = parts[0].trim();
      for (let i = 1; i < parts.length; i++) {
        const p = parts[i].trim().toLowerCase();
        if (p.startsWith("width=")) width = p.replace("width=", "");
        else if (p.startsWith("size=")) width = p.replace("size=", "");
        else if (p === "full" || p === "100%") width = "100%";
        else if (p === "large" || p === "75%") width = "75%";
        else if (p === "medium" || p === "50%") width = "50%";
        else if (p === "small" || p === "35%" || p === "30%") width = "35%";
        else if (p === "left" || p === "center" || p === "right") align = p;
        else if (p.startsWith("align=")) align = p.replace("align=", "");
      }
    }
    blocks.push({
      id: `img_${idCounter++}`,
      type: "image",
      url,
      caption,
      width,
      align,
    });
    lastIndex = match.index + match[0].length;
  }

  const remaining = normalized.substring(lastIndex).trim();
  if (remaining || blocks.length === 0) {
    blocks.push({ id: `txt_${idCounter++}`, type: "text", value: remaining });
  }

  return blocks;
}

export function blocksToMarkdown(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  return blocks
    .map((b) => {
      if (b.type === "image") {
        const caption = b.caption || "Article Graphic";
        const width = b.width || "100%";
        const align = b.align || "center";
        return `\n\n![${caption}|width=${width}|align=${align}](${b.url})\n\n`;
      }
      return b.value || "";
    })
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function BlogAdminPortal({
  posts,
  onSavePosts,
  onLogout,
  onViewLiveSite,
  onPreviewArticle,
  showToast,
  initialEditId,
  onClearEdit,
}) {
  const [activeTab, setActiveTab] = useState("articles"); // "articles", "editor", "analytics", "profile"
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Track if we are editing an existing article or writing a new one
  const [editingArticleId, setEditingArticleId] = useState(null);

  // Editor form state
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "Tech Solutions",
    authorName: "Sandeep Kumar Pikili",
    authorRole: "Managing Director, VR PI Group",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    readTime: "5 min read",
    coverImage: PRESET_IMAGES[0].url,
    coverImageHeight: "auto",
    coverImageFit: "cover",
    coverImageBg: "#0f172a",
    tags: "Enterprise, Innovation, Leadership",
    keyTakeaway1: "",
    keyTakeaway2: "",
    keyTakeaway3: "",
    contentParagraphs: "",
    featured: false,
  });

  // Media upload & management state
  const fileInputRef = useRef(null);
  const [mediaMode, setMediaMode] = useState("upload"); // "upload" or "url"
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingMedia, setIsProcessingMedia] = useState(false);

  // Process & optimize uploaded image file
  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 12MB.");
      return;
    }

    setIsProcessingMedia(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Automatically optimize image dimensions to max 1400px for high performance
        const maxDim = 1400;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        try {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);

          setFormData((prev) => ({
            ...prev,
            coverImage: compressedDataUrl,
          }));
          setIsProcessingMedia(false);
          showToast("Cover media uploaded & optimized successfully!");
        } catch (err) {
          setFormData((prev) => ({
            ...prev,
            coverImage: event.target.result,
          }));
          setIsProcessingMedia(false);
          showToast("Cover media uploaded successfully!");
        }
      };

      img.onerror = () => {
        setFormData((prev) => ({
          ...prev,
          coverImage: event.target.result,
        }));
        setIsProcessingMedia(false);
        showToast("Cover media uploaded successfully!");
      };
    };

    reader.onerror = () => {
      alert("Failed to read image file.");
      setIsProcessingMedia(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processImageFile(file);
    }
    e.target.value = "";
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Inline Media Insert Modal state
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaModalTab, setMediaModalTab] = useState("upload"); // "upload" | "url"
  const [mediaModalUrl, setMediaModalUrl] = useState("");
  const [mediaModalCaption, setMediaModalCaption] = useState("");
  const [mediaModalWidth, setMediaModalWidth] = useState("100%");
  const [mediaModalAlign, setMediaModalAlign] = useState("center");
  const [isProcessingInlineMedia, setIsProcessingInlineMedia] = useState(false);
  const [mediaSavedSelection, setMediaSavedSelection] = useState(null);
  const inlineModalFileInputRef = useRef(null);

  // Open Media Modal and preserve selection
  const handleOpenMediaModal = () => {
    const textarea = contentTextareaRef.current;
    if (textarea) {
      setMediaSavedSelection({
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
      });
    } else {
      setMediaSavedSelection(null);
    }
    setMediaModalUrl("");
    setMediaModalCaption("");
    setMediaModalWidth("100%");
    setMediaModalAlign("center");
    setShowMediaModal(true);
  };

  // Handle image upload inside media modal
  const handleInlineModalFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }
    setIsProcessingInlineMedia(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        try {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          setMediaModalUrl(compressedDataUrl);
          setIsProcessingInlineMedia(false);
          showToast("Image ready for insertion!");
        } catch (err) {
          setMediaModalUrl(event.target.result);
          setIsProcessingInlineMedia(false);
        }
      };
      img.onerror = () => {
        setMediaModalUrl(event.target.result);
        setIsProcessingInlineMedia(false);
      };
    };
    reader.onerror = () => {
      alert("Failed to read image file.");
      setIsProcessingInlineMedia(false);
    };
    reader.readAsDataURL(file);
  };

  // Content Editor Mode: "visual" (default, images displayed visually) or "markdown"
  const [contentEditorMode, setContentEditorMode] = useState("visual");
  const [contentBlocks, setContentBlocks] = useState(() =>
    parseContentToBlocks(formData.contentParagraphs)
  );
  const [activeTextBlockIndex, setActiveTextBlockIndex] = useState(0);
  const textBlockRefs = useRef({});

  // Block management functions
  const handleUpdateTextBlock = (index, value) => {
    const updated = [...contentBlocks];
    updated[index] = { ...updated[index], value };
    setContentBlocks(updated);
    setFormData((prev) => ({
      ...prev,
      contentParagraphs: blocksToMarkdown(updated),
    }));
  };

  const handleUpdateImageBlock = (index, updates) => {
    const updated = [...contentBlocks];
    updated[index] = { ...updated[index], ...updates };
    setContentBlocks(updated);
    setFormData((prev) => ({
      ...prev,
      contentParagraphs: blocksToMarkdown(updated),
    }));
  };

  const handleRemoveImageBlock = (index) => {
    const updated = contentBlocks.filter((_, i) => i !== index);
    const finalBlocks =
      updated.length === 0
        ? [{ id: `txt_${Date.now()}`, type: "text", value: "" }]
        : updated;
    setContentBlocks(finalBlocks);
    setFormData((prev) => ({
      ...prev,
      contentParagraphs: blocksToMarkdown(finalBlocks),
    }));
    showToast("Image graphic removed from article.");
  };

  const handleAddParagraphBelow = (index) => {
    const newTextBlock = {
      id: `txt_${Date.now()}`,
      type: "text",
      value: "",
    };
    const updated = [
      ...contentBlocks.slice(0, index + 1),
      newTextBlock,
      ...contentBlocks.slice(index + 1),
    ];
    setContentBlocks(updated);
    setFormData((prev) => ({
      ...prev,
      contentParagraphs: blocksToMarkdown(updated),
    }));
  };

  const handleSwitchToVisual = () => {
    setContentBlocks(parseContentToBlocks(formData.contentParagraphs));
    setContentEditorMode("visual");
  };

  const handleSwitchToMarkdown = () => {
    setFormData((prev) => ({
      ...prev,
      contentParagraphs: blocksToMarkdown(contentBlocks),
    }));
    setContentEditorMode("markdown");
  };

  // Insert configured media into editor content
  const handleInsertInlineMedia = () => {
    if (!mediaModalUrl.trim()) {
      alert("Please upload or provide an image URL first.");
      return;
    }

    const caption = mediaModalCaption.trim() || "Article Graphic";
    const width = mediaModalWidth || "100%";
    const align = mediaModalAlign || "center";

    const newImageBlock = {
      id: `img_${Date.now()}`,
      type: "image",
      url: mediaModalUrl,
      caption,
      width,
      align,
    };
    const newTextBlock = {
      id: `txt_${Date.now() + 1}`,
      type: "text",
      value: "",
    };

    let updatedBlocks;
    const targetIdx =
      activeTextBlockIndex >= 0 && activeTextBlockIndex < contentBlocks.length
        ? activeTextBlockIndex
        : contentBlocks.length - 1;

    if (targetIdx >= 0) {
      updatedBlocks = [
        ...contentBlocks.slice(0, targetIdx + 1),
        newImageBlock,
        newTextBlock,
        ...contentBlocks.slice(targetIdx + 1),
      ];
    } else {
      updatedBlocks = [newImageBlock, newTextBlock];
    }

    setContentBlocks(updatedBlocks);
    const newMarkdown = blocksToMarkdown(updatedBlocks);
    setFormData((prev) => ({ ...prev, contentParagraphs: newMarkdown }));
    setShowMediaModal(false);
    showToast(`Image graphic added to story (${width} width)!`);
  };

  // WordPress Editor & Live Preview state
  const [editorViewMode, setEditorViewMode] = useState("write"); // "write", "preview"
  const contentTextareaRef = useRef(null);
  const inlineImageInputRef = useRef(null);

  // WordPress-style formatting helpers
  const insertFormat = (prefix, suffix = "", defaultText = "Text") => {
    if (contentEditorMode === "markdown") {
      const textarea = contentTextareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value || "";
      let selected = text.substring(start, end);

      let leadSpaces = "";
      let trailSpaces = "";

      if (selected) {
        const leadMatch = selected.match(/^(\s+)/);
        if (leadMatch) {
          leadSpaces = leadMatch[1];
          selected = selected.slice(leadSpaces.length);
        }
        const trailMatch = selected.match(/(\s+)$/);
        if (trailMatch) {
          trailSpaces = trailMatch[1];
          selected = selected.slice(0, selected.length - trailSpaces.length);
        }
      }

      let replacement = "";
      if (
        selected &&
        selected.startsWith(prefix) &&
        selected.endsWith(suffix) &&
        selected.length >= prefix.length + suffix.length
      ) {
        const unformatted = selected.slice(prefix.length, selected.length - suffix.length);
        replacement = `${leadSpaces}${unformatted}${trailSpaces}`;
      } else {
        replacement = selected
          ? `${leadSpaces}${prefix}${selected}${suffix}${trailSpaces}`
          : `${prefix}${defaultText}${suffix}`;
      }

      const newText = text.substring(0, start) + replacement + text.substring(end);
      setFormData((prev) => ({ ...prev, contentParagraphs: newText }));
      setContentBlocks(parseContentToBlocks(newText));

      setTimeout(() => {
        textarea.focus();
        if (selected) {
          const selStart = start + leadSpaces.length;
          const selEnd = selStart + replacement.trim().length;
          textarea.setSelectionRange(selStart, selEnd);
        } else {
          const selStart = start + prefix.length;
          const selEnd = selStart + defaultText.length;
          textarea.setSelectionRange(selStart, selEnd);
        }
      }, 20);
      return;
    }

    // In Visual Mode: apply to active text block
    const targetIdx =
      activeTextBlockIndex >= 0 && activeTextBlockIndex < contentBlocks.length
        ? activeTextBlockIndex
        : contentBlocks.findIndex((b) => b.type === "text");

    if (targetIdx === -1) {
      const newBlock = {
        id: `txt_${Date.now()}`,
        type: "text",
        value: `${prefix}${defaultText}${suffix}`,
      };
      const updated = [...contentBlocks, newBlock];
      setContentBlocks(updated);
      setFormData((prev) => ({ ...prev, contentParagraphs: blocksToMarkdown(updated) }));
      return;
    }

    const currentText = contentBlocks[targetIdx]?.value || "";
    const activeTextarea = textBlockRefs.current[contentBlocks[targetIdx]?.id];
    let start = currentText.length;
    let end = currentText.length;
    if (activeTextarea) {
      start = activeTextarea.selectionStart;
      end = activeTextarea.selectionEnd;
    }
    const selected = currentText.substring(start, end);
    const replacement = selected ? `${prefix}${selected}${suffix}` : `${prefix}${defaultText}${suffix}`;
    const newText = currentText.substring(0, start) + replacement + currentText.substring(end);
    handleUpdateTextBlock(targetIdx, newText);
  };

  const insertHeading = (level) => {
    const prefix = "#".repeat(level) + " ";
    if (contentEditorMode === "markdown") {
      const textarea = contentTextareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value || "";

      const lastNewline = text.lastIndexOf("\n", start - 1);
      const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
      const nextNewline = text.indexOf("\n", end);
      const lineEnd = nextNewline === -1 ? text.length : nextNewline;
      const currentLine = text.substring(lineStart, lineEnd);

      let newLine = "";
      if (currentLine.startsWith(prefix)) {
        newLine = currentLine.slice(prefix.length);
      } else {
        const cleanedLine = currentLine.replace(/^#{1,6}\s+/, "");
        newLine = `${prefix}${cleanedLine || `Heading ${level}`}`;
      }

      const newText = text.substring(0, lineStart) + newLine + text.substring(lineEnd);
      setFormData((prev) => ({ ...prev, contentParagraphs: newText }));
      setContentBlocks(parseContentToBlocks(newText));
      return;
    }

    // Visual Mode
    const targetIdx =
      activeTextBlockIndex >= 0 && activeTextBlockIndex < contentBlocks.length
        ? activeTextBlockIndex
        : contentBlocks.findIndex((b) => b.type === "text");

    if (targetIdx === -1) {
      const newBlock = {
        id: `txt_${Date.now()}`,
        type: "text",
        value: `${prefix}Heading ${level}`,
      };
      const updated = [...contentBlocks, newBlock];
      setContentBlocks(updated);
      setFormData((prev) => ({ ...prev, contentParagraphs: blocksToMarkdown(updated) }));
      return;
    }

    const currentText = contentBlocks[targetIdx]?.value || "";
    const activeTextarea = textBlockRefs.current[contentBlocks[targetIdx]?.id];
    let start = currentText.length;
    let end = currentText.length;
    if (activeTextarea) {
      start = activeTextarea.selectionStart;
      end = activeTextarea.selectionEnd;
    }
    const lastNewline = currentText.lastIndexOf("\n", start - 1);
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
    const nextNewline = currentText.indexOf("\n", end);
    const lineEnd = nextNewline === -1 ? currentText.length : nextNewline;
    const currentLine = currentText.substring(lineStart, lineEnd);
    const cleanedLine = currentLine.replace(/^#{1,6}\s+/, "");
    const newLine = `${prefix}${cleanedLine || `Heading ${level}`}`;
    const newText = currentText.substring(0, lineStart) + newLine + currentText.substring(lineEnd);
    handleUpdateTextBlock(targetIdx, newText);
  };

  const insertBlock = (prefix, defaultText = "Item") => {
    if (contentEditorMode === "markdown") {
      const textarea = contentTextareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value || "";

      const lastNewline = text.lastIndexOf("\n", start - 1);
      const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
      const nextNewline = text.indexOf("\n", end);
      const lineEnd = nextNewline === -1 ? text.length : nextNewline;
      const currentLine = text.substring(lineStart, lineEnd);

      let newLine = "";
      const blockPrefix = prefix.endsWith(" ") ? prefix : `${prefix} `;

      if (currentLine.startsWith(blockPrefix)) {
        newLine = currentLine.slice(blockPrefix.length);
      } else {
        const cleaned = currentLine.replace(/^([>*-]|\d+\.)\s+/, "");
        newLine = `${blockPrefix}${cleaned || defaultText}`;
      }

      const newText = text.substring(0, lineStart) + newLine + text.substring(lineEnd);
      setFormData((prev) => ({ ...prev, contentParagraphs: newText }));
      setContentBlocks(parseContentToBlocks(newText));
      return;
    }

    // Visual Mode
    const targetIdx =
      activeTextBlockIndex >= 0 && activeTextBlockIndex < contentBlocks.length
        ? activeTextBlockIndex
        : contentBlocks.findIndex((b) => b.type === "text");

    if (targetIdx === -1) {
      const newBlock = {
        id: `txt_${Date.now()}`,
        type: "text",
        value: `${prefix} ${defaultText}`,
      };
      const updated = [...contentBlocks, newBlock];
      setContentBlocks(updated);
      setFormData((prev) => ({ ...prev, contentParagraphs: blocksToMarkdown(updated) }));
      return;
    }

    const currentText = contentBlocks[targetIdx]?.value || "";
    const activeTextarea = textBlockRefs.current[contentBlocks[targetIdx]?.id];
    const start = activeTextarea ? activeTextarea.selectionStart : currentText.length;
    const newText = currentText.substring(0, start) + `\n\n${prefix} ${defaultText}\n\n` + currentText.substring(start);
    handleUpdateTextBlock(targetIdx, newText);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (!url) return;
    const label = prompt("Enter display label:", "Reference link");
    insertFormat(`[${label || "Link"}](`, `${url})`);
  };

  const insertDivider = () => {
    if (contentEditorMode === "markdown") {
      const textarea = contentTextareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const text = textarea.value || "";
      const newText = text.substring(0, start) + "\n\n---\n\n" + text.substring(start);
      setFormData((prev) => ({ ...prev, contentParagraphs: newText }));
      setContentBlocks(parseContentToBlocks(newText));
      return;
    }

    const targetIdx =
      activeTextBlockIndex >= 0 && activeTextBlockIndex < contentBlocks.length
        ? activeTextBlockIndex
        : contentBlocks.findIndex((b) => b.type === "text");

    if (targetIdx === -1) {
      const newBlock = { id: `txt_${Date.now()}`, type: "text", value: "\n\n---\n\n" };
      const updated = [...contentBlocks, newBlock];
      setContentBlocks(updated);
      setFormData((prev) => ({ ...prev, contentParagraphs: blocksToMarkdown(updated) }));
      return;
    }

    const currentText = contentBlocks[targetIdx]?.value || "";
    const activeTextarea = textBlockRefs.current[contentBlocks[targetIdx]?.id];
    const start = activeTextarea ? activeTextarea.selectionStart : currentText.length;
    const newText = currentText.substring(0, start) + "\n\n---\n\n" + currentText.substring(start);
    handleUpdateTextBlock(targetIdx, newText);
  };

  const handleInlineImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const textarea = contentTextareaRef.current;
      const start = textarea ? textarea.selectionStart : (formData.contentParagraphs || "").length;
      const text = formData.contentParagraphs || "";
      const caption = prompt("Enter image caption (optional):", "Article Graphic") || "Article Graphic";
      const sizeInput = prompt(
        "Choose image display size:\n1 = Full Width (100%)\n2 = Large (75%)\n3 = Medium (50%)\n4 = Compact (35%)\nOr enter a custom width (e.g. 60%, 450px):",
        "100%"
      );

      let customWidth = "100%";
      if (sizeInput === "1" || sizeInput === "full" || !sizeInput) customWidth = "100%";
      else if (sizeInput === "2" || sizeInput === "large") customWidth = "75%";
      else if (sizeInput === "3" || sizeInput === "medium") customWidth = "50%";
      else if (sizeInput === "4" || sizeInput === "compact" || sizeInput === "small") customWidth = "35%";
      else customWidth = sizeInput.trim();

      const imageMarkdown = `\n\n![${caption}|width=${customWidth}](${event.target.result})\n\n`;

      const newText = text.substring(0, start) + imageMarkdown + text.substring(start);
      setFormData((prev) => ({ ...prev, contentParagraphs: newText }));
      showToast(`Custom size image (${customWidth}) inserted!`);
    };
    reader.readAsDataURL(file);
  };

  // Author Avatar Management (Upload, Update, Delete)
  const authorAvatarInputRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Crop/scale to 300x300 center square
        const canvas = document.createElement("canvas");
        const dim = Math.min(img.width, img.height);
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");

        const sx = (img.width - dim) / 2;
        const sy = (img.height - dim) / 2;
        ctx.drawImage(img, sx, sy, dim, dim, 0, 0, 300, 300);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
        setFormData((prev) => ({ ...prev, authorAvatar: dataUrl }));
        showToast("Author avatar updated successfully!");
      };
      img.onerror = () => {
        setFormData((prev) => ({ ...prev, authorAvatar: event.target.result }));
        showToast("Author avatar updated!");
      };
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        prev.authorName || "VR PI"
      )}&background=ffedd5&color=ff6501&bold=true`,
    }));
    showToast("Author avatar removed / reset to initials.");
  };

  const handleSelectAvatarPreset = (url) => {
    setFormData((prev) => ({ ...prev, authorAvatar: url }));
    showToast("Author avatar preset applied!");
  };

  React.useEffect(() => {
    if (initialEditId) {
      const art = posts.find((p) => p.id === initialEditId);
      if (art) {
        handleStartEdit(art);
      }
    }
  }, [initialEditId, posts]);

  // Calculate high-level stats
  const totalViews = useMemo(() => {
    return posts.reduce((sum, p) => sum + (p.views || 0), 0);
  }, [posts]);

  const totalLikes = useMemo(() => {
    return posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  }, [posts]);

  const handleResetTelemetry = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all reader views and endorsements to 0? This will start fresh real-time tracking."
    );
    if (!confirmReset) return;
    const reset = resetTelemetryStats();
    if (reset && onSavePosts) {
      onSavePosts(reset);
      showToast("Reader telemetry reset to 0. Live tracking active.");
    }
  };

  // Filtered table articles
  const tableArticles = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      const matchesSearch =
        searchFilter.trim() === "" ||
        p.title.toLowerCase().includes(searchFilter.toLowerCase().trim()) ||
        p.author.name.toLowerCase().includes(searchFilter.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [posts, categoryFilter, searchFilter]);

  // Start creating a new article
  const handleStartCreateNew = () => {
    setEditingArticleId(null);
    if (onClearEdit) onClearEdit();
    setFormData({
      title: "",
      subtitle: "",
      category: "Tech Solutions",
      authorName: "Sandeep Kumar Pikili",
      authorRole: "Managing Director, VR PI Group",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
      readTime: "5 min read",
      coverImage: PRESET_IMAGES[0].url,
      coverImageHeight: "auto",
      coverImageFit: "cover",
      coverImageBg: "#0f172a",
      tags: "Enterprise, Technology, Strategy",
      keyTakeaway1: "",
      keyTakeaway2: "",
      keyTakeaway3: "",
      contentParagraphs: "",
      featured: false,
    });
    setContentBlocks([{ id: "txt_0", type: "text", value: "" }]);
    setActiveTab("editor");
    setEditorViewMode("write");
  };

  // Start editing an existing article
  const handleStartEdit = (article) => {
    if (!article) return;
    setEditingArticleId(article.id);

    // Extract text paragraphs from content array or raw markdown
    let rawParagraphs = "";
    if (article.contentParagraphs && typeof article.contentParagraphs === "string") {
      rawParagraphs = article.contentParagraphs;
    } else if (Array.isArray(article.content)) {
      rawParagraphs = article.content
        .map((item) => {
          if (item.type === "heading" || item.type === "h2") return `## ${item.text}`;
          if (item.type === "h1") return `# ${item.text}`;
          if (item.type === "h3") return `### ${item.text}`;
          if (item.type === "h4") return `#### ${item.text}`;
          if (item.type === "h5") return `##### ${item.text}`;
          if (item.type === "h6") return `###### ${item.text}`;
          if (item.type === "quote") return `> ${item.text}`;
          if (item.type === "image") return `![${item.alt || "Article Graphic"}](${item.url})`;
          if (item.type === "paragraph") return item.text;
          return item.text || "";
        })
        .join("\n\n");
    }

    const rawTags = Array.isArray(article.tags)
      ? article.tags.join(", ")
      : typeof article.tags === "string"
      ? article.tags
      : "";

    setFormData({
      title: article.title || "",
      subtitle: article.subtitle || "",
      category: article.category || "Tech Solutions",
      authorName: article.author?.name || "VR PI Author",
      authorRole: article.author?.role || "Editorial Contributor",
      authorAvatar:
        article.author?.avatar ||
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
      readTime: article.readTime || "5 min read",
      coverImage: article.coverImage || PRESET_IMAGES[0].url,
      coverImageHeight: article.coverImageHeight || "auto",
      coverImageFit: article.coverImageFit || "cover",
      coverImageBg: article.coverImageBg || "#0f172a",
      tags: rawTags,
      keyTakeaway1: article.keyTakeaways?.[0] || "",
      keyTakeaway2: article.keyTakeaways?.[1] || "",
      keyTakeaway3: article.keyTakeaways?.[2] || "",
      contentParagraphs: rawParagraphs || article.subtitle || "",
      featured: !!article.featured,
    });
    setContentBlocks(parseContentToBlocks(rawParagraphs || article.subtitle || ""));
    setActiveTab("editor");
    setEditorViewMode("write");
  };

  // Delete article handler with full Central Database Sync
  const handleDeleteArticle = async (articleId, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the article:\n"${title}"?`
    );
    if (!confirmed) return;

    await deleteBlogPostFromCloud(articleId);
    const updated = posts.filter((p) => p.id !== articleId);
    onSavePosts(updated);
    showToast("Article deleted from local and cloud database across all devices.");
  };

  // Central Cloud Database Sync State & Handlers
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudSyncError, setCloudSyncError] = useState(false);
  const importJsonRef = useRef(null);

  const handleSyncToCloud = async () => {
    setIsCloudSyncing(true);
    setCloudSyncError(false);
    try {
      const res = await syncAllLocalPostsToCloud(posts);
      if (res && res.success) {
        showToast(`✓ Cloud Synced! ${res.syncedCount || posts.length} articles synchronized with central database.`);
      } else {
        setCloudSyncError(true);
        showToast("⚠️ Cloud sync warning. Saved locally; will retry when connected.");
      }
    } catch (e) {
      setCloudSyncError(true);
      showToast("⚠️ Cloud sync failed. Check internet connection.");
    } finally {
      setIsCloudSyncing(false);
    }
  };

  const handlePullFromCloud = async () => {
    setIsCloudSyncing(true);
    setCloudSyncError(false);
    try {
      const res = await fetchBlogPostsFromCloud();
      if (res && res.articles && res.articles.length > 0) {
        onSavePosts(res.articles);
        showToast(`✓ Cloud pull complete! ${res.articles.length} articles updated from database.`);
      } else {
        showToast("No newer articles found in cloud database.");
      }
    } catch (e) {
      showToast("Failed to fetch from cloud database.");
    } finally {
      setIsCloudSyncing(false);
    }
  };

  const handleExportJson = () => {
    try {
      const jsonStr = JSON.stringify(posts, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vrpi_blog_articles_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("✓ Articles exported to JSON backup file!");
    } catch (e) {
      showToast("Export failed.");
    }
  };

  const handleImportJson = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported) && imported.length > 0 && imported[0].id) {
          onSavePosts(imported);
          await syncAllLocalPostsToCloud(imported);
          showToast(`✓ Imported ${imported.length} articles and synced to cloud!`);
        } else {
          alert("Invalid JSON format. Expected an array of blog articles.");
        }
      } catch (err) {
        alert("Failed to parse JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Save / Update form submit
  const handleSavePost = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.title || !formData.title.trim()) {
      alert("Please provide an article headline.");
      return;
    }

    const takeaways = [
      (formData.keyTakeaway1 || "").trim(),
      (formData.keyTakeaway2 || "").trim(),
      (formData.keyTakeaway3 || "").trim(),
    ].filter((t) => t.length > 0);

    const paragraphs = (formData.contentParagraphs || "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    let formattedContent = paragraphs.map((text) => ({
      type: "paragraph",
      text,
    }));

    if (formattedContent.length === 0) {
      formattedContent.push({
        type: "paragraph",
        text: formData.subtitle || formData.title,
      });
    }

    const tagsArray = (
      typeof formData.tags === "string"
        ? formData.tags.split(",")
        : Array.isArray(formData.tags)
        ? formData.tags
        : []
    )
      .map((t) => (typeof t === "string" ? t.trim() : String(t)))
      .filter((t) => t.length > 0);

    if (editingArticleId) {
      // Update existing article
      let updatedArticleObj = null;
      const updated = posts.map((p) => {
        if (p.id === editingArticleId) {
          updatedArticleObj = {
            ...p,
            title: (formData.title || "").trim(),
            subtitle: (formData.subtitle || "").trim(),
            category: formData.category || p.category || "Tech Solutions",
            readTime: (formData.readTime || "").trim() || "5 min read",
            coverImage: (formData.coverImage || "").trim() || PRESET_IMAGES[0].url,
            coverImageHeight: formData.coverImageHeight || "auto",
            coverImageFit: formData.coverImageFit || "cover",
            coverImageBg: formData.coverImageBg || "#0f172a",
            featured: !!formData.featured,
            tags: tagsArray,
            author: {
              ...p.author,
              name: (formData.authorName || "").trim() || p.author?.name || "VR PI Author",
              role: (formData.authorRole || "").trim() || p.author?.role || "Editorial Contributor",
              avatar: (formData.authorAvatar || "").trim() || p.author?.avatar || PRESET_IMAGES[0].url,
            },
            keyTakeaways: takeaways,
            contentParagraphs: formData.contentParagraphs || "",
            content: formattedContent,
          };
          return updatedArticleObj;
        }
        return p;
      });

      if (updatedArticleObj) {
        saveBlogPostToCloud(updatedArticleObj);
      }
      onSavePosts(updated);
      showToast("Article updated and synced to cloud database!");
      setActiveTab("articles");
      setEditingArticleId(null);
      if (onClearEdit) onClearEdit();
    } else {
      // Create new article
      const newArticle = {
        id: "vrpi-article-" + Date.now(),
        title: (formData.title || "").trim(),
        subtitle: (formData.subtitle || "").trim(),
        category: formData.category || "Tech Solutions",
        categoryColor: "#ff6501",
        featured: !!formData.featured,
        tags: tagsArray,
        author: {
          name: (formData.authorName || "").trim() || "VR PI Editorial",
          role: (formData.authorRole || "").trim() || "Managing Director, VR PI Group",
          avatar: (formData.authorAvatar || "").trim() || PRESET_IMAGES[0].url,
        },
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        readTime: (formData.readTime || "").trim() || "5 min read",
        coverImage: (formData.coverImage || "").trim() || PRESET_IMAGES[0].url,
        coverImageHeight: formData.coverImageHeight || "auto",
        coverImageFit: formData.coverImageFit || "cover",
        coverImageBg: formData.coverImageBg || "#0f172a",
        views: 1,
        likes: 0,
        keyTakeaways: takeaways,
        contentParagraphs: formData.contentParagraphs || "",
        content: formattedContent,
      };

      const updated = [newArticle, ...posts];
      saveBlogPostToCloud(newArticle);
      onSavePosts(updated);
      showToast("New article published and synced to cloud database!");
      setActiveTab("articles");
      if (onClearEdit) onClearEdit();
    }
  };

  return (
    <div className={style.portalWrapper}>
      {/* Premium Top Navigation Bar */}
      <header className={style.portalHeader}>
        <div className={style.brandGroup}>
          <h1 className={style.brandLogoTitle}>
            VR<span className={style.brandLogoAccent}>PI</span> Editorial Studio
          </h1>
          <span className={style.premiumTierBadge}>
            <FaCrown style={{ color: "#f59e0b" }} /> Executive Suite
          </span>
        </div>

        <div className={style.headerActions}>
          <button className={style.viewSiteBtn} onClick={onViewLiveSite}>
            <FaEye /> Live Blog
          </button>
          <button className={style.logoutBtn} onClick={onLogout}>
            <FaSignOutAlt /> Exit Portal
          </button>
        </div>
      </header>

      {/* Portal Tabs Bar */}
      <nav className={style.portalNav}>
        <button
          className={`${style.portalTab} ${
            activeTab === "articles" ? style.activePortalTab : ""
          }`}
          onClick={() => setActiveTab("articles")}
        >
          <FaBookOpen /> All Articles ({posts.length})
        </button>

        <button
          className={`${style.portalTab} ${
            activeTab === "editor" ? style.activePortalTab : ""
          }`}
          onClick={() => {
            if (!editingArticleId) handleStartCreateNew();
            else setActiveTab("editor");
          }}
        >
          <FaEdit /> {editingArticleId ? "Editing Article" : "Write New Story"}
        </button>

        <button
          className={`${style.portalTab} ${
            activeTab === "analytics" ? style.activePortalTab : ""
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          <FaChartLine /> Editorial Telemetry
        </button>

        <button
          className={`${style.portalTab} ${
            activeTab === "profile" ? style.activePortalTab : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <FaUserShield /> Executive Account
        </button>
      </nav>

      <main className={style.portalBody}>
        {/* Real-Time Telemetry Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#15803d", background: "#f0fdf4", padding: "0.35rem 0.85rem", borderRadius: "9999px", fontWeight: "600", border: "1px solid #bbf7d0" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 2px #86efac" }}></span>
            Real-Time Telemetry Active • Live Reader Interactions
          </div>
          <button
            type="button"
            onClick={handleResetTelemetry}
            style={{ fontSize: "0.75rem", color: "#64748b", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "0.35rem 0.75rem", cursor: "pointer", fontWeight: "600" }}
            title="Reset telemetry counters to 0"
          >
            Reset Telemetry to 0
          </button>
        </div>

        {/* Central Cloud Database Synchronization Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "#f8fafc",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.15)",
            border: "1px solid #334155",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(255, 101, 1, 0.18)",
                color: "#ff6501",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
              }}
            >
              <FaCloudUploadAlt />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontWeight: 700, fontSize: "0.96rem" }}>
                  Central Cloud Database (PostgreSQL)
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.15rem 0.55rem",
                    borderRadius: "9999px",
                    background: isCloudSyncing ? "#fef08a" : cloudSyncError ? "#fee2e2" : "#dcfce7",
                    color: isCloudSyncing ? "#854d0e" : cloudSyncError ? "#991b1b" : "#166534",
                    fontWeight: 700,
                  }}
                >
                  {isCloudSyncing ? "Syncing..." : cloudSyncError ? "Sync Alert" : "Online & Shared"}
                </span>
              </div>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
                Articles saved here automatically sync to all laptops and the live website in real-time.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleSyncToCloud}
              disabled={isCloudSyncing}
              style={{
                background: "#ff6501",
                color: "#fff",
                border: "none",
                padding: "0.45rem 0.9rem",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              title="Push all local articles on this laptop to the central cloud database"
            >
              <FaCloudUploadAlt /> Push All to Cloud
            </button>

            <button
              type="button"
              onClick={handlePullFromCloud}
              disabled={isCloudSyncing}
              style={{
                background: "#334155",
                color: "#e2e8f0",
                border: "1px solid #475569",
                padding: "0.45rem 0.85rem",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              title="Fetch latest articles from central cloud database"
            >
              <FaSyncAlt /> Pull Latest
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              style={{
                background: "#1e293b",
                color: "#cbd5e1",
                border: "1px solid #475569",
                padding: "0.45rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
              title="Download backup file of all articles (.json)"
            >
              📥 Export JSON
            </button>

            <label
              style={{
                background: "#1e293b",
                color: "#cbd5e1",
                border: "1px solid #475569",
                padding: "0.45rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 500,
                cursor: "pointer",
                margin: 0,
              }}
              title="Import articles from another laptop (.json)"
            >
              📤 Import JSON
              <input
                type="file"
                ref={importJsonRef}
                accept=".json"
                style={{ display: "none" }}
                onChange={handleImportJson}
              />
            </label>
          </div>
        </div>

        {/* Global Statistics Overview */}
        <div className={style.statsRow}>
          <div className={style.statCard}>
            <div
              className={style.statIconWrap}
              style={{ background: "#fff7ed", color: "#ff6501" }}
            >
              <FaBookOpen />
            </div>
            <div className={style.statInfo}>
              <span className={style.statValue}>{posts.length}</span>
              <span className={style.statLabel}>Published Stories</span>
            </div>
          </div>

          <div className={style.statCard}>
            <div
              className={style.statIconWrap}
              style={{ background: "#eff6ff", color: "#2563eb" }}
            >
              <FaRegEye />
            </div>
            <div className={style.statInfo}>
              <span className={style.statValue}>
                {totalViews.toLocaleString()}
              </span>
              <span className={style.statLabel}>Total Global Readers</span>
            </div>
          </div>

          <div className={style.statCard}>
            <div
              className={style.statIconWrap}
              style={{ background: "#fef2f2", color: "#ef4444" }}
            >
              <FaRegHeart />
            </div>
            <div className={style.statInfo}>
              <span className={style.statValue}>{totalLikes}</span>
              <span className={style.statLabel}>Reader Endorsements</span>
            </div>
          </div>

          <div className={style.statCard}>
            <div
              className={style.statIconWrap}
              style={{ background: "#fefce8", color: "#ca8a04" }}
            >
              <FaCrown />
            </div>
            <div className={style.statInfo}>
              <span className={style.statValue}>Enterprise</span>
              <span className={style.statLabel}>Publishing Clearance</span>
            </div>
          </div>
        </div>

        {/* TAB 1: ALL ARTICLES MANAGEMENT */}
        {activeTab === "articles" && (
          <div>
            <div className={style.sectionHeaderBar}>
              <h2 className={style.sectionHeading}>
                <FaBookOpen style={{ color: "#ff6501" }} /> Manage & Update Stories
              </h2>

              <button
                className={style.newArticleActionBtn}
                onClick={handleStartCreateNew}
              >
                <FaPlus /> Draft New Article
              </button>
            </div>

            {/* Table Filter Toolbar */}
            <div className={style.tableToolbar}>
              <div className={style.toolbarSearch}>
                <FaSearch className={style.toolbarSearchIcon} />
                <input
                  type="text"
                  placeholder="Search by title, keywords or author..."
                  className={style.toolbarSearchInput}
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>

              <div>
                <select
                  className={style.toolbarSelect}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Articles Table */}
            <div className={style.tableCard}>
              <table className={style.articlesTable}>
                <thead>
                  <tr>
                    <th>Article Details</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Performance</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "3rem" }}>
                        <p style={{ color: "#64748b", margin: 0 }}>
                          No articles match your criteria.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    tableArticles.map((article) => (
                      <tr key={article.id}>
                        <td>
                          <div className={style.tableArticleCell}>
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className={style.tableThumb}
                            />
                            <div>
                              <p className={style.tableArticleTitle}>
                                {article.title}
                              </p>
                              <span className="text-xs text-slate-400">
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className={style.tableArticleCategory}>
                            {article.category}
                          </span>
                        </td>

                        <td>
                          <span className="font-semibold text-slate-800 text-xs">
                            {article.author?.name}
                          </span>
                        </td>

                        <td>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <FaRegEye /> {article.views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaRegHeart /> {article.likes || 0}
                            </span>
                          </div>
                        </td>

                        <td>
                          {article.featured ? (
                            <span className={style.badgeFeatured}>
                              <FaStar /> Featured
                            </span>
                          ) : (
                            <span className={style.badgeStandard}>Published</span>
                          )}
                        </td>

                        <td>
                          <span className="text-xs text-slate-500">
                            {article.date}
                          </span>
                        </td>

                        <td>
                          <div
                            className={style.tableActions}
                            style={{ justifyContent: "flex-end" }}
                          >
                            <button
                              className={style.editActionBtn}
                              onClick={() => handleStartEdit(article)}
                              title="Edit and update article"
                            >
                              <FaEdit /> Edit
                            </button>

                            <button
                              className={style.editActionBtn}
                              style={{
                                background: "#f8fafc",
                                borderColor: "#e2e8f0",
                                color: "#475569",
                              }}
                              onClick={() => onPreviewArticle(article)}
                              title="Preview article"
                            >
                              <FaEye />
                            </button>

                            <button
                              className={style.deleteActionBtn}
                              onClick={() =>
                                handleDeleteArticle(article.id, article.title)
                              }
                              title="Delete this article"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: WRITE / UPDATE ARTICLE EDITOR */}
        {activeTab === "editor" && (
          <div className={style.editorCard}>
            {/* Editor Header Bar with Live Preview / Split Mode Switcher */}
            <div className={style.editorHeaderBar}>
              <div className={style.editorTitleGroup}>
                <h2 className={style.editorMainHeading}>
                  {editingArticleId ? "Update Existing Article" : "Compose New Article"}
                </h2>
                <p className={style.editorSubheading}>
                  {editingArticleId
                    ? "Modify title, industry vertical, key takeaways, and body copy."
                    : "Publish industry-leading thought leadership across VR PI Group channels."}
                </p>
              </div>

              {/* View Switcher: Editor / Live Preview */}
              <div className="flex items-center gap-3">
                <div className={style.viewModeButtonGroup}>
                  <button
                    type="button"
                    className={`${style.viewModeBtn} ${
                      editorViewMode === "write" ? style.viewModeBtnActive : ""
                    }`}
                    onClick={() => setEditorViewMode("write")}
                    title="Editor mode"
                  >
                    <FaPenNib /> Editor
                  </button>

                  <button
                    type="button"
                    className={`${style.viewModeBtn} ${
                      editorViewMode === "preview" ? style.viewModeBtnActive : ""
                    }`}
                    onClick={() => setEditorViewMode("preview")}
                    title="Full-page article live preview"
                  >
                    <FaDesktop /> Live Preview
                  </button>
                </div>

                {editingArticleId && (
                  <button
                    type="button"
                    className={style.cancelEditorBtn}
                    onClick={() => {
                      setEditingArticleId(null);
                      if (onClearEdit) onClearEdit();
                      handleStartCreateNew();
                      setActiveTab("articles");
                    }}
                  >
                    <FaTimes /> Cancel Editing
                  </button>
                )}
              </div>
            </div>

            {/* FULL PREVIEW ONLY MODE */}
            {editorViewMode === "preview" ? (
              <div style={{ width: "100%", margin: "0 auto" }}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                  <button
                    type="button"
                    className={style.cancelEditorBtn}
                    onClick={() => setEditorViewMode("write")}
                  >
                    <FaPenNib /> Back to Editor
                  </button>
                  <button
                    type="button"
                    className={style.savePostBtn}
                    onClick={handleSavePost}
                  >
                    <FaSave /> {editingArticleId ? "Save & Update Post" : "Publish Article Live"}
                  </button>
                </div>

                <div className={style.splitPreviewCol} style={{ position: "static", maxHeight: "none" }}>
                  <div className={style.previewSheetHeader}>
                    <div className={style.previewBadgePulse}>
                      <span className={style.previewPulseDot}></span>
                      <span>Live Article Preview</span>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">
                      {formData.readTime || "5 min read"}
                    </span>
                  </div>

                  <span className={style.previewMetaCategory}>
                    {formData.category || "Tech Solutions"}
                  </span>

                  <h1 className={style.previewTitle}>
                    {formData.title || "Your Article Headline Will Appear Here"}
                  </h1>

                  {formData.subtitle && (
                    <p className={style.previewSubtitle}>{formData.subtitle}</p>
                  )}

                  {/* Live Tags Preview */}
                  {formData.tags && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", margin: "0.75rem 0 1.25rem 0" }}>
                      {(typeof formData.tags === "string" ? formData.tags.split(",") : Array.isArray(formData.tags) ? formData.tags : [])
                        .map((t) => t.trim())
                        .filter(Boolean)
                        .map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: "#fff7ed",
                              color: "#ff6501",
                              border: "1px solid #ffedd5",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                  )}

                  <div className={style.previewAuthorRow}>
                    <img
                      src={
                        formData.authorAvatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          formData.authorName || "VR PI"
                        )}&background=ffedd5&color=ff6501&bold=true`
                      }
                      alt={formData.authorName || "Author"}
                      className={style.previewAuthorAvatar}
                    />
                    <div>
                      <h4 className={style.previewAuthorName}>
                        {formData.authorName || "Author Name"}
                      </h4>
                      <p className={style.previewAuthorRole}>
                        {formData.authorRole || "Editorial Contributor"}
                      </p>
                    </div>
                  </div>

                  {formData.coverImage && (
                    <div
                      className={style.previewCoverWrap}
                      style={{
                        backgroundColor: formData.coverImageFit === "contain" ? (formData.coverImageBg || "#0f172a") : "#f1f5f9",
                        maxHeight: formData.coverImageHeight === "auto" ? "none" : (formData.coverImageHeight || "420px"),
                      }}
                    >
                      <img
                        src={formData.coverImage}
                        alt="Cover"
                        className={style.previewCoverImg}
                        style={{
                          objectFit: formData.coverImageFit || "cover",
                          maxHeight: formData.coverImageHeight === "auto" ? "none" : (formData.coverImageHeight || "420px"),
                          height: formData.coverImageHeight === "auto" ? "auto" : undefined,
                          width: "100%",
                        }}
                      />
                    </div>
                  )}

                  {[formData.keyTakeaway1, formData.keyTakeaway2, formData.keyTakeaway3].filter(Boolean).length > 0 && (
                    <div className={style.previewTakeaways}>
                      <h4 className={style.previewTakeawaysTitle}>
                        <FaCheckCircle style={{ color: "#ff6501" }} /> Key Strategic Takeaways
                      </h4>
                      <ul className={style.previewTakeawaysList}>
                        {[formData.keyTakeaway1, formData.keyTakeaway2, formData.keyTakeaway3]
                          .filter(Boolean)
                          .map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  <RichArticleRenderer content={formData.contentParagraphs} />
                </div>
              </div>
            ) : (
              /* WRITE EDITOR MODE */
              <div className={style.editorFormWrapper}>
                <form onSubmit={handleSavePost} className={style.editorForm}>
                    {/* Core Information */}
                    <div className={style.inputGroup}>
                      <label className={style.inputLabel}>Article Headline *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Next-Generation Autonomous Systems in Urban Infrastructure"
                        className={style.inputField}
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, title: e.target.value }))
                        }
                      />
                    </div>

                    <div className={style.inputGroup}>
                      <label className={style.inputLabel}>Executive Summary / Hook</label>
                      <input
                        type="text"
                        placeholder="A concise 1-2 sentence synopsis explaining the core value..."
                        className={style.inputField}
                        value={formData.subtitle}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                        }
                      />
                    </div>

                    <div className={style.editorGrid3}>
                      <div className={style.inputGroup}>
                        <label className={style.inputLabel}>Industry Vertical</label>
                        <select
                          className={style.inputField}
                          value={formData.category}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, category: e.target.value }))
                          }
                        >
                          {BLOG_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={style.inputGroup}>
                        <label className={style.inputLabel}>Estimated Read Time</label>
                        <input
                          type="text"
                          placeholder="e.g. 5 min read"
                          className={style.inputField}
                          value={formData.readTime}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, readTime: e.target.value }))
                          }
                        />
                      </div>

                      <div className={style.inputGroup}>
                        <label className={style.inputLabel}>Tags (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="AI, SmartCities, GlobalTrade"
                          className={style.inputField}
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, tags: e.target.value }))
                          }
                        />
                      </div>
                    </div>

                    {/* Article Content with Visual Block & Media Editor */}
                    <div className={style.inputGroup}>
                      <div className="flex items-center justify-between mb-1">
                        <label className={style.inputLabel}>
                          Body Article Content * (WordPress Rich Formatting)
                        </label>
                        <div className="flex items-center gap-2">
                          <div className={style.visualModeTabs}>
                            <button
                              type="button"
                              className={`${style.visualModeTab} ${
                                contentEditorMode === "visual" ? style.visualModeTabActive : ""
                              }`}
                              onClick={handleSwitchToVisual}
                              title="Visual Block Editor: Uploaded photos appear as real images, not code"
                            >
                              <FaImage /> Visual Editor
                            </button>
                            <button
                              type="button"
                              className={`${style.visualModeTab} ${
                                contentEditorMode === "markdown" ? style.visualModeTabActive : ""
                              }`}
                              onClick={handleSwitchToMarkdown}
                              title="Markdown Code View"
                            >
                              <FaCode /> Markdown Code
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Hidden inline media input */}
                      <input
                        type="file"
                        ref={inlineImageInputRef}
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleInlineImageUpload}
                      />

                      {/* WordPress-style Editorial Toolbar */}
                      <div className={style.wpToolbarContainer}>
                        {/* Headings H1 to H6 */}
                        <div className={style.wpToolbarGroup}>
                          <button
                            type="button"
                            className={`${style.wpToolBtn} ${style.wpToolHeadingBtn}`}
                            onClick={() => insertHeading(1)}
                            title="Headline (H1)"
                          >
                            H1
                          </button>
                          <button
                            type="button"
                            className={`${style.wpToolBtn} ${style.wpToolHeadingBtn}`}
                            onClick={() => insertHeading(2)}
                            title="Major Section (H2)"
                          >
                            H2
                          </button>
                          <button
                            type="button"
                            className={`${style.wpToolBtn} ${style.wpToolHeadingBtn}`}
                            onClick={() => insertHeading(3)}
                            title="Subheading (H3)"
                          >
                            H3
                          </button>
                          <button
                            type="button"
                            className={`${style.wpToolBtn} ${style.wpToolHeadingBtn}`}
                            onClick={() => insertHeading(4)}
                            title="Subsection (H4)"
                          >
                            H4
                          </button>
                          <button
                            type="button"
                            className={`${style.wpToolBtn} ${style.wpToolHeadingBtn}`}
                            onClick={() => insertHeading(5)}
                            title="Minor Heading (H5)"
                          >
                            H5
                          </button>
                          <button
                            type="button"
                            className={`${style.wpToolBtn} ${style.wpToolHeadingBtn}`}
                            onClick={() => insertHeading(6)}
                            title="Sub-label (H6)"
                          >
                            H6
                          </button>
                        </div>

                        {/* Inline Text Formatting */}
                        <div className={style.wpToolbarGroup}>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertFormat("**", "**", "Bold text")}
                            title="Bold text"
                          >
                            <FaBold />
                          </button>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertFormat("*", "*", "Italic text")}
                            title="Italic text"
                          >
                            <FaItalic />
                          </button>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertFormat("<u>", "</u>", "Underlined text")}
                            title="Underline"
                          >
                            <FaUnderline />
                          </button>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertFormat("~~", "~~", "Strikethrough text")}
                            title="Strikethrough"
                          >
                            <FaStrikethrough />
                          </button>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertFormat("`", "`", "code")}
                            title="Inline Code"
                          >
                            <FaCode />
                          </button>
                        </div>

                        {/* Structure & Quotes */}
                        <div className={style.wpToolbarGroup}>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertBlock(">", "Notable executive perspective...")}
                            title="Blockquote / Pull Quote"
                          >
                            <FaQuoteLeft />
                          </button>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertBlock("-", "Bulleted point")}
                            title="Bullet List"
                          >
                            <FaListUl />
                          </button>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={() => insertBlock("1.", "Numbered step")}
                            title="Numbered List"
                          >
                            <FaListOl />
                          </button>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={insertDivider}
                            title="Horizontal Divider"
                          >
                            <FaMinus />
                          </button>
                        </div>

                        {/* Links & Media Upload */}
                        <div className={style.wpToolbarGroup}>
                          <button
                            type="button"
                            className={style.wpToolBtn}
                            onClick={insertLink}
                            title="Insert Link"
                          >
                            <FaLink />
                          </button>
                          <button
                            type="button"
                            className={`${style.wpToolBtn} ${style.wpToolBtnActive}`}
                            onClick={handleOpenMediaModal}
                            title="Upload & Insert Inline Media Graphic"
                            style={{ background: "#fff7ed", color: "#ff6501", borderColor: "#fed7aa" }}
                          >
                            <FaImage style={{ marginRight: "4px" }} /> Insert Media
                          </button>
                        </div>
                      </div>

                      {contentEditorMode === "visual" ? (
                        <div className={style.visualBlocksList}>
                          {contentBlocks.map((block, bIdx) => {
                            if (block.type === "image") {
                              return (
                                <div key={block.id || bIdx} className={style.visualImageCard}>
                                  <div className={style.visualImageHeader}>
                                    <span className={style.visualImageBadge}>
                                      <FaImage /> Inline Media Graphic
                                    </span>
                                    <div className={style.visualImageControls}>
                                      {/* Size Selectors */}
                                      <div className={style.visualControlGroup}>
                                        {["100%", "75%", "50%", "35%"].map((sz) => (
                                          <button
                                            key={sz}
                                            type="button"
                                            className={`${style.visualControlBtn} ${
                                              (block.width || "100%") === sz ? style.visualControlBtnActive : ""
                                            }`}
                                            onClick={() => handleUpdateImageBlock(bIdx, { width: sz })}
                                          >
                                            {sz === "100%" ? "Full" : sz === "75%" ? "Large" : sz === "50%" ? "Med" : "Compact"}
                                          </button>
                                        ))}
                                      </div>
                                      {/* Alignment Selectors */}
                                      <div className={style.visualControlGroup}>
                                        {["left", "center", "right"].map((al) => (
                                          <button
                                            key={al}
                                            type="button"
                                            className={`${style.visualControlBtn} ${
                                              (block.align || "center") === al ? style.visualControlBtnActive : ""
                                            }`}
                                            onClick={() => handleUpdateImageBlock(bIdx, { align: al })}
                                          >
                                            {al.charAt(0).toUpperCase() + al.slice(1)}
                                          </button>
                                        ))}
                                      </div>
                                      {/* Remove Button */}
                                      <button
                                        type="button"
                                        className={style.visualDeleteBtn}
                                        onClick={() => handleRemoveImageBlock(bIdx)}
                                        title="Remove this image graphic from story"
                                      >
                                        <FaTrashAlt /> Remove
                                      </button>
                                    </div>
                                  </div>

                                  {/* Real Image Rendered Visually */}
                                  <div
                                    className={style.visualImageDisplay}
                                    style={{
                                      justifyContent:
                                        block.align === "left"
                                          ? "flex-start"
                                          : block.align === "right"
                                          ? "flex-end"
                                          : "center",
                                    }}
                                  >
                                    <img
                                      src={block.url}
                                      alt={block.caption || "Article Graphic"}
                                      className={style.visualImageEl}
                                      style={{ width: block.width || "100%" }}
                                    />
                                  </div>

                                  {/* Caption input */}
                                  <div>
                                    <input
                                      type="text"
                                      value={block.caption || ""}
                                      placeholder="Add graphic caption / description..."
                                      className={style.visualImageCaptionInput}
                                      onChange={(e) => handleUpdateImageBlock(bIdx, { caption: e.target.value })}
                                    />
                                  </div>

                                  {/* Add paragraph or media below */}
                                  <div className={style.visualBlockDivider}>
                                    <button
                                      type="button"
                                      className={style.visualAddMediaBtn}
                                      onClick={() => handleAddParagraphBelow(bIdx)}
                                    >
                                      <FaPlus /> Add Paragraph Below
                                    </button>
                                    <button
                                      type="button"
                                      className={style.visualAddMediaBtn}
                                      onClick={() => {
                                        setActiveTextBlockIndex(bIdx);
                                        handleOpenMediaModal();
                                      }}
                                    >
                                      <FaImage /> Add Another Image
                                    </button>
                                  </div>
                                </div>
                              );
                            }

                            // Text Block
                            return (
                              <div key={block.id || bIdx} className={style.visualTextBlock}>
                                <textarea
                                  ref={(el) => {
                                    if (el) textBlockRefs.current[block.id || bIdx] = el;
                                  }}
                                  rows={Math.max(3, Math.min(10, ((block.value || "").split("\n").length + 1)))}
                                  placeholder="Draft narrative paragraph here. Use toolbar above for H1-H6, bold, quotes, or click Media to insert images..."
                                  className={style.visualTextTextarea}
                                  value={block.value || ""}
                                  onFocus={() => setActiveTextBlockIndex(bIdx)}
                                  onChange={(e) => handleUpdateTextBlock(bIdx, e.target.value)}
                                />
                                <div className={style.visualBlockDivider}>
                                  <button
                                    type="button"
                                    className={style.visualAddMediaBtn}
                                    onClick={() => {
                                      setActiveTextBlockIndex(bIdx);
                                      handleOpenMediaModal();
                                    }}
                                  >
                                    <FaImage /> Insert Image Here
                                  </button>
                                  <button
                                    type="button"
                                    className={style.visualAddMediaBtn}
                                    onClick={() => handleAddParagraphBelow(bIdx)}
                                  >
                                    <FaPlus /> Add Paragraph
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <textarea
                          ref={contentTextareaRef}
                          rows={14}
                          required
                          placeholder="Draft the article narrative here. Use the WordPress toolbar above to insert H1-H6 tags, bold copy, blockquotes, lists, and inline media..."
                          className={`${style.textareaField} ${style.wpTextareaAttached}`}
                          value={formData.contentParagraphs}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              contentParagraphs: e.target.value,
                            }));
                            setContentBlocks(parseContentToBlocks(e.target.value));
                          }}
                        />
                      )}
                    </div>

                    {/* Cover Imagery & Media Upload */}
                    <div className={style.inputGroup}>
                      <div className="flex items-center justify-between mb-1">
                        <label className={style.inputLabel}>Cover Imagery & Media *</label>
                        <span className="text-xs text-slate-500 font-medium">
                          {mediaMode === "upload" ? "Upload from device" : "Web link / preset"}
                        </span>
                      </div>

                      {/* Mode Selector Tabs */}
                      <div className={style.mediaModeTabs}>
                        <button
                          type="button"
                          className={`${style.mediaModeTab} ${
                            mediaMode === "upload" ? style.mediaModeTabActive : ""
                          }`}
                          onClick={() => setMediaMode("upload")}
                        >
                          <FaCloudUploadAlt /> Upload Media File
                        </button>

                        <button
                          type="button"
                          className={`${style.mediaModeTab} ${
                            mediaMode === "url" ? style.mediaModeTabActive : ""
                          }`}
                          onClick={() => setMediaMode("url")}
                        >
                          <FaLink /> Image URL & Presets
                        </button>
                      </div>

                      {/* Upload from Device Mode */}
                      {mediaMode === "upload" && (
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
                            style={{ display: "none" }}
                            onChange={handleFileInputChange}
                          />

                          <div
                            className={`${style.uploadDropzone} ${
                              isDragging ? style.uploadDropzoneActive : ""
                            }`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleFileDrop}
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          >
                            <div className={style.uploadIconCircle}>
                              <FaCloudUploadAlt />
                            </div>
                            <p className={style.uploadMainText}>
                              {isProcessingMedia ? (
                                <span>Optimizing & processing media...</span>
                              ) : (
                                <>
                                  <strong>Click to upload media</strong> or drag & drop file
                                </>
                              )}
                            </p>
                            <p className={style.uploadSubText}>
                              PNG, JPG, WEBP, GIF, or SVG (Up to 12MB • Auto-optimized)
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Direct URL & Presets Mode */}
                      {mediaMode === "url" && (
                        <div>
                          <input
                            type="text"
                            placeholder="Paste image URL (https://images.unsplash.com/...)"
                            className={style.inputField}
                            value={formData.coverImage}
                            onChange={(e) =>
                              setFormData({ ...formData, coverImage: e.target.value })
                            }
                          />
                          <div className={style.imagePresetsRow}>
                            <span className="text-xs text-slate-400 self-center mr-1">
                              Presets:
                            </span>
                            {PRESET_IMAGES.map((img) => (
                              <button
                                type="button"
                                key={img.label}
                                className={`${style.presetBtn} ${
                                  formData.coverImage === img.url ? style.activePresetBtn : ""
                                }`}
                                onClick={() =>
                                  setFormData({ ...formData, coverImage: img.url })
                                }
                              >
                                {img.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Live Media Preview Card with Custom Sizing */}
                      {formData.coverImage && (
                        <div>
                          <div
                            className={style.mediaPreviewCard}
                            style={{
                              backgroundColor: formData.coverImageFit === "contain" ? (formData.coverImageBg || "#0f172a") : "#ffffff",
                            }}
                          >
                            <img
                              src={formData.coverImage}
                              alt="Cover Preview"
                              className={style.mediaPreviewImage}
                              style={{
                                objectFit: formData.coverImageFit || "cover",
                                maxHeight: formData.coverImageHeight === "auto" ? "none" : (formData.coverImageHeight || "280px"),
                                height: formData.coverImageHeight === "auto" ? "auto" : (formData.coverImageHeight || "280px"),
                                width: "100%",
                              }}
                            />
                            <div className={style.mediaPreviewOverlay}>
                              <span className={style.mediaPreviewBadge}>
                                <FaCheckCircle /> Cover Ready for Live Publishing
                              </span>
                              <div className={style.mediaPreviewActions}>
                                <button
                                  type="button"
                                  className={style.mediaActionBtn}
                                  onClick={() => {
                                    if (mediaMode === "upload") {
                                      fileInputRef.current && fileInputRef.current.click();
                                    } else {
                                      setFormData((prev) => ({ ...prev, coverImage: "" }));
                                    }
                                  }}
                                >
                                  {mediaMode === "upload" ? "Replace Media" : "Clear URL"}
                                </button>
                                <button
                                  type="button"
                                  className={`${style.mediaActionBtn} ${style.mediaRemoveBtn}`}
                                  onClick={() => setFormData((prev) => ({ ...prev, coverImage: "" }))}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Custom Size & Framing Controls */}
                          <div className={style.coverCustomSizePanel}>
                            <div className={style.customSizePanelHeader}>
                              <span className={style.customSizeTitle}>
                                <FaCropAlt style={{ color: "#ff6501" }} /> Custom Image Sizing & Framing Controls
                              </span>
                              <span className="text-xs text-slate-500 font-medium">
                                Adjust height & framing so banner text is never cut off
                              </span>
                            </div>

                            {/* Fit & Framing Mode */}
                            <div className={style.sizeOptionRow}>
                              <span className={style.sizeOptionLabel}>Framing Fit:</span>
                              <div className={style.sizePillsGroup}>
                                <button
                                  type="button"
                                  className={`${style.sizePillBtn} ${
                                    formData.coverImageFit === "contain" ? style.sizePillBtnActive : ""
                                  }`}
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      coverImageFit: "contain",
                                      coverImageHeight: "auto",
                                    }))
                                  }
                                  title="Show 100% full image without any crop (best for banners with text)"
                                >
                                  ✓ Natural Fit (No Crop / Full Image)
                                </button>
                                <button
                                  type="button"
                                  className={`${style.sizePillBtn} ${
                                    formData.coverImageFit === "cover" ? style.sizePillBtnActive : ""
                                  }`}
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      coverImageFit: "cover",
                                    }))
                                  }
                                  title="Fill frame edge-to-edge (photography)"
                                >
                                  Cover (Fill Edge-to-Edge)
                                </button>
                              </div>
                            </div>

                            {/* Display Height Presets */}
                            <div className={style.sizeOptionRow}>
                              <span className={style.sizeOptionLabel}>Image Height:</span>
                              <div className={style.sizePillsGroup}>
                                {[
                                  { label: "Original (Auto)", val: "auto" },
                                  { label: "Compact (260px)", val: "260px" },
                                  { label: "Medium (360px)", val: "360px" },
                                  { label: "Cinematic (460px)", val: "460px" },
                                  { label: "Expanded (580px)", val: "580px" },
                                ].map((h) => (
                                  <button
                                    type="button"
                                    key={h.val}
                                    className={`${style.sizePillBtn} ${
                                      formData.coverImageHeight === h.val ? style.sizePillBtnActive : ""
                                    }`}
                                    onClick={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        coverImageHeight: h.val,
                                      }))
                                    }
                                  >
                                    {h.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Height Slider */}
                            <div className={style.sizeSliderRow}>
                              <span className={style.sizeOptionLabel}>Custom Slider:</span>
                              <input
                                type="range"
                                min={180}
                                max={750}
                                step={10}
                                value={
                                  formData.coverImageHeight === "auto"
                                    ? 360
                                    : parseInt(formData.coverImageHeight, 10) || 360
                                }
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    coverImageHeight: `${e.target.value}px`,
                                  }))
                                }
                                className={style.sizeRangeInput}
                              />
                              <span className={style.sizeValueBadge}>
                                {formData.coverImageHeight === "auto"
                                  ? "Original (Auto)"
                                  : formData.coverImageHeight || "360px"}
                              </span>
                            </div>

                            {/* Letterbox Background (if contain mode) */}
                            {formData.coverImageFit === "contain" && (
                              <div className={style.sizeOptionRow}>
                                <span className={style.sizeOptionLabel}>Canvas BG:</span>
                                <div className={style.sizePillsGroup}>
                                  {[
                                    { label: "Dark Canvas (#0f172a)", val: "#0f172a" },
                                    { label: "Slate Canvas (#1e293b)", val: "#1e293b" },
                                    { label: "Light Canvas (#f8fafc)", val: "#f8fafc" },
                                    { label: "Pure White (#ffffff)", val: "#ffffff" },
                                  ].map((bg) => (
                                    <button
                                      type="button"
                                      key={bg.val}
                                      className={`${style.sizePillBtn} ${
                                        (formData.coverImageBg || "#0f172a") === bg.val ? style.sizePillBtnActive : ""
                                      }`}
                                      onClick={() =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          coverImageBg: bg.val,
                                        }))
                                      }
                                    >
                                      {bg.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Author Profile, Avatar Controls & Credentials */}
                    <div className={style.authorSectionCard}>
                      <div className={style.authorCardHeader}>
                        <span>Author Identity & Profile Controls</span>
                        <span className="text-xs text-slate-400 font-normal">
                          Upload, update, or remove author picture
                        </span>
                      </div>

                      {/* Hidden avatar input */}
                      <input
                        type="file"
                        ref={authorAvatarInputRef}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        style={{ display: "none" }}
                        onChange={handleAvatarUpload}
                      />

                      <div className={style.authorLayout}>
                        {/* Circular Avatar with Hover & Action Buttons */}
                        <div className={style.avatarControlWrap}>
                          <div
                            className={style.avatarCircleWrap}
                            onClick={() =>
                              authorAvatarInputRef.current &&
                              authorAvatarInputRef.current.click()
                            }
                            title="Click to upload/change author photo"
                          >
                            <img
                              src={
                                formData.authorAvatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  formData.authorName || "VR PI"
                                )}&background=ffedd5&color=ff6501&bold=true`
                              }
                              alt={formData.authorName}
                              className={style.avatarImg}
                            />
                            <div className={style.avatarHoverOverlay}>
                              <FaCamera style={{ fontSize: "1.1rem" }} />
                              <span>Update</span>
                            </div>
                          </div>

                          <div className={style.avatarButtonsRow}>
                            <button
                              type="button"
                              className={style.avatarUploadBtn}
                              onClick={() =>
                                authorAvatarInputRef.current &&
                                authorAvatarInputRef.current.click()
                              }
                              title="Upload author photo from device"
                            >
                              <FaCamera /> Upload
                            </button>
                            <button
                              type="button"
                              className={style.avatarDeleteBtn}
                              onClick={handleRemoveAvatar}
                              title="Delete/reset author photo"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>

                        {/* Name, Role & Presets Grid */}
                        <div className={style.authorFieldsGrid}>
                          <div className={style.inputGroup}>
                            <label className={style.inputLabel}>Author Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Dr. Arvind / Sandeep Kumar Pikili"
                              className={style.inputField}
                              value={formData.authorName}
                              onChange={(e) =>
                                setFormData({ ...formData, authorName: e.target.value })
                              }
                            />
                          </div>

                          <div className={style.inputGroup}>
                            <label className={style.inputLabel}>
                              Author Designation & Division
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Chief Technology Officer, VR PI Tech Solutions"
                              className={style.inputField}
                              value={formData.authorRole}
                              onChange={(e) =>
                                setFormData({ ...formData, authorRole: e.target.value })
                              }
                            />
                          </div>

                          {/* Presets Row */}
                          <div style={{ gridColumn: "1 / -1" }}>
                            <span className="text-xs text-slate-500 font-medium mr-2">
                              Quick Avatar Presets:
                            </span>
                            <div className={style.avatarPresetList}>
                              {PRESET_AVATARS.map((av) => (
                                <button
                                  type="button"
                                  key={av.label}
                                  className={style.avatarPresetPill}
                                  onClick={() => handleSelectAvatarPreset(av.url)}
                                >
                                  {av.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Strategic Takeaways */}
                    <div>
                      <p className={style.formSectionTitle}>Key Strategic Takeaways</p>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Takeaway 1: e.g. Domain-specific models achieve 40% compute reduction"
                          className={style.inputField}
                          value={formData.keyTakeaway1}
                          onChange={(e) =>
                            setFormData({ ...formData, keyTakeaway1: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Takeaway 2: e.g. Zero-trust token rotation stops perimeter leakage"
                          className={style.inputField}
                          value={formData.keyTakeaway2}
                          onChange={(e) =>
                            setFormData({ ...formData, keyTakeaway2: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Takeaway 3: e.g. Multi-modal logistics eliminate freight chokepoint delays"
                          className={style.inputField}
                          value={formData.keyTakeaway3}
                          onChange={(e) =>
                            setFormData({ ...formData, keyTakeaway3: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Featured toggle */}
                    <label className={style.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData({ ...formData, featured: e.target.checked })
                        }
                        style={{ width: "18px", height: "18px", accentColor: "#ff6501" }}
                      />
                      <span>Set as Featured Story on the Blog homepage</span>
                    </label>

                    {/* Actions */}
                    <div className={style.editorActionsRow}>
                      <button
                        type="button"
                        className={style.cancelEditorBtn}
                        onClick={() => setActiveTab("articles")}
                      >
                        Cancel
                      </button>

                      <button type="submit" className={style.savePostBtn}>
                        <FaSave /> {editingArticleId ? "Save & Update Post" : "Publish Article Live"}
                      </button>
                    </div>
                  </form>
                </div>
            )}
          </div>
        )}

        {/* TAB 3: EDITORIAL TELEMETRY & ANALYTICS */}
        {activeTab === "analytics" && (
          <div className={style.editorCard}>
            <h2 className={style.editorMainHeading} style={{ marginBottom: "0.5rem" }}>
              Editorial Reach & Engagement Telemetry
            </h2>
            <p className={style.editorSubheading} style={{ marginBottom: "2rem" }}>
              Real-time reader consumption statistics across VR PI global divisions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
                  Top Performing Stories
                </h4>
                <ul className="flex flex-col gap-3">
                  {[...posts]
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, 4)
                    .map((item, idx) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between text-sm bg-white p-3 rounded-lg border border-slate-200"
                      >
                        <span className="font-semibold text-slate-800 line-clamp-1 flex-1 mr-3">
                          0{idx + 1}. {item.title}
                        </span>
                        <span className="text-orange-600 font-bold text-xs whitespace-nowrap">
                          {item.views} readers
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
                  Audience Sentiment Breakdown
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Total Article Views
                    </span>
                    <span className="font-bold text-slate-900">
                      {totalViews.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Reader Likes Received
                    </span>
                    <span className="font-bold text-red-500">
                      {totalLikes.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Active Divisions Covered
                    </span>
                    <span className="font-bold text-slate-900">
                      {new Set(posts.map((p) => p.category)).size} Verticals
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Live Telemetry Management
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Views and endorsements increment organically in real time whenever readers engage with published articles.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetTelemetry}
                className="px-4 py-2 text-xs font-semibold text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors shadow-sm"
              >
                Clear & Reset All Telemetry
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: EXECUTIVE AUTHOR PROFILE & PREMIUM TIER */}
        {activeTab === "profile" && (
          <div className={style.profileCard}>
            <div className={style.profileTop}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                alt="Sandeep Kumar Pikili"
                className={style.profileLargeAvatar}
              />
              <div className={style.profileDetails}>
                <h2>
                  Sandeep Kumar Pikili{" "}
                  <FaCheckCircle
                    style={{ color: "#ff6501", fontSize: "1.1rem", display: "inline" }}
                  />
                </h2>
                <p>Managing Director & Chief Executive Editor, VR PI Group</p>
                <span className={style.premiumTierBadge}>
                  <FaCrown style={{ color: "#f59e0b" }} /> VR PI Enterprise Elite Tier
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-3">
              Editorial Account Privileges & Clearances
            </h3>
            <div className={style.privilegesList}>
              <div className={style.privilegeItem}>
                <FaShieldAlt style={{ color: "#ff6501" }} />
                <span>Unrestricted Live Publishing Clearance</span>
              </div>
              <div className={style.privilegeItem}>
                <FaEdit style={{ color: "#ff6501" }} />
                <span>Full Article Updating & Revision History</span>
              </div>
              <div className={style.privilegeItem}>
                <FaTrashAlt style={{ color: "#ff6501" }} />
                <span>Instant Deletion & Content Moderation</span>
              </div>
              <div className={style.privilegeItem}>
                <FaStar style={{ color: "#ff6501" }} />
                <span>Featured Hero Placement Overrides</span>
              </div>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Live Telemetry Management
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Views and endorsements increment organically in real time whenever readers engage with published articles.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetTelemetry}
                className="px-4 py-2 text-xs font-semibold text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors shadow-sm"
              >
                Clear & Reset All Telemetry
              </button>
            </div>
          </div>
        )}
      </main>

      {/* WordPress-Style Media Insert Modal */}
      {showMediaModal && (
        <div className={style.mediaModalOverlay} onClick={() => setShowMediaModal(false)}>
          <div className={style.mediaModalCard} onClick={(e) => e.stopPropagation()}>
            <div className={style.mediaModalHeader}>
              <h3 className={style.mediaModalTitle}>
                <FaImage style={{ color: "#ff6501" }} /> Insert Media Graphic into Story
              </h3>
              <button
                type="button"
                className={style.mediaModalClose}
                onClick={() => setShowMediaModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Media Source Tabs */}
            <div className={style.mediaModalTabs}>
              <button
                type="button"
                className={`${style.mediaModalTab} ${
                  mediaModalTab === "upload" ? style.mediaModalTabActive : ""
                }`}
                onClick={() => setMediaModalTab("upload")}
              >
                <FaCloudUploadAlt /> Upload File from Device
              </button>
              <button
                type="button"
                className={`${style.mediaModalTab} ${
                  mediaModalTab === "url" ? style.mediaModalTabActive : ""
                }`}
                onClick={() => setMediaModalTab("url")}
              >
                <FaLink /> Image Web Link / URL
              </button>
            </div>

            <div className={style.mediaModalBody}>
              {/* Tab 1: Upload from Device */}
              {mediaModalTab === "upload" && (
                <div>
                  <input
                    type="file"
                    ref={inlineModalFileInputRef}
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (f) handleInlineModalFileUpload(f);
                      e.target.value = "";
                    }}
                  />

                  <div
                    className={style.modalUploadDropzone}
                    onClick={() =>
                      inlineModalFileInputRef.current &&
                      inlineModalFileInputRef.current.click()
                    }
                  >
                    <div className={style.modalUploadIcon}>
                      <FaCloudUploadAlt />
                    </div>
                    {isProcessingInlineMedia ? (
                      <p className="text-sm font-semibold text-orange-600 my-1">
                        Optimizing & preparing image...
                      </p>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-slate-800 my-1">
                          Click to browse image or drag file here
                        </p>
                        <p className="text-xs text-slate-400">
                          Supports PNG, JPG, WEBP, GIF, SVG (Auto-compressed)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Paste Image URL */}
              {mediaModalTab === "url" && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700">Image Web URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    className={style.inputField}
                    value={mediaModalUrl}
                    onChange={(e) => setMediaModalUrl(e.target.value)}
                  />
                </div>
              )}

              {/* Active Image Thumbnail Preview */}
              {mediaModalUrl && (
                <div className={style.modalPreviewWrap}>
                  <img
                    src={mediaModalUrl}
                    alt="Preview"
                    className={style.modalPreviewImg}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-semibold text-green-400 flex items-center gap-1">
                      <FaCheckCircle /> Image Loaded Ready
                    </span>
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                      onClick={() => setMediaModalUrl("")}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Caption / Figure Description (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Figure 1.2: Autonomous Network Topology"
                  className={style.inputField}
                  value={mediaModalCaption}
                  onChange={(e) => setMediaModalCaption(e.target.value)}
                />
              </div>

              {/* Custom Size Controls */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Display Size Width
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "100% (Full Width)", val: "100%" },
                    { label: "75% (Large)", val: "75%" },
                    { label: "50% (Medium)", val: "50%" },
                    { label: "35% (Compact)", val: "35%" },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.val}
                      className={`${style.sizePillBtn} ${
                        mediaModalWidth === s.val ? style.sizePillBtnActive : ""
                      }`}
                      onClick={() => setMediaModalWidth(s.val)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alignment Controls */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Alignment
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "Center", val: "center" },
                    { label: "Left", val: "left" },
                    { label: "Right", val: "right" },
                  ].map((a) => (
                    <button
                      type="button"
                      key={a.val}
                      className={`${style.sizePillBtn} ${
                        mediaModalAlign === a.val ? style.sizePillBtnActive : ""
                      }`}
                      onClick={() => setMediaModalAlign(a.val)}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className={style.mediaModalFooter}>
              <button
                type="button"
                className={style.cancelEditorBtn}
                onClick={() => setShowMediaModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={style.savePostBtn}
                onClick={handleInsertInlineMedia}
                disabled={!mediaModalUrl}
              >
                <FaImage /> Insert Media into Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
