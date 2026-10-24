import { useEffect, useState } from "react";
import Dropdown from "../../../../UI/Dropdown/Dropdown";
import InputWithInvalidText from "../../../../UI/Input/InputWithInvalidText";
import useInput from "../../../../hooks/use-Input";
import {
  endYearValidation,
  nameValidation,
  percentageValidation,
  yearValidation,
} from "../../../InputValidations/InputValidations";
import style from "./CompanyDetailsForm.module.css";
import Button from "../../../../UI/Button/Button";
import LoadingButton from "../../../../UI/LoadingButton/LoadingButton";
import useHttpsAxios from "../../../../hooks/use-httpsAxios";

const lookingForData = [
  { label: "Rent-a-Desk", value: "Rent-a-Desk" },
  { label: "Business Deal", value: "Business Deal" },
];

const CompanyDetailsForm = () => {
  const companyNameInput = useInput({ validateValue: nameValidation });

  const companySectorInput = useInput({ validateValue: nameValidation });
  const establishedYearInput = useInput({ validateValue: yearValidation });

  const locationInput = useInput({ validateValue: nameValidation });

  const [lookingFor, setLookingFor] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const isFormValid =
      lookingFor &&
      companyNameInput.isValid &&
      companySectorInput.isValid &&
      establishedYearInput.isValid &&
      locationInput.isValid;

    setFormIsValid(isFormValid);
  }, [
    formIsValid,
    lookingFor,
    companyNameInput.isValid,
    companySectorInput.isValid,
    establishedYearInput.isValid,
    locationInput.isValid,
  ]);

  const { isLoading } = useHttpsAxios();

  const submitHandler = () => {
    const formData = {
      lookingFor,
      companyNameInput,
      companySectorInput,
      establishedYearInput,
      locationInput,
    };
    if (formIsValid) {
      // console.log(formData);
      // console.log("Form submitted successfully!");
    } else {
      // console.log("Form submission failed. Please check the fields.");
    }
  };

  const Line1 = (
    <div className={style.line2}>
      <InputWithInvalidText
        ErrorMessage={"Invalid Company Name"}
        className={style.Input}
        inputFields={{
          placeholder: "Company Name",
          value: companyNameInput.value,
          isInvalid: companyNameInput.hasError,
          onBlurHandler: companyNameInput.validateValueHandler,
          onFocusHandler: companyNameInput.focusHandler,
          onChange: companyNameInput.valueChangeHandler,
          type: "text",
          isTouched: companyNameInput.isFocused,
        }}
        mandatory="true"
      />
    </div>
  );

  const Line2 = (
    <div className={style.line1}>
      <InputWithInvalidText
        ErrorMessage={"Invalid Company Sector"}
        className={style.Input}
        inputFields={{
          placeholder: "company Sector",
          value: companySectorInput.value,
          isInvalid: companySectorInput.hasError,
          onBlurHandler: companySectorInput.validateValueHandler,
          onFocusHandler: companySectorInput.focusHandler,
          onChange: companySectorInput.valueChangeHandler,
          type: "text",
          isTouched: companySectorInput.isFocused,
        }}
        mandatory="true"
      />
      <InputWithInvalidText
        ErrorMessage={"Invalid Established year"}
        className={style.Input}
        inputFields={{
          placeholder: "Established In",
          value: establishedYearInput.value,
          isInvalid: establishedYearInput.hasError,
          onBlurHandler: establishedYearInput.validateValueHandler,
          onFocusHandler: establishedYearInput.focusHandler,
          onChange: establishedYearInput.valueChangeHandler,
          type: "number",
          isTouched: establishedYearInput.isFocused,
        }}
        mandatory="true"
      />
    </div>
  );

  const Line3 = (
    <div className={style.line3}>
      <InputWithInvalidText
        ErrorMessage={"Invalid Company Location"}
        className={style.Input}
        inputFields={{
          placeholder: "Company Location",
          value: locationInput.value,
          isInvalid: locationInput.hasError,
          onBlurHandler: locationInput.validateValueHandler,
          onFocusHandler: locationInput.focusHandler,
          onChange: locationInput.valueChangeHandler,
          type: "text",
          isTouched: locationInput.isFocused,
        }}
        mandatory="true"
      />
    </div>
  );
  const Line4 = (
    <div className={style.line4}>
      <Dropdown
        options={lookingForData}
        onSelect={(value) => setLookingFor(value)}
        placeholder="Looking VR PI Group of Companies for"
        style={{ marginBottom: "21.6px", width: "100%" }}
        mandatory
      />
    </div>
  );

  return (
    <div className={style.form}>
      <p className={style.note}>
        Note : All <span className={style.important}>*</span> fields are
        Mandatory
      </p>
      <div className={style.formContainer}>
        {Line1}
        {Line2}
        {Line3}
        {Line4}
      </div>
      <div className={style.submitButton}>
        {/* <Button
          onClick={submitHandler}
          disabled={!formIsValid}
          style={{ backgroundColor: !formIsValid && "#ccc" }}
        >
          Save & Submit
        </Button> */}

        <LoadingButton
          onClick={submitHandler}
          disabled={!formIsValid}
          style={{ backgroundColor: !formIsValid && "#ccc", width: "200px" }}
          doNotScrollToTop={true}
          text={"Save & Submit"}
          loaderColor={"white"}
          isLoading={isLoading}
        ></LoadingButton>
      </div>
    </div>
  );
};

export default CompanyDetailsForm;
