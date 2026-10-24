import React, { useEffect } from "react";
import ManagementConsultingServices from "../../../components/Companies/ManagementConsulting/ManagementConsultingServices";

const ManagementConsultingServicesPage = () => {
  useEffect(() => {
    document.title = "Services - VRPI Management & Consulting";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ManagementConsultingServices />
    </div>
  );
};

export default ManagementConsultingServicesPage;
