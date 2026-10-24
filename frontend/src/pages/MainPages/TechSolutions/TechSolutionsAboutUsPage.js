import React, { useEffect } from "react";
import TechSolutionsAboutUs from "../../../components/Companies/TechSolutions/TechSolutionsAboutUs";

const TechSolutionsAboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us - VRPI Tech Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <TechSolutionsAboutUs />
    </div>
  );
};

export default TechSolutionsAboutUsPage;
