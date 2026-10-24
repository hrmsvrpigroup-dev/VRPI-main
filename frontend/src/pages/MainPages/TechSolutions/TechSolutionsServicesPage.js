import React, { useEffect } from "react";
import TechSolutionsServices from "../../../components/Companies/TechSolutions/TechSolutionsServices";

const TechSolutionsServicesPage = () => {
  useEffect(() => {
    document.title = "Services - VRPI Tech Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <TechSolutionsServices />
    </div>
  );
};

export default TechSolutionsServicesPage;
