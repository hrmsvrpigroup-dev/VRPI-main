import React, { useEffect } from "react";
import FoodProcessingAboutUs from "../../../components/Companies/FoodProcessing/FoodProcessingAboutUs";

const FoodProcessingAboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us - VRPI Food Processing";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FoodProcessingAboutUs />
    </div>
  );
};

export default FoodProcessingAboutUsPage;
