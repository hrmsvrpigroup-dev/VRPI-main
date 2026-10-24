import React, { useEffect } from "react";
import Content from "../../../components/Companies/ManagementConsulting/Content";

const ManagementConsultingPage = () => {
  useEffect(() => {
    document.title = "Management & Consulting - VRPI Group";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Content />
    </div>
  );
};

export default ManagementConsultingPage;
