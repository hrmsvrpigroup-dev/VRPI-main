import React, { useEffect } from "react";
import FoodProcessingContactUs from "../../../components/Companies/FoodProcessing/FoodProcessingContactUs";

const FoodProcessingContactUsPage = () => {
  useEffect(() => {
    document.title = "Contact Us - VRPI Food Processing";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FoodProcessingContactUs />
    </div>
  );
};

export default FoodProcessingContactUsPage;
