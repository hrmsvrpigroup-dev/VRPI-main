import React, { useState } from "react";
import styles from "./ProfileDetailsSection.module.css"; // Import CSS module
import StudentDetails from "./StudentDetails/StudentDetails";
import MandatoryCertificates from "./MandatoryCertificates/MandatoryCertificates";

const ProfileDetailsSection = ({ user }) => {
  const [selectedOption, setSelectedOption] = useState("details");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      {user && (
        <div>
          <div className={styles.optionBar}>
            <button
              onClick={() => handleOptionChange("details")}
              className={selectedOption === "details" ? styles.active : ""}
            >
              My Details
            </button>
            <button
              onClick={() => handleOptionChange("documents")}
              className={selectedOption === "documents" ? styles.active : ""}
            >
              My Documents
            </button>
          </div>
          <div className={styles.content}>
            {selectedOption === "details" && (
              <StudentDetails
                user={user.user}
                educationalDetails={user.educationalDetails}
              />
            )}
            {selectedOption === "documents" && (
              <MandatoryCertificates user={user} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetailsSection;
