import React, { useEffect } from "react";
import styles from "./TermsAndConditions.module.css";
import Logo from "../../../components/Logo/Logo";

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Terms and Conditions";
  }, []);

  return (
    <div className={styles.termsAndConditions}>
      <h1>Terms & Conditions:</h1>
      <div className={styles.content}>
        <p>
          <strong>1. User Accounts:</strong> Users are responsible for maintaining the confidentiality of their passwords. Sharing account credentials may result in suspension.
        </p>
        <p>
          <strong>2. Intellectual Property:</strong> All course content, videos, and materials remain the exclusive property of your platform. Unauthorized distribution is strictly prohibited.
        </p>
        <p>
          <strong>3. User Conduct:</strong> Prohibits spam, abusive behavior, and reverse-engineering the platform.
        </p>
        <p>
          <strong>4. Limitation of Liability:</strong> Disclaims responsibility for technical downtime, third-party links, or outcomes related to the learner's career or exam success.
        </p>
        <p>
          <strong>5. Policy Edits:</strong> The Company reserves the right to modify the T&C at any time, with continued use of the platform indicating acceptance.
        </p>
      </div>
      
      <h1>Refund Policy:</h1>
      <div className={styles.content}>
        <p>
          <strong>1. Refund Window:</strong> Refund requests made beyond 3 to 14 days from the date of purchase should be denied.
        </p>
        <p>
          <strong>2. Consumption Limits:</strong> If the user has watched more than 25% of the videos or downloaded course PDFs refund will be denied.
        </p>
        <p>
          <strong>3. Conditional Refunds:</strong> "No refunds on discounted batches" or "No refunds if EMI / education loans were used".
        </p>
        <p>
          <strong>4. Processing Time:</strong> The approved refunds will be processed via the original payment method within 7-10 working days, often after deducting, processing tax fees.
        </p>
      </div>
      
      <h1>Privacy Policy:</h1>
      <div className={styles.content}>
        <p>
          <strong>1. Data Collected:</strong> Full name, email address, phone number, payment transaction history, and learning progress metrics (quiz scores, attendance) will not be shared with any other third party without intimation.
        </p>
        <p>
          <strong>2. Purpose:</strong> Data is used to provide course access, personalize learning, and send important service updates.
        </p>
        <p>
          <strong>3. Data Sharing:</strong> Data is only shared with third-party service providers (e.g., payment gateways like Razorpay/Stripe, hosting servers etc) to facilitate operations, and never sold to third parties.
        </p>
        <p>
          <strong>4. Data Retention:</strong> Active accounts are retained during the subscription; canceled account data may be deleted after 90 days.
        </p>
        <p>
          <strong>5. User Rights:</strong> We inform users that they can access, correct, or delete their own personal information.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
