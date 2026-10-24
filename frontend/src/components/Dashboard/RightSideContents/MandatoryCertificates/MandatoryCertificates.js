import { useNavigate } from "react-router-dom";
import Button from "../../../../UI/Button/Button";
import style from "./MandatoryCertificates.module.css";

const MandatoryCertificatesData = [
  {
    title: "Income Certificate",
    note: "Note: Upload Income Certificate which is valid for a period of 1 year from the date of issue.",
  },
  {
    title: "Aadhaar Card (Front)",
    note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
  },
  {
    title: "Aadhaar Card (Back)",
    note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
  },
  {
    title: "Passport Size photo",
    note: "Note: Upload your Passport size Photo of size 5MB and can be of png.,jpeg., pdf.",
  },
];

const MandatoryCertificates = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <h2 className={style.containerTitle}>Mandatory Certificates</h2>
      <p className={style.containerDescription}>
        Submit your details which are mandatory for Knowledge Hub Program
      </p>
      <div className={style.certificateCards}>
        {MandatoryCertificatesData.map((x, i) => (
          <div className={style.card} key={i}>
            <h3 className={style.cardTitle}>{x.title}</h3>
            <p className={style.cardDescription}>{x.note}</p>
          </div>
        ))}
        <Button
          onClick={() => {
            navigate("/mandatoryCertificates");
          }}
          className={style.uploadBtn}
        >
          Upload Certificates
        </Button>
      </div>
    </div>
  );
};

export default MandatoryCertificates;
