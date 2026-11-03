import React from "react";
import style from "./RichArticleRenderer.module.css";

/**
 * Format inline markdown tokens:
 * - **bold** or <b>bold</b> or <strong>bold</strong>
 * - *italic* or <i>italic</i> or <em>italic</em>
 * - <u>underline</u>
 * - ~~strikethrough~~ or <s>strikethrough</s> or <del>strikethrough</del>
 * - `code`
 * - [label](url)
 */
export function renderInlineTokens(text) {
  if (!text || typeof text !== "string") return text;

  // Normalize loose trailing asterisks before newlines or spaces: e.g. "*word *" -> "*word*"
  let normalized = text
    .replace(/\*([^*\n]+?)\s+\*/g, "*$1*")
    .replace(/\*\*([^*\n]+?)\s+\*\*/g, "**$1**");

  const regex = /(\*\*[^*]+\*\*|<b>[\s\S]*?<\/b>|<strong>[\s\S]*?<\/strong>|(?<!\*)\*[^*]+\*(?!\*)|<i>[\s\S]*?<\/i>|<em>[\s\S]*?<\/em>|<u>[\s\S]*?<\/u>|~~[^~]+~~|<s>[\s\S]*?<\/s>|<del>[\s\S]*?<\/del>|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = normalized.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold: **text** or <b>text</b> or <strong>text</strong>
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: "#0f172a" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("<b>") && part.endsWith("</b>")) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: "#0f172a" }}>
          {part.slice(3, -4)}
        </strong>
      );
    }
    if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: "#0f172a" }}>
          {part.slice(8, -9)}
        </strong>
      );
    }

    // Italic: *text* or <i>text</i> or <em>text</em>
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={index} style={{ fontStyle: "italic", color: "#334155" }}>
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("<i>") && part.endsWith("</i>")) {
      return (
        <em key={index} style={{ fontStyle: "italic", color: "#334155" }}>
          {part.slice(3, -4)}
        </em>
      );
    }
    if (part.startsWith("<em>") && part.endsWith("</em>")) {
      return (
        <em key={index} style={{ fontStyle: "italic", color: "#334155" }}>
          {part.slice(4, -5)}
        </em>
      );
    }

    // Underline: <u>text</u>
    if (part.startsWith("<u>") && part.endsWith("</u>")) {
      return (
        <u key={index} style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>
          {part.slice(3, -4)}
        </u>
      );
    }

    // Strikethrough: ~~text~~ or <s>text</s> or <del>text</del>
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return (
        <del key={index} style={{ textDecoration: "line-through", color: "#94a3b8" }}>
          {part.slice(2, -2)}
        </del>
      );
    }
    if (part.startsWith("<s>") && part.endsWith("</s>")) {
      return (
        <del key={index} style={{ textDecoration: "line-through", color: "#94a3b8" }}>
          {part.slice(3, -4)}
        </del>
      );
    }
    if (part.startsWith("<del>") && part.endsWith("</del>")) {
      return (
        <del key={index} style={{ textDecoration: "line-through", color: "#94a3b8" }}>
          {part.slice(5, -6)}
        </del>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          style={{
            background: "#f1f5f9",
            color: "#ea580c",
            padding: "0.15rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.85em",
            fontFamily: "monospace",
            border: "1px solid #e2e8f0",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#ff6501",
            textDecoration: "underline",
            fontWeight: 600,
          }}
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

/**
 * Parse raw markdown text into typed blocks:
 * - H1 to H6 (# to ######)
 * - Quotes (> ...)
 * - Bullet lists (- or *)
 * - Numbered lists (1. ...)
 * - Code blocks (``` ... ```)
 * - Dividers (---)
 * - Images (![alt](url))
 * - Paragraphs (intelligently joining lines and healing split formatting tags)
 */
export function parseRawMarkdownToBlocks(rawText) {
  if (!rawText || typeof rawText !== "string") return [];

  // Normalize multi-line image tags like ![alt]\n(url) so they are on a single line and url has no linebreaks
  const normalized = rawText
    .replace(/\r\n/g, "\n")
    .replace(/!\[([^\]]*?)\]\s*\(([\s\S]*?)\)/g, (match, alt, url) => {
      const cleanAlt = alt.replace(/\n+/g, " ").trim();
      const cleanUrl = url.replace(/\s+/g, "").trim();
      return `\n\n![${cleanAlt}](${cleanUrl})\n\n`;
    });

  const lines = normalized.split("\n");
  const blocks = [];
  let currentParagraph = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }
  let currentCode = null; // { language: '', lines: [] }

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      let text = currentParagraph.join(" ").trim();
      // If text ends with a stray closing marker like "*text *" -> "*text*"
      text = text.replace(/\s+\*$/, "*").replace(/\s+\*\*$/, "**");
      if (text) {
        blocks.push({ type: "paragraph", text });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Inside code block
    if (currentCode) {
      if (trimmed.startsWith("```")) {
        blocks.push({
          type: "code",
          language: currentCode.language,
          code: currentCode.lines.join("\n"),
        });
        currentCode = null;
      } else {
        currentCode.lines.push(line);
      }
      continue;
    }

    // Start code block
    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      currentCode = {
        language: trimmed.slice(3).trim(),
        lines: [],
      };
      continue;
    }

    // Empty lines -> paragraph breaks
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    // Horizontal Divider
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushParagraph();
      flushList();
      blocks.push({ type: "divider" });
      continue;
    }

    // Headings H1 to H6
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      blocks.push({ type: `h${level}`, text: headingMatch[2].trim() });
      continue;
    }

    // Quotes
    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: trimmed.replace(/^>\s*/, "").trim() });
      continue;
    }

    // Images
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushParagraph();
      flushList();
      blocks.push({ type: "image", alt: imgMatch[1], url: imgMatch[2] });
      continue;
    }

    // Bullet List (- or * followed by a space)
    if (/^[-*]\s+/.test(trimmed) && !/^\*[^\s*]/.test(trimmed)) {
      flushParagraph();
      const item = trimmed.replace(/^[-*]\s+/, "");
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(item);
      continue;
    }

    // Numbered List
    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      const item = trimmed.replace(/^\d+\.\s+/, "");
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(item);
      continue;
    }

    // Non-list line
    flushList();

    // If this line is just a stray '*' or '**' closing tag, attach it directly to the previous paragraph line!
    if (trimmed === "*" || trimmed === "**") {
      if (currentParagraph.length > 0) {
        currentParagraph[currentParagraph.length - 1] = `${currentParagraph[currentParagraph.length - 1]}${trimmed}`;
        continue;
      }
    }

    // Accumulate into current paragraph
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  if (currentCode) {
    blocks.push({
      type: "code",
      language: currentCode.language,
      code: currentCode.lines.join("\n"),
    });
  }

  return blocks;
}

