import Button from "../../../UI/Button/Button";
import CustomImage from "../../../UI/Image/Image";
import Section from "../../../UI/Sections/Section";
import Title from "../../../UI/Title/Title";
import style from "./KnowledgeHub.module.css";
import { useNavigate } from "react-router-dom";

const programs = [
  {
    title: "Edu-Tech Program",
    description:
      '"Experience our cutting-edge EduTech program: An innovative platform offering advanced learning tools, personalized guidance, and collaborative opportunities. Empowering participants with modern skills and knowledge, fostering growth and success in the ever-evolving landscape of education and technology.”',
    link: "edutech",
    image: "edutechPageBackground.jpeg",
  },
  {
    title: "Internship Program",
    description:
      '"Step into our immersive Internship Program: A dynamic opportunity showcasing hands-on experiences, mentorship, and professional networking. Tailored to cultivate talent, it provides a springboard for personal development and industry immersion, igniting pathways to future success."',
    link: "internships",
    image: "intershipPageBackground.jpg",
  },
];

const KnowledgeHub = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Section title="Knowledge Hub Program">
        <div>
          <p className={style.knowledgeHubDecription}>
            “A vibrant endeavor providing extensive educational materials,
            mentorship, and avenues for networking. Tailored to equip
            individuals with practical expertise and insights, cultivating both
            personal and professional advancement within a nurturing community
            setting."
          </p>
          <div className={style.programs}>
            {programs.map((program) => (
              <div className={style.program} key={Math.random()}>
                <div className={style.programImage}>
                  <CustomImage
                    src={require(`../../../assets/${program.image}`)}
                    alt=""
                  />
                </div>
                <div className={style.programContent}>
                  <h2>{program.title}</h2>
                  <p>{program.description}</p>
                  <Button onClick={() => navigate(program.link)}>
                    Explore more
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default KnowledgeHub;
