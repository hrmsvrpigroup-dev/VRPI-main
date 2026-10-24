import style from "./EdutechBenefits.module.css";
import { useNavigate } from "react-router-dom";
const EdutechBenefits = () => {
  const courseBenefits = [
    "Course Certification",
    "Internship with Real-Time Project",
    "Scholarship",
    "Virtual Classes",
    "Recorded Classes",
  ];

  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.head}>
        <h2 className={style.title}>Edu-Tech Benefits</h2>
        <span
          className={style.viewLink}
          onClick={() => {
            navigate("/edutech");
          }}
        >
          view courses
        </span>
      </div>
      <div className={style.benefits}>
        {courseBenefits.map((benefit, index) => (
          <div className={style.benefit} key={index}>
            <img
              src={require(`../../../../assets/dashboard/correct-w.png`)}
              alt=""
              // onClick={()_=> navigate('/edutech')}
            />
            <p>{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EdutechBenefits;
