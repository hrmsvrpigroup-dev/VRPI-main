import { useNavigate } from "react-router-dom";
import Button from "../../../../../UI/Button/Button";
import style from "./CourseCard.module.css";
const CourseCard = ({ CardDetails }) => {
  const navigate = useNavigate();

  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        <h3 className={style.cardTitle}>{CardDetails.name}</h3>
        <img
          src={require(`../../../../../assets/dashboard/webLink.png`)}
          alt=""
          onClick={() => {
            navigate(`/edutech/${CardDetails.id}`);
          }}
          className={style.courseLink}
        />
      </div>
      <Button
        onClick={() => {
          navigate(`/edutech/${CardDetails.id}`);
        }}
      >
        Check Details
      </Button>
    </div>
  );
};

export default CourseCard;
