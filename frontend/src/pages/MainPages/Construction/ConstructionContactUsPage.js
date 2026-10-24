import { useEffect } from "react";
import ConstructionContactUs from "../../../components/Companies/Construction/ConstructionContactUs";

const ConstructionContactUsPage = () => {
  useEffect(() => {
    document.title = "Contact Us - VRPI Construction & Infrastructure";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ConstructionContactUs />
    </div>
  );
};

export default ConstructionContactUsPage;
