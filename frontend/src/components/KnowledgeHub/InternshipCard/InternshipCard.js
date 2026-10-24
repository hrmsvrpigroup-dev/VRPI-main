import { Link } from "react-router-dom";
import style from "./InternshipCard.module.css";
import { useDispatch } from "react-redux";
import { setComingSoon } from "../../../store/ComingSoonSlice";

const InternshipCard = ({ CardDetails, onApply }) => {
  const dispatch = useDispatch();
  return (
    <div className={style.card}>
      <div className={style.cardHead}>
        <h2>{CardDetails.name}</h2>
        {/* <div className={style.cardLink}>
          <Link to={`/internships/${CardDetails.id}`}>
            <img src={require("../../../assets/ArrowForward.png")} alt=""></img>
          </Link>
        </div> */}
      </div>
      <div>
        <div className={style.cardContent}>{CardDetails.content}</div>
        {/* <div className={style.checkDetails}>
          <Link to={`/internships/${CardDetails.id}`}>Check Details</Link>
        </div> */}
      </div>
      {CardDetails.active ? (
        <div className={style.btn}>
          {CardDetails.buttonContent} {CardDetails.price}
        </div>
      ) : (
        <button
          onClick={() => {
            if (onApply) {
              onApply(CardDetails);
            } else {
              dispatch(setComingSoon(true));
            }
          }}
          className={style.btn}
          // style={{ width: "80%" }}
        >
          {" "}
          {CardDetails.buttonContent} {CardDetails.price}
        </button>
      )}
    </div>
  );
};

export default InternshipCard;
