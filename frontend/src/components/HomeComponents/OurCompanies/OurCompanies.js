import { useEffect, useState } from "react";
import Section from "../../../UI/Sections/Section";
import style from "./OurCompanies.module.css";
import { Companies } from "../../../data/CompaniesData";
import CirclarText from "../../../UI/CircularText/CircularText";
import { useNavigate } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import { useDispatch } from "react-redux";
import { setComingSoon } from "../../../store/ComingSoonSlice";
import HideExtraText from "../../../UI/HideExtraText/HideExtraText";
const OurCompanies = () => {
  const [selectedCompany, setSelectedCompany] = useState(Companies[0]);

  const handleCompanyClick = (index) => {
    setSelectedCompany(Companies[index]);
  };

  return (
    <div>
      <Section title="Our Companies">
        <div>
          <p className={style.campanyiesDecription}>
            "Our coalition of companies represent a diverse spectrum of
            expertise, each dedicated to excellence in their respective fields.
            With a shared commitment to innovation, quality, and clients
            satisfaction, we collectively strive to elevate industry standards,
            drive progress, and make a positive impact on the world."
          </p>

          <div
            className={style.companies}
            style={{ backgroundColor: selectedCompany.backgroundColor }}
          >
            <Company
              company={selectedCompany}
              handleCompanyClick={handleCompanyClick}
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

const Company = ({ company, handleCompanyClick }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1000;
  const dispatch = useDispatch();
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinks = () => {
    if (company.active) {
      naviagte(company.link);
    } else {
      dispatch(setComingSoon(true));
    }
  };

  const naviagte = useNavigate();
  return (
    <div className={style.company}>
      <div className={style.companyHeading}>
        <h2>{company.title}</h2>
        <Button onClick={handleLinks}>Explore more</Button>
      </div>
      {/* <p>{company.content}</p> */}
      <HideExtraText lines={`${width > 500 ? "2" : "6"}`} height="100px">
        {company.content}
      </HideExtraText>
      <div className={style.belowContent}>
        <div className={style.companyImages}>
          {Companies.map((companyForImage, index) => (
            <img
              key={index}
              src={require(`../../../assets/companies/${companyForImage.image}`)}
              alt={companyForImage.title}
              onClick={() => handleCompanyClick(index)}
              onMouseEnter={() => handleCompanyClick(index)}
              style={{
                width: company.title === companyForImage.title ? "40%" : "10%",
              }}
              className={style.companyImage}
            />
          ))}
        </div>
        {width > breakpoint && (
          <CirclarText
            text="VR pi group of Companies "
            width="250px"
          ></CirclarText>
        )}
      </div>
    </div>
  );
};

export default OurCompanies;
