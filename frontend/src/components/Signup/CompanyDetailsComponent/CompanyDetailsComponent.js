import style from "./CompanyDetailsComponent.module.css";
import CompanyDetailsForm from "./CompanyDetailsForm/CompanyDetailsForm";

const EducationalDetailsComponent = () => {
  return (
    <div className={style.container}>
      <div className={style.formFrame}>
        <div className={style.head}>
          <h1 className={style.heading}>Fill the Details</h1>
        </div>
        <CompanyDetailsForm />
      </div>
    </div>
  );
};

export default EducationalDetailsComponent;
