import React from "react";
import useInput from "../../../../hooks/use-Input";
import CustomInput from "../../../../UI/Input/Input";
import style from "./ContactUs.module.css";
import Button from "../../../../UI/Button/Button";

const validateName = (input) => {
  return input.length >= 3;
};
// Validate mobile number: Exactly 10 digits and starts with a valid country code
const validateMobile = (input) => {
  // Check if input is not empty and contains only digits
  if (!input || !/^\d+$/.test(input)) {
    return false;
  }

  // Check if input length is between 10 and 15 characters
  if (input.length < 10 || input.length > 15) {
    return false;
  }

  // Additional validation logic can be added here,
  // such as checking specific patterns or prefixes for mobile numbers

  // Return true if all validation passes
  return true;
};

const validateDescription = (input) => {
  return input.length >= 10;
};
const validateEmail = (input) => {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the regular expression
  if (!emailRegex.test(input)) {
    return false; // Email format is incorrect
  }

  // Check if the email length is at least 8 characters
  if (input.length < 8) {
    return false; // Email is too short
  }

  // Check if the email contains only one "@" symbol
  if ((input.match(/@/g) || []).length !== 1) {
    return false; // Email contains multiple "@" symbols
  }

  // Additional validations can be added here, such as checking the domain part and TLD

  return true; // Email is valid
};

const ContactUsForm = () => {
  const nameInput = useInput({
    initialValue: "",
    validateValue: validateName,
  });
  const emailInput = useInput({
    initialValue: "",
    validateValue: validateEmail,
  });
  const mobileInput = useInput({
    initialValue: "",
    validateValue: validateMobile,
  });
  const descriptionInput = useInput({
    initialValue: "",
    validateValue: validateDescription,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nameInput.isValid && mobileInput.isValid && descriptionInput.isValid) {
      // console.log("Form submitted successfully");
      // console.log(
      //   "Info->",
      //   nameInput.value,
      //   mobileInput.value,
      //   descriptionInput.value
      // );
      nameInput.reset();
      mobileInput.reset();
      descriptionInput.reset();
    } else {
      // console.log("Please fill out all fields correctly");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.Form}>
      {/* <div className={style.form_input}> */}
      {/* <label htmlFor="name">Name</label> */}
      {/* {console.log(nameInput.hasError)} */}
      <CustomInput
        id="name"
        placeholder="Name"
        value={nameInput.value}
        onChange={nameInput.valueChangeHandler}
        // isInvalid={nameInput.hasError}
        onBlur={nameInput.validateValueHandler}
        onFocus={nameInput.focusHandler}
        className={
          nameInput.hasError ? ` ${style.invalid} ` : `${style.InputFields}`
        }
        style={{ borderBottom: nameInput.hasError && `4px solid red` }}
      />
      <CustomInput
        id="Email"
        placeholder="Email-ID"
        value={emailInput.value}
        onChange={emailInput.valueChangeHandler}
        // isInvalid={nameInput.hasError}
        onBlur={emailInput.validateValueHandler}
        onFocus={emailInput.focusHandler}
        className={
          emailInput.hasError ? ` ${style.invalid} ` : `${style.InputFields}`
        }
      />
      {/* </div> */}
      {/* <div className={style.form_input}> */}
      {/* <label htmlFor="mobile">Mobile</label> */}
      <CustomInput
        id="mobile"
        placeholder="Mobile number"
        value={mobileInput.value}
        onChange={mobileInput.valueChangeHandler}
        isInvalid={!mobileInput.isValid}
        onBlur={mobileInput.validateValueHandler}
        onFocus={mobileInput.focusHandler}
        className={
          mobileInput.hasError ? ` ${style.invalid} ` : `${style.InputFields}`
        }
      />
      {/* </div> */}
      {/* <div className={style.form_input}> */}
      {/* <label htmlFor="description">Description</label> */}
      <CustomInput
        id="description"
        placeholder="Description"
        value={descriptionInput.value}
        onChange={descriptionInput.valueChangeHandler}
        isInvalid={!descriptionInput.isValid}
        onBlur={descriptionInput.validateValueHandler}
        onFocus={descriptionInput.focusHandler}
        className={
          descriptionInput.hasError
            ? ` ${style.invalid} `
            : `${style.InputFields}`
        }
      />
      {/* </div> */}
      <Button type="submit" className={style.submitBtn}>
        Contact Us
      </Button>
    </form>
  );
};

export default ContactUsForm;