// Helper to extract custom sizing and alignment metadata from image captions
const parseImageMeta = (rawAlt) => {
  let alt = rawAlt || "";
  let width = "100%";
  let align = "center";
  if (alt && alt.includes("|")) {
    const parts = alt.split("|");
    alt = parts[0].trim();
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
  return { alt, width, align };
};

export default function RichArticleRenderer({ content, className = "" }) {
  let blocks = [];

  if (typeof content === "string") {
    blocks = parseRawMarkdownToBlocks(content);
  } else if (Array.isArray(content)) {
    // If it's a legacy array of { type, text }
    blocks = content;
  }

  if (!blocks || blocks.length === 0) {
    return <p className="text-slate-400 italic">No article content to display.</p>;
  }

  return (
    <div className={`${style.articleRenderer} ${className}`}>
      {blocks.map((block, idx) => {
        // H1
        if (block.type === "h1") {
          return (
            <h1 key={idx} className={style.renderedH1}>
              {renderInlineTokens(block.text)}
            </h1>
          );
        }

        // H2 (or legacy heading)
        if (block.type === "h2" || block.type === "heading") {
          return (
            <h2 key={idx} className={style.renderedH2}>
              {renderInlineTokens(block.text)}
            </h2>
          );
        }

        // H3
        if (block.type === "h3") {
          return (
            <h3 key={idx} className={style.renderedH3}>
              {renderInlineTokens(block.text)}
            </h3>
          );
        }

        // H4
        if (block.type === "h4") {
          return (
            <h4 key={idx} className={style.renderedH4}>
              {renderInlineTokens(block.text)}
            </h4>
          );
        }

        // H5
        if (block.type === "h5") {
          return (
            <h5 key={idx} className={style.renderedH5}>
              {renderInlineTokens(block.text)}
            </h5>
          );
        }

        // H6
        if (block.type === "h6") {
          return (
            <h6 key={idx} className={style.renderedH6}>
              {renderInlineTokens(block.text)}
            </h6>
          );
        }

        // Pull quote / blockquote
        if (block.type === "quote") {
          return (
            <blockquote key={idx} className={style.renderedQuote}>
              "{renderInlineTokens(block.text)}"
              {block.author && (
                <span className={style.quoteAuthor}>— {block.author}</span>
              )}
            </blockquote>
          );
        }

        // Bullet list
        if (block.type === "ul") {
          return (
            <ul key={idx} className={style.renderedUl}>
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInlineTokens(item)}</li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (block.type === "ol") {
          return (
            <ol key={idx} className={style.renderedOl}>
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInlineTokens(item)}</li>
              ))}
            </ol>
          );
        }

        // Code block
        if (block.type === "code") {
          return (
            <pre key={idx} className={style.renderedCodeBlock}>
              <code>{block.code}</code>
            </pre>
          );
        }

        // Divider
        if (block.type === "divider") {
          return <hr key={idx} className={style.renderedDivider} />;
        }

        // Inline Image with Custom Sizing & Alignment
        if (block.type === "image") {
          const meta = parseImageMeta(block.alt);
          return (
            <figure
              key={idx}
              className={style.renderedImageFigure}
              style={{
                width: meta.width,
                maxWidth: "100%",
                margin:
                  meta.align === "left"
                    ? "1.75rem auto 1.75rem 0"
                    : meta.align === "right"
                    ? "1.75rem 0 1.75rem auto"
                    : "1.75rem auto",
                textAlign: meta.align,
              }}
            >
              <img
                src={block.url}
                alt={meta.alt || "Article graphic"}
                className={style.renderedImage}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  display: "block",
                }}
                loading="lazy"
              />
              {meta.alt && (
                <figcaption className={style.renderedCaption}>
                  {meta.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        // Default Paragraph
        return (
          <p key={idx} className={style.renderedParagraph}>
            {renderInlineTokens(block.text)}
          </p>
        );
      })}
    </div>
  );
}
