import OurCoreValues from "../../../components/AboutUsComponents/CoreValue/CoreValues";
import MainScreen from "../../../components/AboutUsComponents/MainScreen/MainScreen";
import OurClients from "../../../components/OurClients/OurClients";
import OurCulture from "../../../components/AboutUsComponents/OurCulture/OurCulture";
import OurMission from "../../../components/AboutUsComponents/OurMission/OurMission";
import OurPartners from "../../../components/OurPartners/OurPartners";
import OurServices from "../../../components/AboutUsComponents/OurServices/OurServices";
import OurTeam from "../../../components/AboutUsComponents/OurTeam/OurTeam";
import Quote from "../../../components/AboutUsComponents/Quote/Quote";
import style from "./AboutUs.module.css";
import { useEffect } from "react";
export default function AboutUs() {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - About Us";
  }, []);

  return (
    <div className={style.AboutUs}>
      <MainScreen />
      <OurMission />
      <OurCoreValues />
      <OurPartners />
      <OurClients />
      <OurServices />
      <OurTeam />
      <OurCulture />
      <Quote />
    </div>
  );
}
