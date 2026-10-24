import React, { useEffect } from "react";
import Content from "../../../components/Companies/TechSolutions/Content";

const TechSolutionsPage = () => {
  useEffect(() => {
    document.title = "Tech Solutions - VRPI Group of Companies";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Content />
    </div>
  );
};

export default TechSolutionsPage;
