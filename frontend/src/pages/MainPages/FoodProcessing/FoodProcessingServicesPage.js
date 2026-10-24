import React, { useEffect } from "react";
import FoodProcessingServices from "../../../components/Companies/FoodProcessing/FoodProcessingServices";

const FoodProcessingServicesPage = () => {
  useEffect(() => {
    document.title = "Services - VRPI Food Processing";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FoodProcessingServices />
    </div>
  );
};

export default FoodProcessingServicesPage;
