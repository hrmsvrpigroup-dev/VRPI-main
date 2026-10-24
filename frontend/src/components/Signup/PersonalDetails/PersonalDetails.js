import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../../store/UserSlice";
import PersonalDataForm from "./PersonalDataForm/PersonalDataForm";
import style from "./PersonalDetails.module.css";

const PersonalDetails = ({ role }) => {
  // const userState = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={style.container}>
      <div className={style.formFrame}>
        <div className={style.head}>
          <div
            className={style.BackBtn}
            onClick={() => {
              dispatch(setUser({ role: null, step: null }));
            }}
          >
            <span className={style.arrowIcon}>&#8592;</span>
            <span className={style.backText}>Back</span>
          </div>
          <h1 className={style.heading}> 1. Personal Details</h1>
        </div>
        <PersonalDataForm role={role} />
      </div>
    </div>
  );
};

export default PersonalDetails;
