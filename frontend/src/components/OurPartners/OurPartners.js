import Section from "../../UI/Sections/Section";
import style from "./OurPartners.module.css";

const partners = [
  {
    title: "TCS",
    description:
      '“Empowering global businesses through IT services, consulting, and digital solutions."',
    link: "",
    image: "tcsLogo.jpg",
  },
  {
    title: "Microsoft",
    description:
      '“Empowering individuals and organizations with innovative technology solutions."',
    link: "",
    image: "microsoftLogo2.png",
  },
  {
    title: "Bajaj Allianze",
    description:
      '“Providing trusted insurance and financial solutions for all."',
    link: "",
    image: "bajajLogo.jpg",
  },
  {
    title: "IIFL Securities",
    description:
      '“Empowering investors with comprehensive financial solutions and expertise."',
    link: "",
    image: "IIFLLogo.jpeg",
  },
];

const OurPartners = () => {
  return (
    <div className={style.OurPartnersSection}>
      <Section title="Our Partners" />

      <div className={style.content}>
        <h1>We work with</h1>
        <p>
          Coming together is a beginning, staying together is progress, and
          working together is success.
        </p>
        <div className={style.partners}>
          {partners.map((partner) => (
            <PartnerCard key={partner.title} partnerDetails={partner} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnerCard = ({ partnerDetails }) => {
  return (
    <div className={style.partner}>
      <img
        src={require(`../../assets/partners/${partnerDetails.image}`)}
        alt={partnerDetails.title}
      />
      <div className={style.partnerContent}>
        <h2>{partnerDetails.title}</h2>
        <span>{partnerDetails.description}</span>
        <a href={partnerDetails.link}>Visit Page &rarr;</a>
      </div>
    </div>
  );
};

export default OurPartners;
