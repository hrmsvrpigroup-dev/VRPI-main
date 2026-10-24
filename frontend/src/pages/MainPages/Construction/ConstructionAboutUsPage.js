import { useEffect } from "react";
import ConstructionAboutUs from "../../../components/Companies/Construction/ConstructionAboutUs";

const ConstructionAboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us - VRPI Construction & Infrastructure";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ConstructionAboutUs />
    </div>
  );
};

export default ConstructionAboutUsPage;
