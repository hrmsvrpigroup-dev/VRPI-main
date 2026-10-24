import { Link } from "react-router-dom";
import style from "./CourseCard.module.css";
import { useDispatch } from "react-redux";
import { setComingSoon } from "../../../store/ComingSoonSlice";
import Button from "../../../UI/Button/Button";

const CourseCard = ({ CardDetails }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  return (
    <div className={style.card}>
      <div className={style.cardSubContainer}>
        <img
          src={require(`../../../assets/courses/${CardDetails.image}`)}
          alt=""
          className={style.courseImage}
        ></img>
        <div className={style.cardContent}>
          {CardDetails.active ? (
            <Link
              to={`/edutech/${CardDetails.id}`}
              className={style.link}
              onClick={handleClick}
              key={Math.random()}
            >
              <Button
                // onClick={() => dispatch(setComingSoon(true))}
                className={style.btn}
              >
                Learn More
              </Button>
            </Link>
          ) : (
            <Link
              // to={`/edutech/${CardDetails.id}`}
              className={style.link}
              onClick={handleClick}
              key={Math.random()}
            >
              <Button
                onClick={() => dispatch(setComingSoon(true))}
                className={style.btn}
              >
                Learn More
              </Button>
            </Link>
          )}
          <h2 className={style.cardHeading}>{CardDetails.name}</h2>
          <div
            style={{ display: "flex", gap: "0.3rem", flexDirection: "column" }}
          >
            {CardDetails.content.map((content) => (
              <div className={style.cardBenefits} key={Math.random()}>
                <img src={require(`../../../assets/courses/done.png`)} alt="" />
                <p>{content}</p>
              </div>
            ))}
          </div>
          {CardDetails.type !== "upcoming" && (
            <>
              {CardDetails.type === "online" ? (
                <div>
                  {/* <span style={{ fontWeight: 700, marginRight: "1rem" }}>
                    ₹
                    <span style={{ textDecoration: "line-through" }}>
                      {CardDetails.actualPrice}
                    </span>
                  </span> */}
                  <span style={{ color: "#ff6501", fontWeight: 700 }}>
                    ₹{CardDetails.actualPrice}/-
                  </span>
                </div>
              ) : (
                <span style={{ color: "#ff6501", fontWeight: 700 }}>
                  ₹{CardDetails.actualPrice}/-
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
{
  /* <div className={style.checkDetails}>
  <Link to={CardDetails.cardLink}>Check Details</Link>
</div> */
}

export default CourseCard;
