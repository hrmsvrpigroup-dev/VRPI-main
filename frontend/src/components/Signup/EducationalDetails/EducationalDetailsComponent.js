import EducationalDetailsForm from "./EducationalDetailsForm/EducationalDetailsForm";
import style from "./EducationalDetailsComponent.module.css";
const EducationalDetailsComponent = () => {
  return (
    <div className={style.container}>
      <div className={style.formFrame}>
        <div className={style.head}>
          <h1 className={style.heading}>Fill the Details</h1>
        </div>
        <EducationalDetailsForm />
      </div>
    </div>
  );
};

export default EducationalDetailsComponent;
