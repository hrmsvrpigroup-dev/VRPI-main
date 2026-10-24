import React, { useEffect } from "react";
import styles from "./PrivacyPolicy.module.css";
import Logo from "../../../components/Logo/Logo";

const PrivacyPolicy = () => {
  const policyContent = {
    privacyPolicy: {
      logo: <Logo className={styles.logo} />,
      description: [
        'VR PI GROUP OF COMPANIES ("us", "we", or "our") operates the www.vrpigroup.com website and VR PI TECH SOLUTIONS LLP software (the "Service").',
        "This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.",
        "We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.",
      ],
      title: "Privacy Policy",
      note: "Privacy Policies will update on a regular basis of requirements",
      content: [
        {
          title: "Information Collection and Use",
          paragraphs: [
            "We collect several different types of information for various purposes to provide and improve our Service to you.",
          ],
        },
        {
          title: "Types of Data Collected",
          description:
            'Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:',
          paragraphs: [
            "Email address",
            "First name and last name",
            "Phone number",
            "Address, State, Province, ZIP/Postal code, City",
            "Cookies and Usage Data",
          ],
        },
        {
          title: "Introduction:",
          paragraphs: [
            "At VR PI TECH SOLUTIONS LLP, we are committed to protecting the privacy of our users.",
            "This Privacy Policy outlines how we collect, use, share, and protect your information when you use our software products and services.",
          ],
        },
        {
          title: "Information We Collect:",
          paragraphs: [
            "We may collect various types of information, including personal information and usage data.",
            "Personal information may include your name, email address, and other identifiable details.",
            "Usage data encompasses information about your interactions with our software.",
            "We collect this information both directly from users and automatically through our software.",
          ],
        },
        {
          title: "How We Use Information:",
          paragraphs: [
            "We collect information for purposes such as improving our software, personalizing user experiences, and providing customer support.",
            "For instance, we may analyze usage data to enhance the functionality of our products or tailor recommendations to individual users.",
          ],
        },
        {
          title: "Information Sharing:",
          paragraphs: [
            "We may share information with third parties under certain circumstances, such as to provide services or conduct business operations.",
            "These third parties may include service providers and business partners.",
            "We take measures to ensure that user information is protected when shared, including through contractual agreements and data security protocols.",
          ],
        },
        {
          title: "User Control and Choices:",
          paragraphs: [
            "Users have options to control the collection and use of their information, including opt-out mechanisms and preferences for cookies.",
            "Additionally, users can access, update, or delete their information by following instructions provided within our software or by contacting our support team.",
          ],
        },
        {
          title: "Security Measures:",
          paragraphs: [
            "We employ robust security measures to protect user information from unauthorized access, use, or disclosure.",
            "These measures include encryption, access controls, and regular security audits to identify and address potential vulnerabilities.",
          ],
        },
        {
          title: "Children's Privacy:",
          paragraphs: [
            "We comply with relevant children's privacy laws and implement age restrictions for using our software.",
            "Our products and services are intended for use by individuals who are at least (18+).",
          ],
        },
        {
          title: "Changes to This Policy:",
          paragraphs: [
            "This Privacy Policy may be updated periodically to reflect changes in our practices or legal requirements.",
            "Users will be notified of any significant changes through our software or other appropriate means.",
          ],
        },
        {
          title: "Contact Us:",
          paragraphs: [
            "If you have any questions or concerns regarding our Privacy Policy, please feel free to contact us at support@vrpigroup.com",
          ],
        },
        {
          title: "Effective Date:",
          paragraphs: [
            "This Privacy Policy is effective as of 1st March, 2024",
          ],
        },
      ],
    },
  };

  useEffect(() => {
    document.title = "Privacy Policy";
  }, []);

  return (
    <div className={styles.privacyPolicy}>
      {policyContent.privacyPolicy.logo}
      <h1>{policyContent.privacyPolicy.title}</h1>
      {policyContent.privacyPolicy.description.map((paragraph, index) => (
        <p key={index} style={{ display: "inline" }}>
          {paragraph}
        </p>
      ))}
      <div className={styles.content}>
        {policyContent.privacyPolicy.content.map((section, index) => (
          <div key={index}>
            <h2>{section.title}</h2>
            <h3>{section?.description}</h3>
            <ul>
              {section.paragraphs.map((paragraph, idx) => (
                <li key={idx}>{paragraph}</li>
              ))}
            </ul>
          </div>
        ))}
        <h3 className={styles.note}>
          Note: {policyContent.privacyPolicy.note}
        </h3>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
