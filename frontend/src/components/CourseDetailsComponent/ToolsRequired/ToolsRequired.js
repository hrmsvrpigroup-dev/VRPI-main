import Section from "../../../UI/Sections/Section";
import style from "./ToolsRequired.module.css";
const ToolsRequired = ({ toolsRequired }) => {
  return (
    <Section title="Tools and Technology used">
      <div className={style.container}>
        <h1>{toolsRequired.title}</h1>
        <div className={style.stacks}>
          {toolsRequired.techStacks.map((stacks) => (
            <div className={style.stack} key={Math.random()}>
              <h2>{stacks.title}</h2>
              {stacks.stacks.map((tech) => (
                <div className={style.technology} key={Math.random()}>
                  <img
                    src={require("../../../assets/courses/doubleDone.png")}
                    alt=""
                  ></img>
                  <p>{tech}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ToolsRequired;
