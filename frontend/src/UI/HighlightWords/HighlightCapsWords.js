import React from "react";

const HighlightCapsWords = ({ sentence, style, className }) => {
  // Function to check if a word is in all caps
  const isAllCaps = (word) => {
    return word === word.toUpperCase();
  };

  // Function to render sentence with highlighted words
  const renderHighlightedSentence = () => {
    const words = sentence.split(" ");
    return words.map((word, index) => {
      if (isAllCaps(word)) {
        return (
          <span key={index} style={style}>
            {word}{" "}
          </span>
        );
      }
      return (
        <span key={index}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  return <span className={className}>{renderHighlightedSentence()}</span>;
};

export default HighlightCapsWords;
