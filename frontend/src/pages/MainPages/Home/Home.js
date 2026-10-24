import AboutUsSection from "../../../components/HomeComponents/AboutUsSection/AboutSection";
import KnowledgeHub from "../../../components/HomeComponents/KnowledgeHub/KnowledgeHub";
import MainScreen from "../../../components/HomeComponents/MainSection/MainSection";
import OurClients from "../../../components/OurClients/OurClients";
import OurCompanies from "../../../components/HomeComponents/OurCompanies/OurCompanies";
import OurPartners from "../../../components/OurPartners/OurPartners";
import WhyChooseUs from "../../../components/HomeComponents/WhyChooseUs/WhyChooseUs";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Home";
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <MainScreen />
      <OurCompanies />
      <AboutUsSection />
      <WhyChooseUs />
      {/* <OurServices /> */}
      <KnowledgeHub />
      <OurPartners />
      <OurClients />
    </div>
  );
};

export default Home;
