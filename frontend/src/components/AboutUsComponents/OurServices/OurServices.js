import Section from "../../../UI/Sections/Section";
import style from "./OurServices.module.css";
import { Companies } from "../../../data/CompaniesData";

const OurServices = () => {
  return (
    <div>
      <Section title="Our Companies & Services">
        <div className={style.companies}>
          {Companies.map((company, index) => (
            <div key={Math.random()} className={style.companyCard}>
              {company && (
                <PictureDragCard
                  image={company.image}
                  title={company.title}
                  color={company.backgroundColor}
                  key={company.index}
                />
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

const PictureDragCard = ({ image, title, color }) => {
  return (
    <>
      <img src={require(`../../../assets/companies/${image}`)} alt="" />
      <h2 style={{ backgroundColor: color }}>{title}</h2>
    </>
  );
};

export default OurServices;
