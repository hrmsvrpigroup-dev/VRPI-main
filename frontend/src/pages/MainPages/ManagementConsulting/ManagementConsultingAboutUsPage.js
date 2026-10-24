import React, { useEffect } from "react";
import ManagementConsultingAboutUs from "../../../components/Companies/ManagementConsulting/ManagementConsultingAboutUs";

const ManagementConsultingAboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us - VRPI Management & Consulting";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ManagementConsultingAboutUs />
    </div>
  );
};

export default ManagementConsultingAboutUsPage;
