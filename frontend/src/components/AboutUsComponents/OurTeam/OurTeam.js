import Section from "../../../UI/Sections/Section";
import style from "./OurTeam.module.css";

const smallTeam = [
  {
    name: "Gayathri Meena Kumar",
    linkedinLink: "#",
    designation: "Security Manager",
    image: "team1.png",
  },
  {
    name: "Shankar Chandra",
    linkedinLink: "#",
    designation: "Product Manager",
    image: "team2.png",
  },
];
const OurTeam = () => {
  return (
    <>
      <Section title="Meet Our Team" viewAll="true">
        <div className={style.content}>
          <div className={style.ourTeamDescription}>
            <h2>FOR BETTER T0MORROW.</h2>
            <p>
              Together is a team of good who spend there time thinking of ways
              to make our clients like you more ,and who will probably offer
              with the good experience.
            </p>
          </div>
          <div className={style.team}>
            {smallTeam.map((member, index) => (
              <MemberCard
                name={member.name}
                linkedinLink={member.linkedinLink}
                designation={member.designation}
                image={member.image}
                key={index}
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

const MemberCard = ({ name, linkedinLink, designation, image }) => {
  const linkedinIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="25"
      height="25"
      viewBox="0 0 256 256"
    >
      <g
        fill="#ffffff"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <g transform="scale(5.12,5.12)">
          <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z"></path>
        </g>
      </g>
    </svg>
  );
  return (
    // <div className={style.teamCard}>
    <div className={style.memberContent}>
      <img
        src={require(`../../../assets/aboutus/${image}`)}
        alt=""
        className={style.memberCardBackground}
      />
      <div className={style.memberDetails}>
        <div className={style.memberMainDetails}>
          <h2>{name}</h2>
          <p>{designation}</p>
        </div>
        <a href={linkedinLink}>{linkedinIcon}</a>
      </div>
    </div>
    // </div>
  );
};

export default OurTeam;
