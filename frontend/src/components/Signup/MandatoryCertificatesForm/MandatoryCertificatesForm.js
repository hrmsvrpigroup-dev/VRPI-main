import { useEffect, useState } from "react";
import CustomFileUploader from "../../../UI/FileUploader/FileUploader";
import style from "./MandatoryCertificatesForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../../../store/MessageDisplay/MessageActions";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import axios from "axios";
import { url } from "../../../constants";

const MandatoryCertificatesForm = () => {
  const [incomeCertificateFile, setIncomeCertificateFile] = useState(null);
  const [aadhaarCardFrontFile, setAadhaarCardFrontFile] = useState(null);
  const [aadhaarCardBackFile, setAadhaarCardBackFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);

  // const annualIncomeInput = useInput({ validateValue: annualIncomeValidator });

  const [formIsValid, setFormIsValid] = useState(false);

  const handleIncomeCertificateFileChange = (file) => {
    setIncomeCertificateFile(file);
  };
  const handleAadhaarCardFrontChange = (file) => {
    setAadhaarCardFrontFile(file);
  };
  const handleAadhaarCardBackChange = (file) => {
    setAadhaarCardBackFile(file);
  };

  const handlePassportChange = (file) => {
    setPassportFile(file);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check the validity of all input fields and set formIsValid accordingly
    // const isIncomeValid = annualIncomeInput.isValid;
    const isAadhaarCardFrontValid = aadhaarCardFrontFile !== null;
    const isAadhaarCardBackValid = aadhaarCardBackFile !== null;
    const isPassportValid = passportFile !== null;
    const isIncomeValid = incomeCertificateFile !== null;

    setFormIsValid(
      isAadhaarCardFrontValid &&
        isAadhaarCardBackValid &&
        isPassportValid &&
        isIncomeValid
    );
  }, [
    // annualIncomeInput.isValid,
    aadhaarCardFrontFile,
    aadhaarCardBackFile,
    passportFile,
    incomeCertificateFile,
  ]);

  useEffect(() => {
    dispatch(setMessage("Upload Mandatory Certificates", "normal", true));
  }, []);

  const userId = useSelector((state) => state.login.userId);

  const [isLoading, setIsLoading] = useState(false);

  // const { sendRequest, responseData, isLoading, statusCode, error } =
  //   useHttpsAxios();

  const SuccessResponseHandler = () => {
    dispatch(
      setMessage(
        "Uploaded your Certificates Successfully",
        "success",
        true,
        1.5
      )
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, [1500]);
  };

  // useEffect(() => {
  //   if (formIsValid && (statusCode === 200 || statusCode === 201)) {
  //     console.log(responseData);
  //     SuccessResponseHandler();
  //   } else if (statusCode < 0 && statusCode > 202) {
  //     console.log(error);
  //     console.log(responseData);
  //   }
  // });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("incomeCert", incomeCertificateFile);
      // formData.append("annualIncome", annualIncomeInput.value);
      formData.append("aadharFront", aadhaarCardFrontFile);
      formData.append("aadharBack", aadhaarCardBackFile);
      formData.append("profilePhoto", passportFile);
      setIsLoading(true);
      await axios.put(
        `${url.backendBaseUrl}/vrpi-user/update-doc/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // setMessage(response.data.message, "success");
      setIsLoading(false);
      // console.log(response);
      SuccessResponseHandler();
    } catch (error) {
      if (error.response) {
        setIsLoading(false);

        setMessage(
          error.response.data.detail || "Error updating user documents.",
          "error"
        );
        // console.error("Error updating user documents:", error.response.data);
      } else if (error.request) {
        setIsLoading(false);

        setMessage("No response received from the server.", "error");
        // console.error("No response received:", error.request);
      } else {
        setIsLoading(false);

        setMessage("An error occurred while sending the request.", "error");
        // console.error("Error:", error.message);
      }
    }
  };

  // const handleSubmit = async () => {
  //   if (formIsValid) {
  //     const formData = new FormData();
  //     formData.append("incomeCert", incomeCertificateFile);
  //     // formData.append("annualIncome", annualIncomeInput.value);
  //     formData.append("aadharFront", aadhaarCardFrontFile);
  //     formData.append("aadharBack", aadhaarCardBackFile);
  //     formData.append("profilePhoto", passportFile);

  //     sendRequest({
  //       url: `${url.backendBaseUrl}/vrpi-user/update-doc/${userId}`,
  //       method: "put",
  //       data: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //   }
  // };

  const Line1 = (
    <div className={style.line1}>
      <div className={style.uploadInputs}>
        <CustomFileUploader
          onChange={handleIncomeCertificateFileChange}
          buttonText="Income Certificate"
          acceptedFileType={[
            "image/jpeg",
            "image/png",
            // "image/pdf",
            // "application/pdf",
          ]}
          mandatory
        />
        <ul>
          <li>Can be png, jpeg</li>
          <li>File size should below 5MB</li>
        </ul>
      </div>
      {/* <InputWithInvalidText
        ErrorMessage={"Invalid Annual Income"}
        className={style.Input}
        inputFields={{
          placeholder: "Annual Income",
          value: annualIncomeInput.value,
          isInvalid: annualIncomeInput.hasError,
          onBlurHandler: annualIncomeInput.validateValueHandler,
          onFocusHandler: annualIncomeInput.focusHandler,
          onChange: annualIncomeInput.valueChangeHandler,
          type: "text",
          isTouched: annualIncomeInput.isFocused,
        }}
        mandatory="true"
      /> */}
    </div>
  );

  const Line2 = (
    <div className={style.line3}>
      <div className={style.uploadInputs}>
        <CustomFileUploader
          onChange={handleAadhaarCardFrontChange}
          buttonText="Upload Aadhaar Card(Front)"
          acceptedFileType={[
            "image/jpeg",
            "image/png",
            // "image/pdf",
            // "application/pdf",
          ]}
          mandatory
        />
        <ul>
          <li>Can be png, jpeg</li>
          <li>File size should below 5MB</li>
        </ul>
      </div>
      <div className={style.uploadInputs}>
        <CustomFileUploader
          onChange={handleAadhaarCardBackChange}
          buttonText="Upload Aadhaar Card(Back)"
          acceptedFileType={[
            "image/jpeg",
            "image/png",
            // "image/pdf",
            // "application/pdf",
          ]}
          mandatory
        />
        <ul>
          <li>Can be png, jpeg</li>
          <li>File size should below 5MB</li>
        </ul>
      </div>
    </div>
  );

  const Line3 = (
    <div className={style.line3}>
      <div className={style.uploadInputs}>
        <CustomFileUploader
          onChange={handlePassportChange}
          buttonText="Upload Profile Photo"
          acceptedFileType={["image/jpeg", "image/png"]}
          mandatory
        />
        <ul>
          <li>Can be png, jpeg</li>
          <li>File size should below 5MB</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className={style.form}>
      <h1 className={style.title}>Fill the details</h1>

      <p className={style.note}>
        Note : All <span className={style.important}>*</span> fields are
        Mandatory
      </p>
      <div className={style.formFields}>
        {Line1}
        {Line2}
        {Line3}
      </div>
      <div className={style.buttonContainer}>
        <LoadingButton
          onClick={handleSubmit}
          className={style.submitBtn}
          disabled={!formIsValid}
          style={{ backgroundColor: !formIsValid && "#ccc" }}
          doNotScrollToTop={true}
          isLoading={isLoading}
          text={"Sava & Submit"}
          loaderColor={"white"}
        ></LoadingButton>
      </div>
    </div>
  );
};

export default MandatoryCertificatesForm;
