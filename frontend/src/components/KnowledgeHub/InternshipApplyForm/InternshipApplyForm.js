import React, { useEffect, useState } from "react";
import style from "./InternshipApplyForm.module.css";
import BackgroundOverlay from "../../../UI/Backlay/Backlay";
import InputWithInvalidText from "../../../UI/Input/InputWithInvalidText";
import Button from "../../../UI/Button/Button";
import Message from "../../../UI/Popup/Message";
import useInput from "../../../hooks/use-Input";
import {
  fullNameValidation,
  emailValidation,
  mobileNumberValidation,
} from "../../InputValidations/InputValidations";

const yearRegexValidation = (value) => {
  const year = parseInt(value, 10);
  const currentYear = new Date().getFullYear();
  return !isNaN(year) && year >= 1990 && year <= currentYear + 10 && /^\d{4}$/.test(value.trim());
};

const textNonEmptyValidation = (value) => {
  return value.trim().length >= 2;
};

const resumeValidation = (value) => {
  const val = value.trim();
  return val.length >= 5 && (val.startsWith("http://") || val.startsWith("https://") || val.includes("."));
};

const InternshipApplyForm = ({ internship, onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nameInput = useInput({
    initialValue: "",
    validateValue: fullNameValidation,
  });

  const emailInput = useInput({
    initialValue: "",
    validateValue: emailValidation,
  });

  const mobileInput = useInput({
    initialValue: "",
    validateValue: mobileNumberValidation,
  });

  const qualificationInput = useInput({
    initialValue: "",
    validateValue: textNonEmptyValidation,
  });

  const graduationInput = useInput({
    initialValue: "",
    validateValue: yearRegexValidation,
  });

  const resumeInput = useInput({
    initialValue: "",
    validateValue: resumeValidation,
  });

  const [message, setMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      nameInput.isValid &&
        emailInput.isValid &&
        mobileInput.isValid &&
        qualificationInput.isValid &&
        graduationInput.isValid &&
        resumeInput.isValid
    );
  }, [
    nameInput.isValid,
    emailInput.isValid,
    mobileInput.isValid,
    qualificationInput.isValid,
    graduationInput.isValid,
    resumeInput.isValid,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      setErrorMessage("Please fill out all fields correctly.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: mobileInput.value,
      internshipRole: internship.name,
      qualification: qualificationInput.value,
      graduationYear: graduationInput.value,
      resumeLink: resumeInput.value,
      message: message,
    };

    // Google Apps Script URL
    const backendUrl =
      process.env.REACT_APP_INTERNSHIP_BACKEND_URL ||
      "https://script.google.com/macros/s/AKfycbyOynQATS0DYYpmFfrWhcphMR84FM4Nl9rS-ubT8k-0OX5ia734axcBOjrBkGznYGF7cA/exec";

    const isGoogleScript = backendUrl.includes("script.google.com");

    fetch(backendUrl, {
      method: "POST",
      mode: isGoogleScript ? "no-cors" : "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        // If not google script, we can check for ok status
        if (!isGoogleScript && !response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || errData.error || "Server returned error status");
        }
        setIsLoading(false);
        setSuccessMessage("Your application has been submitted successfully!");
        
        // Reset form inputs
        nameInput.reset();
        emailInput.reset();
        mobileInput.reset();
        qualificationInput.reset();
        graduationInput.reset();
        resumeInput.reset();
        setMessage("");

        // Auto close after 2.5 seconds
        setTimeout(() => {
          onClose();
        }, 2500);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message || "Failed to submit application. Please try again later.");
        console.error("Submission error:", error);
      });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <BackgroundOverlay onClose={onClose}>
      <div className={style.modalContainer}>
        <div className={style.closeBtn} onClick={onClose}>
          &#10005;
        </div>
        <div className={style.modalHeader}>
          <h2>Apply for Internship</h2>
          <p className={style.roleBadge}>{internship.name}</p>
        </div>
        <form onSubmit={handleSubmit} className={style.form}>
          <InputWithInvalidText
            ErrorMessage={"Invalid Name (only letters and spaces)"}
            className={style.inputField}
            inputFields={{
              placeholder: "Full Name",
              value: nameInput.value,
              isInvalid: nameInput.hasError,
              onBlurHandler: nameInput.validateValueHandler,
              onFocusHandler: nameInput.focusHandler,
              onChange: nameInput.valueChangeHandler,
              type: "text",
              isTouched: nameInput.isFocused,
            }}
            mandatory="true"
          />

          <InputWithInvalidText
            ErrorMessage={"Invalid Email address"}
            className={style.inputField}
            inputFields={{
              placeholder: "Email Address",
              value: emailInput.value,
              isInvalid: emailInput.hasError,
              onBlurHandler: emailInput.validateValueHandler,
              onFocusHandler: emailInput.focusHandler,
              onChange: emailInput.valueChangeHandler,
              type: "email",
              isTouched: emailInput.isFocused,
            }}
            mandatory="true"
          />

          <InputWithInvalidText
            ErrorMessage={"Invalid Mobile number (10 digits)"}
            className={style.inputField}
            inputFields={{
              placeholder: "Mobile Number",
              value: mobileInput.value,
              isInvalid: mobileInput.hasError,
              onBlurHandler: mobileInput.validateValueHandler,
              onFocusHandler: mobileInput.focusHandler,
              onChange: mobileInput.valueChangeHandler,
              type: "text",
              isTouched: mobileInput.isFocused,
            }}
            mandatory="true"
          />

          <InputWithInvalidText
            ErrorMessage={"Invalid Qualification (min 2 chars)"}
            className={style.inputField}
            inputFields={{
              placeholder: "Educational Qualification (e.g. B.Tech)",
              value: qualificationInput.value,
              isInvalid: qualificationInput.hasError,
              onBlurHandler: qualificationInput.validateValueHandler,
              onFocusHandler: qualificationInput.focusHandler,
              onChange: qualificationInput.valueChangeHandler,
              type: "text",
              isTouched: qualificationInput.isFocused,
            }}
            mandatory="true"
          />

          <InputWithInvalidText
            ErrorMessage={"Invalid Graduation Year (4-digit year)"}
            className={style.inputField}
            inputFields={{
              placeholder: "Year of Graduation (e.g. 2026)",
              value: graduationInput.value,
              isInvalid: graduationInput.hasError,
              onBlurHandler: graduationInput.validateValueHandler,
              onFocusHandler: graduationInput.focusHandler,
              onChange: graduationInput.valueChangeHandler,
              type: "text",
              isTouched: graduationInput.isFocused,
            }}
            mandatory="true"
          />

          <InputWithInvalidText
            ErrorMessage={"Invalid Resume URL (must be valid link)"}
            className={style.inputField}
            inputFields={{
              placeholder: "Resume Link (Google Drive / GitHub / LinkedIn)",
              value: resumeInput.value,
              isInvalid: resumeInput.hasError,
              onBlurHandler: resumeInput.validateValueHandler,
              onFocusHandler: resumeInput.focusHandler,
              onChange: resumeInput.valueChangeHandler,
              type: "text",
              isTouched: resumeInput.isFocused,
            }}
            mandatory="true"
          />

          <div className={style.textareaContainer}>
            <textarea
              id="message"
              placeholder="Tell us about yourself / Cover message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={style.textarea}
            />
          </div>

          <Button
            type="submit"
            className={style.submitBtn}
            style={{ backgroundColor: !formIsValid ? "#ccc" : "var(--primary)", cursor: !formIsValid ? "not-allowed" : "pointer" }}
            disabled={!formIsValid || isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>

          {errorMessage && (
            <Message
              message={errorMessage}
              type="error"
              onClose={() => setErrorMessage("")}
            />
          )}

          {successMessage && (
            <Message
              message={successMessage}
              type="success"
              onClose={() => setSuccessMessage("")}
            />
          )}
        </form>
      </div>
    </BackgroundOverlay>
  );
};

export default InternshipApplyForm;
