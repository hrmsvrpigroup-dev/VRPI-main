// Example validation functions
const nameValidation = (value) => {
  // Add your validation logic for name here
  return value.trim() !== "" && /^[a-zA-Z]+$/.test(value); // Example: Not empty and contains only alphabets
};

export const fullNameValidation = (value) => {
  return value.trim() !== "" && /^[a-zA-Z\s]+$/.test(value); // Not empty and contains only alphabets and spaces
};

export const descriptionValidation = (value) => {
  return value.trim().length >= 5 && value.trim().length <= 200;
};

const mobileNumberValidation = (value) => {
  // Add your validation logic for mobile number here
  return value.trim() !== "" && /^\d{10}$/.test(value); // Example: Not empty and exactly 10 digits
};

const emailValidation = (value) => {
  // Add your validation logic for email here
  return value.trim() !== "" && /^\S+@\S+\.\S+$/.test(value); // Example: Not empty and follows email format
};

const aadhaarValidation = (value) => {
  // Add your validation logic for Aadhaar number here
  return value.trim() !== "" && /^\d{12}$/.test(value); // Example: Not empty and exactly 12 digits
};

const passwordValidation = (value) => {
  // Add your validation logic for password here

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(value)) {
    return false;
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return false;
  }

  // Check if the password contains at least one digit
  if (!/\d/.test(value)) {
    return false;
  }

  // Check if the password length is at least 8 characters
  if (value.length < 8) {
    return false;
  }

  // If all conditions pass, return true indicating that the password is valid
  return true;
};

const confirmPasswordValidation = (value, passwordValue) => {
  // Add your validation logic for confirm password here
  return value === passwordValue; // Example: Confirm password must match the original password
};

const addressValidation = (value) => {
  // Add your validation logic for address here
  return value.trim() !== ""; // Example: Address must not be empty
};

const DOBValidation = (value) => {
  return value.toString().trim() !== "";
};

export const yearValidation = (value) => {
  const currentYear = new Date().getFullYear();
  const regex = /^(17\d{2}|18\d{2}|19\d{2}|20\d{2}|21\d{2})$/;
  return (
    regex.test(value) &&
    parseInt(value) >= 1700 &&
    parseInt(value) <= currentYear
  );
};

export const endYearValidation = (value, startYear) => {
  const currentYear = new Date().getFullYear();
  const regex = /^(17\d{2}|18\d{2}|19\d{2}|20\d{2}|21\d{2})$/;
  const isValidYear =
    regex.test(value) &&
    parseInt(value) >= 1700 &&
    parseInt(value) <= currentYear;

  if (!isValidYear) return false;

  const difference = parseInt(value) - parseInt(startYear);
  return difference <= 10 && difference >= 0;
};

export const percentageValidation = (value) => {
  const regex = /^\d+(\.\d+)?$/;
  return regex.test(value);
};

export const annualIncomeValidator = (value) => {
  if (!value || value.trim() === "") {
    return false;
  }

  if (isNaN(Number(value))) {
    return false;
  }

  return true;
};

// export const fileValidations = (file)=>{
//   {validateValue:(file) => profilePicInput.setValue(file)}
// }

export {
  nameValidation,
  mobileNumberValidation,
  emailValidation,
  aadhaarValidation,
  passwordValidation,
  confirmPasswordValidation,
  addressValidation,
  DOBValidation,
};
