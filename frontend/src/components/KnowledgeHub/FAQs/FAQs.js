// FAQsComponent.jsx
import React, { useState } from "react";
import styles from "./FAQs.module.css"; // Import your CSS module file
import Section from "../../../UI/Sections/Section";

const FAQsComponent = ({ FAQs }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <Section title="FAQ's">
      <div className={styles.faqsContainer}>
        {FAQs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.question}
              onClick={() => handleQuestionClick(index)}
            >
              {faq.question}
              <img
                className={styles.arrow}
                src={require("../../../assets/ArrowForward.png")}
                alt=""
                style={{ display: selectedQuestion === index && "none" }}
              ></img>
            </div>
            {selectedQuestion === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FAQsComponent;
