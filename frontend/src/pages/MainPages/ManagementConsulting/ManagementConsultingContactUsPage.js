import React, { useEffect } from "react";
import ManagementConsultingContactUs from "../../../components/Companies/ManagementConsulting/ManagementConsultingContactUs";

const ManagementConsultingContactUsPage = () => {
  useEffect(() => {
    document.title = "Contact Us - VRPI Management & Consulting";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ManagementConsultingContactUs />
    </div>
  );
};

export default ManagementConsultingContactUsPage;
