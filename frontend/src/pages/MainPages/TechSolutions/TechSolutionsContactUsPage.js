import React, { useEffect } from "react";
import TechSolutionsContactUs from "../../../components/Companies/TechSolutions/TechSolutionsContactUs";

const TechSolutionsContactUsPage = () => {
  useEffect(() => {
    document.title = "Contact Us - VRPI Tech Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <TechSolutionsContactUs />
    </div>
  );
};

export default TechSolutionsContactUsPage;
