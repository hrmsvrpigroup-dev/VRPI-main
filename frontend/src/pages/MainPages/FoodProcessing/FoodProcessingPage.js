import React, { useEffect } from "react";
import Content from "../../../components/Companies/FoodProcessing/Content";

const FoodProcessingPage = () => {
  useEffect(() => {
    document.title = "Food Processing - VRPI Group";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Content />
    </div>
  );
};

export default FoodProcessingPage;
