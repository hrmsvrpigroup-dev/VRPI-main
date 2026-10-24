import useInput from "../../../../hooks/use-Input";
import {
  nameValidation,
  mobileNumberValidation,
  emailValidation,
  aadhaarValidation,
  passwordValidation,
  confirmPasswordValidation,
  addressValidation,
  DOBValidation,
  fullNameValidation,
} from "../../../InputValidations/InputValidations";
import style from "./PersonalDataForm.module.css";
import Dropdown from "../../../../UI/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import InputWithInvalidText from "../../../../UI/Input/InputWithInvalidText";

import CustomDatePicker from "../../../../UI/DatePIcker/DatePIcker";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/UserSlice";
import useHttpsAxios from "../../../../hooks/use-httpsAxios";
import { url } from "../../../../constants";
import useFormatDate from "../../../../hooks/use-formatDate";

import { setMessage } from "../../../../store/MessageDisplay/MessageActions";
import LoadingButton from "../../../../UI/LoadingButton/LoadingButton";

const Genders = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "others", label: "Others" },
];

const Occupations = [
  { value: "student", label: "Student" },
  { value: "working professional", label: "Working Professional" },
  { value: "entrepreneur", label: "Entrepreneur" },
];

const PersonalDataForm = ({ role }) => {
  const firstNameInput = useInput({ validateValue: nameValidation });
  const lastNameInput = useInput({ validateValue: nameValidation });

  const fatherNameInput = useInput({ validateValue: fullNameValidation });
  const mobileNumberInput = useInput({ validateValue: mobileNumberValidation });
  // const DOBInput = useInput({ validateValue: nameValidation });

  const [DOB, setDOB] = useState("");

  const permanentInput = useInput({ validateValue: addressValidation });

  const emailInput = useInput({ validateValue: emailValidation });
  const passwordInput = useInput({ validateValue: passwordValidation });
  const confirmPasswordInput = useInput({
    validateValue: (value) =>
      confirmPasswordValidation(value, passwordInput.value),
  });
  const aadhaarInput = useInput({ validateValue: aadhaarValidation });

  const [gender, setGender] = useState();
  const [occupation, setOccupation] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const dispatch = useDispatch();
  const formattedDOB = useFormatDate(DOB);

  useEffect(() => {
    let isFormValid = false;
    if (role === "student") {
      isFormValid =
        firstNameInput.isValid &&
        lastNameInput.isValid &&
        fatherNameInput.isValid &&
        mobileNumberInput.isValid &&
        DOBValidation(DOB) &&
        permanentInput.isValid &&
        emailInput.isValid &&
        passwordInput.isValid &&
        confirmPasswordInput.isValid &&
        aadhaarInput.isValid &&
        gender &&
        occupation;
    } else if (role === "client") {
      isFormValid =
        firstNameInput.isValid &&
        lastNameInput.isValid &&
        mobileNumberInput.isValid &&
        emailInput.isValid &&
        passwordInput.isValid &&
        confirmPasswordInput.isValid &&
        gender;
    }

    setFormIsValid(isFormValid);
  }, [
    formattedDOB,
    occupation,
    gender,
    role,
    formIsValid,
    firstNameInput.isValid,
    lastNameInput.isValid,
    fatherNameInput.isValid,
    mobileNumberInput.isValid,
    permanentInput.isValid,
    emailInput.isValid,
    passwordInput.isValid,
    confirmPasswordInput.isValid,
    aadhaarInput.isValid,
    DOB,
  ]);

  const { sendRequest, isLoading, error, statusCode, responseData } =
    useHttpsAxios();

  useEffect(() => {
    if (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.errorMessage ||
        error?.message ||
        "An error occurred";
      dispatch(setMessage(errMsg, "error"));
      return;
    }

    if (responseData) {
      if (statusCode === 200 || statusCode === 201) {
        // console.log("Created user successfully");
        dispatch(setUser({ role: role, step: 2, email: emailInput.value }));
      } else {
        const errMsg =
          responseData?.response?.data?.message ||
          responseData?.response?.data?.errorMessage ||
          responseData?.message ||
          "An error occurred during registration";
        dispatch(setMessage(errMsg, "error"));
      }
    }
  }, [error, responseData, statusCode, dispatch, role]);

  const handleSubmit = async () => {
    let formData;
    if (formIsValid) {
      if (role === "student") {
        formData = {
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          fathersName: fatherNameInput.value,
          gender: gender.value,
          phoneNumber: mobileNumberInput.value,
          dateOfBirth: formattedDOB,
          address: permanentInput.value,
          email: emailInput.value.toLowerCase(),

          createPassword: confirmPasswordInput.value,
          occupation: occupation.value,
          aadharCardNumber: aadhaarInput?.value,
          // aadharFront: null,
          // aadharBack: null,
          // profilePhoto: null,
          roles: role,
        };
      } else if (role === "client") {
        formData = {
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          phoneNumber: mobileNumberInput.value,
          gender: gender,
          email: emailInput.value.toLowerCase(),

          createPassword: confirmPasswordInput.value,
          roles: role,
        };
      }
      // console.log(formData);

      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
    } else {
      dispatch(setMessage("invalid fields", "error"));
    }
  };

  // const handleSubmit = async () => {
  //   if (formIsValid) {
  //     const formData = new FormData();

  //     // Append common form fields to formData
  //     formData.append("firstName", firstNameInput.value);
  //     formData.append("lastName", lastNameInput.value);
  //     formData.append("phoneNumber", mobileNumberInput.value);
  //     formData.append("email", emailInput.value);
  //     formData.append("createPassword", confirmPasswordInput.value);

  //     // Append role-specific form fields to formData based on the role
  //     if (role === "student") {
  //       formData.append("fathersName", fatherNameInput.value);
  //       formData.append("gender", gender.value);
  //       formData.append("dateOfBirth", formattedDOB);
  //       formData.append("address", permanentInput.value);
  //       formData.append("occupation", occupation?.value);
  //       formData.append("aadharCardNumber", aadhaarInput?.value);

  //       // Append files to formData for student role
  //       if (aadhaarCardFrontFile) {
  //         formData.append("aadharFront", aadhaarCardFrontFile);
  //       }
  //       if (aadhaarCardBackFile) {
  //         formData.append("aadharBack", aadhaarCardBackFile);
  //       }
  //       if (profilePhotoFile) {
  //         formData.append("profilePic", profilePhotoFile);
  //       }
  //     } else if (role === "client") {
  //       formData.append("gender", gender?.value);
  //     }

  //     console.log(formData.firstName);

  //     sendRequest({
  //       url: `${url.backendBaseUrl}/vrpi-user/create`,
  //       method: "POST",
  //       body: formData,
  //     });
  //   } else {
  //     dispatch(setMessage("invalid fields", "error"));
  //   }
  // };

  const Line1 = (
    <div className={style.line1}>
      <InputWithInvalidText
        ErrorMessage={"Invalid First Name"}
        className={style.Input}
        inputFields={{
          placeholder: "First Name",
          value: firstNameInput.value,
          isInvalid: firstNameInput.hasError,
          onBlurHandler: firstNameInput.validateValueHandler,
          onFocusHandler: firstNameInput.focusHandler,
          onChange: firstNameInput.valueChangeHandler,
          type: "text",
          isTouched: firstNameInput.isFocused,
        }}
        mandatory="true"
      />
      <InputWithInvalidText
        ErrorMessage={"Invalid Last Name"}
        className={style.Input}
        inputFields={{
          placeholder: "Last Name",
          value: lastNameInput.value,
          isInvalid: lastNameInput.hasError,
          onBlurHandler: lastNameInput.validateValueHandler,
          onFocusHandler: lastNameInput.focusHandler,
          onChange: lastNameInput.valueChangeHandler,
          type: "text",
          isTouched: lastNameInput.isFocused,
        }}
        mandatory="true"
      />
    </div>
  );

  const Line2 = (
    <div className={style.line2}>
      {/* {role === "student" && ( */}
      <InputWithInvalidText
        ErrorMessage={"Invalid Father's Name"}
        className={style.Input}
        inputFields={{
          placeholder: "Father's Name",
          value: fatherNameInput.value,
          isInvalid: fatherNameInput.hasError,
          onBlurHandler: fatherNameInput.validateValueHandler,
          onFocusHandler: fatherNameInput.focusHandler,
          onChange: fatherNameInput.valueChangeHandler,
          type: "text",
          isTouched: fatherNameInput.isFocused,
        }}
        mandatory="true"
      />
      {/* )} */}
      <Dropdown
        options={Genders}
        onSelect={(gender) => setGender(gender)}
        placeholder="Gender"
        style={{ marginBottom: "21.6px", width: "100%" }}
        mandatory
      />
      <InputWithInvalidText
        ErrorMessage={"Invalid Mobile Number"}
        className={`${style.Input} `}
        inputFields={{
          placeholder: "Mobile Number",
          value: mobileNumberInput.value,
          isInvalid: mobileNumberInput.hasError,
          onBlurHandler: mobileNumberInput.validateValueHandler,
          onFocusHandler: mobileNumberInput.focusHandler,
          onChange: mobileNumberInput.valueChangeHandler,
          type: "text",
          isTouched: mobileNumberInput.isFocused,
        }}
        mandatory="true"
      />
    </div>
  );

  const Line3 = (
    <>
      {role === "student" && (
        <div className={style.line3}>
          <CustomDatePicker
            selectedDate={DOB}
            onChange={(date) => setDOB(date && date.toString())}
            className={`${style.Input} ${style.date}`}
            placeholderText="Date of Birth"
            mandatory
          />
        </div>
      )}
    </>
  );

  const Line4 = (
    <div>
      <InputWithInvalidText
        ErrorMessage={"Invalid Permanent Address"}
        className={`${style.Input}`}
        inputFields={{
          placeholder: "Permanent Address",
          value: permanentInput.value,
          isInvalid: permanentInput.hasError,
          onBlurHandler: permanentInput.validateValueHandler,
          onFocusHandler: permanentInput.focusHandler,
          onChange: permanentInput.valueChangeHandler,
          type: "text",
          isTouched: permanentInput.isFocused,
        }}
        mandatory="true"
      />
    </div>
  );

  const Line5 = (
    <div className={style.line4}>
      <InputWithInvalidText
        ErrorMessage={"Invalid Email"}
        className={`${style.Input} `}
        inputFields={{
          placeholder: "Mail-ID",
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
        ErrorMessage={"Invalid Password"}
        className={`${style.Input} `}
        inputFields={{
          placeholder: "Password",
          value: passwordInput.value,
          isInvalid: passwordInput.hasError,
          onBlurHandler: passwordInput.validateValueHandler,
          onFocusHandler: passwordInput.focusHandler,
          onChange: passwordInput.valueChangeHandler,
          type: "password",
          isTouched: passwordInput.isFocused,
        }}
        mandatory="true"
      />
      <InputWithInvalidText
        ErrorMessage={"Invalid Confirm Password"}
        className={`${style.Input} `}
        inputFields={{
          placeholder: "Confirm Password",
          value: confirmPasswordInput.value,
          isInvalid: confirmPasswordInput.hasError,
          onBlurHandler: confirmPasswordInput.validateValueHandler,
          onFocusHandler: confirmPasswordInput.focusHandler,
          onChange: confirmPasswordInput.valueChangeHandler,
          type: "password",
          isTouched: confirmPasswordInput.isFocused,
        }}
        mandatory="true"
      />
    </div>
  );

  const Line6 = (
    <div className={style.line6}>
      <Dropdown
        options={Occupations}
        onSelect={(selectedOccupation) => setOccupation(selectedOccupation)}
        placeholder="Occupation"
        style={{ marginBottom: "21.6px" }}
        mandatory
      />
      <InputWithInvalidText
        ErrorMessage={"Invalid Aadhaar Card Number"}
        className={`${style.Input} `}
        inputFields={{
          placeholder: "Aadhaar Card Number",
          value: aadhaarInput.value,
          isInvalid: aadhaarInput.hasError,
          onBlurHandler: aadhaarInput.validateValueHandler,
          onFocusHandler: aadhaarInput.focusHandler,
          onChange: aadhaarInput.valueChangeHandler,
          type: "text",
          isTouched: aadhaarInput.isFocused,
        }}
        mandatory
      />
    </div>
  );

  // const Line7 = (
  //   <div className={style.line7}>
  //     <div>
  //       <CustomFileUploader
  //         onChange={handleAadhaarCardFrontChange}
  //         buttonText="Upload Aadhaar Card(Front)"
  //         acceptedFileType={[
  //           "image/jpeg",
  //           "image/png",
  //           "image/pdf",
  //           "application/pdf",
  //         ]}
  //       />
  //       <ul>
  //         {/* <li>Should contain Front & Back</li> */}
  //         <li>Can be png. pdf. jpeg</li>
  //         <li>File size should be 5MB</li>
  //       </ul>
  //     </div>
  //     <div>
  //       <CustomFileUploader
  //         onChange={handleAadhaarCardBackChange}
  //         buttonText="Upload Aadhaar Card(Back)"
  //         acceptedFileType={[
  //           "image/jpeg",
  //           "image/png",
  //           "image/pdf",
  //           "application/pdf",
  //         ]}
  //       />
  //       <ul>
  //         {/* <li>Should contain Front & Back</li> */}
  //         <li>Can be png. pdf. jpeg</li>
  //         <li>File size should be 5MB</li>
  //       </ul>
  //     </div>
  //   </div>
  // );

  // const Line8 = (
  //   <div className={style.line8}>
  //     <CustomFileUploader
  //       onChange={handleProfilePhotoChange}
  //       buttonText="Upload Profile Photo"
  //       acceptedFileType={["image/jpeg", "image/png"]}
  //     />
  //     <ul>
  //       <li>Can be png. pdf. jpeg</li>
  //       <li>File size must should be 5MB</li>
  //     </ul>
  //   </div>
  // );

  return (
    <div className={style.form}>
      <p className={style.note}>
        Note : All <span className={style.important}>*</span> fields are
        Mandatory
      </p>
      <div className={style.formFields}>
        {Line1}
        {Line2}
        {Line3}
        {Line4}
        {Line5}
        {role === "student" && Line6}
        {/* {role === "student" && Line7}
        {role === "student" && Line8} */}
      </div>
      <div className={style.buttonContainer}>
        <LoadingButton
          onClick={handleSubmit}
          className={style.submitBtn}
          disabled={!formIsValid}
          style={{
            backgroundColor: !formIsValid && "#ccc",
          }}
          text="Save & Submit"
          doNotScrollToTop={true}
          loaderColor="white"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PersonalDataForm;
