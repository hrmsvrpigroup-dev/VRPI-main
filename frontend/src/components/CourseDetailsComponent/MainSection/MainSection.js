import { useNavigate } from "react-router-dom";
import CustomImage from "../../../UI/Image/Image";
import Rating from "../../../UI/Rating/Rating";
import Button from "../../../UI/Button/Button";

import style from "./MainSection.module.css";

import PleaseEnrollBtn from "../PleaseEnrollBtn/PleaseEnrollBtn";

const MainSection = ({ content }) => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <img
        src={require(`../../../assets/courses/${content.image}`)}
        alt=""
        className={style.courseImage}
      />
      <div className={style.content}>
        <h1>{content.name} Course</h1>
        <p>
          Master Your Skills in our {content.name} Program by building Live
          Projects.
        </p>
        <div className={style.instructorDetails}>
          <img
            src={require(`../../../assets/courses/${content.instructor.image}`)}
            alt=""
          />
          <span className={style.instructorName}>
            <span style={{ color: "#FBFF41" }}> {content.instructor.name}</span>
            {" (Course Instructor)"}
          </span>
        </div>
        <div className={style.courseHighlights}>
          <div className={style.rating}>
            <Rating value={content.rating} />
            <span>{content.rating} Ratings</span>
          </div>
          <div>{content.reviewsCount}+ Reviews</div>
          <div>{content.studentsEnrolled}+ Student Enrolled</div>
          <div>Updated on {content.updatedDate}</div>
        </div>
        <div className={style.language}>
          <CustomImage
            src={require(`../../../assets/courses/link.png`)}
            alt=""
            classForDiv={style.linkIcon}
          />
          <span>Provided Course Language - “ {content.language} ”</span>
        </div>
        <div className={style.buttons}>
          <PleaseEnrollBtn
            courseId={content.id}
            courseCode={content.courseCode}
            discountedPrice={content.discountedPrice}
            actualPrice={content.actualPrice}
            courseType={content.type}
          />
          <Button
            // onClick={() => dispatch(setComingSoon(true))}
            onClick={() => navigate("/contact")}
            className={style.contactUs}
          >
            Contact us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
