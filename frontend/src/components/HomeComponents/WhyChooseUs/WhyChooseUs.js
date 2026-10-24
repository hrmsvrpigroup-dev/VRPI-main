import Section from "../../../UI/Sections/Section";
import style from "./WhyChooseUs.module.css";

const WhyChooseUsData = [
  {
    heading: "01 . Expertise in Technology",
    content:
      "VR PI Group of Companies specialized in development of new technology, cyber security, emphasize your deep understanding and expertise in this rapidly growing field. Highlight how your knowledge translates into high-quality products or services.",
  },
  {
    heading: "02 . Customization and Flexibility",
    content:
      "VR PI Group of Companies provide customizable solutions tailored to clients' specific needs, highlight this flexibility. Emphasize how you can adapt your products or services to accommodate diverse requirements and preferences.",
  },
  {
    heading: "03 . Cost-Effectiveness",
    content:
      "Our products or services offer exceptional value for the cost, emphasize how choosing VR PI Group of Companies provides a cost-effective solution without compromising quality or performance.",
  },
  {
    heading: "04 . Global Reach",
    content:
      "With a global presence and a diverse portfolio of clients spanning different continents and industries, VR PI Group offers a truly global perspective and a wealth of cross-cultural experience. Clients from around the world can benefit from the company's international expertise and multicultural insights.",
  },
  {
    heading: "05 . Customer Satisfaction",
    content:
      "VR PI Group of Companies prioritize customer satisfaction above all else, striving to deliver value-driven solutions that delight clients and end-users alike. Clients can rely on the company's responsive customer support, attentive service, and unwavering dedication to their long-term success.",
  },
  {
    heading: "06 . Quality and Reliability",
    content:
      "VR PI Group of Companies is committed to delivering top-quality VR solutions that meet the highest standards of performance, reliability, and user experience. Clients can trust in the company's dedication to quality assurance, rigorous testing, and ongoing support to ensure the success of their VR projects.",
  },
];

const WhyChooseUs = () => {
  return (
    <div>
      <Section title="Why to Choose Us">
        <div className={style.WhyChooseUsPoints}>
          {WhyChooseUsData.map((data, index) => {
            return (
              <WhyChooseUsPoints
                key={index}
                heading={data.heading}
                content={data.content}
              ></WhyChooseUsPoints>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

const WhyChooseUsPoints = ({ heading, content }) => {
  return (
    <div className={style.pointContainer}>
      <div className={style.WhyChooseUsPoint}>
        <h2 style={{ width: "90%" }}>{heading}</h2>
        <p style={{ width: "90%" }}>{content}</p>
      </div>
    </div>
  );
};

export default WhyChooseUs;
