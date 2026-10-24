import { useEffect, useState } from "react";
import style from "./UpdateUserDetails.module.css";
import useInput from "../../../hooks/use-Input";
import SignUpOrLoginContainer from "../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import InputWithInvalidText from "../../../UI/Input/InputWithInvalidText";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import CustomFileUploader from "../../../UI/FileUploader/FileUploader";
import {
  addressValidation,
  mobileNumberValidation,
  nameValidation,
} from "../../../components/InputValidations/InputValidations";
import { useSelector } from "react-redux";
import useHttpsAxios from "../../../hooks/use-httpsAxios";
import { url } from "../../../constants";
import UserDataComponent from "../../../data/user";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const UpdateUserDetailsWrapper = () => {
  const { userData, isLoading } = UserDataComponent();

  if (isLoading || !userData || !userData.user) {
    return (
      <div className={style.screen} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <CircularProgress />
      </div>
    );
  }

  return <UpdateUserDetailsForm userData={userData} />;
};

const UpdateUserDetailsForm = ({ userData }) => {
  const navigate = useNavigate();
  const loginScreenData = {
    title: "Welcome Back!",
    description:
      "At moment we don’t have your Data to create your account. So lets just start to create your Account",
    image: "loginPageImage.svg",
  };

  useEffect(() => {
    document.title = "User Details Update Page";
  }, []);

  const [formIsValid, setFormIsValid] = useState();

  const firstNameInput = useInput({
    initialValue: userData.user.firstName,
    validateValue: nameValidation,
  });
  const lastNameInput = useInput({
    initialValue: userData.user.lastName,
    validateValue: nameValidation,
  });
  const mobileNumberInput = useInput({
    initialValue: userData.user.phoneNumber,
    validateValue: mobileNumberValidation,
  });
  const addressInput = useInput({
    initialValue: userData.user.address,
    validateValue: addressValidation,
  });

  const [aadhaarCardFrontFile, setAadhaarCardFrontFile] = useState(
    userData.user.aadharFront
  );
  const [aadhaarCardBackFile, setAadhaarCardBackFile] = useState(
    userData.user.aadharBack
  );
  const [passportFile, setPassportFile] = useState(userData.user.passportFile);
  const [incomeCertificateFile, setIncomeCertificateFile] = useState(
    userData.user.incomeCertificate
  );

  const handleAadhaarCardFrontChange = (file) => {
    setAadhaarCardFrontFile(file);
  };
  const handleAadhaarCardBackChange = (file) => {
    setAadhaarCardBackFile(file);
  };

  const handlePassportChange = (file) => {
    setPassportFile(file);
  };
  const handleIncomeCertificateChange = (file) => {
    setIncomeCertificateFile(file);
  };

  useEffect(() => {
    const isValid =
      firstNameInput.isValid &&
      lastNameInput.isValid &&
      mobileNumberInput.isValid &&
      addressInput.isValid &&
      aadhaarCardFrontFile &&
      passportFile &&
      aadhaarCardBackFile &&
      incomeCertificateFile;

    setFormIsValid(isValid);
  }, [
    firstNameInput.isValid,
    lastNameInput.isValid,
    mobileNumberInput.isValid,
    addressInput.isValid,
    aadhaarCardFrontFile,
    passportFile,
    aadhaarCardBackFile,
    incomeCertificateFile,
  ]);

  const { sendRequest, statusCode, isLoading } = useHttpsAxios();

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      navigate("/dashboard");
    }
  }, [statusCode, navigate]);

  const handleSubmit = () => {
    if (formIsValid) {
      const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        fathersName: userData.user.fathersName,
        gender: userData.user.gender,
        dateOfBirth: userData.user.dateOfBirth,
        phoneNumber: mobileNumberInput.value,
        address: addressInput.value,
        email: userData.user.email,
        occupation: userData.user.occupation,
        aadharCardNumber: userData.user.aadharCardNumber,
        roles: [],
        aadharFront: aadhaarCardFrontFile,
        aadharBack: aadhaarCardBackFile,
        profilePic: passportFile,
        incomeCert: incomeCertificateFile,
      };

      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/update-user/${userData.user.id}`,
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  return (
    <div className={style.screen}>
      <SignUpOrLoginContainer
        screenData={loginScreenData}
        classForMainContent={style.mainContent}
      >
        <div className={style.container}>
          <h1>Update Profile</h1>
          <div className={style.Inputs}>
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
            <InputWithInvalidText
              ErrorMessage={"Invalid Mobile Number"}
              className={style.Input}
              inputFields={{
                placeholder: "Update your Mobile Number",
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
            <InputWithInvalidText
              ErrorMessage={"Invalid Address"}
              className={style.Input}
              inputFields={{
                placeholder: "Update your Address",
                value: addressInput.value,
                isInvalid: addressInput.hasError,
                onBlurHandler: addressInput.validateValueHandler,
                onFocusHandler: addressInput.focusHandler,
                onChange: addressInput.valueChangeHandler,
                type: "text",
                isTouched: addressInput.isFocused,
              }}
              mandatory="true"
            />
            <div>
              <CustomFileUploader
                onChange={handlePassportChange}
                buttonText="Upload Profile Picture"
                acceptedFileType={["image/jpeg", "image/png", "image/pdf"]}
              />
              <ul>
                <li>Can be png. pdf. jpeg</li>
                <li>File size should be 5MB</li>
              </ul>
            </div>
            <div>
              <CustomFileUploader
                onChange={handleAadhaarCardFrontChange}
                buttonText="Upload Aadhaar Card (Front)"
                acceptedFileType={["image/jpeg", "image/png", "image/pdf"]}
              />
              <ul>
                <li>Can be png. pdf. jpeg</li>
                <li>File size should be 5MB</li>
              </ul>
            </div>
            <div>
              <CustomFileUploader
                onChange={handleAadhaarCardBackChange}
                buttonText="Upload Aadhaar Card (Back)"
                acceptedFileType={["image/jpeg", "image/png", "image/pdf"]}
              />
              <ul>
                <li>Can be png. pdf. jpeg</li>
                <li>File size should be 5MB</li>
              </ul>
            </div>

            <div>
              <CustomFileUploader
                onChange={handleIncomeCertificateChange}
                buttonText="Upload Income Certificate"
                acceptedFileType={["image/jpeg", "image/png", "image/pdf"]}
              />
              <ul>
                <li>Can be png. pdf. jpeg</li>
                <li>File size should be 5MB</li>
              </ul>
            </div>
          </div>

          <div className={style.submitBtn}>
            <LoadingButton
              text="Submit"
              onClick={handleSubmit}
              disabled={!formIsValid}
              isLoading={isLoading}
              loaderColor="white"
              style={{ backgroundColor: !formIsValid && "#ccc" }}
            />
          </div>
        </div>
      </SignUpOrLoginContainer>
    </div>
  );
};

export default UpdateUserDetailsWrapper;
