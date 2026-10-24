import { useEffect } from "react";
import ConstructionServices from "../../../components/Companies/Construction/ConstructionServices";

const ConstructionServicesPage = () => {
  useEffect(() => {
    document.title = "Services - VRPI Construction & Infrastructure";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ConstructionServices />
    </div>
  );
};

export default ConstructionServicesPage;
