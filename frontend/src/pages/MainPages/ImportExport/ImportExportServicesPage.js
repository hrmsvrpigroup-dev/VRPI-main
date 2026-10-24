import React, { useEffect } from "react";
import ImportExportServices from "../../../components/Companies/ImportExport/ImportExportServices";

const ImportExportServicesPage = () => {
  useEffect(() => {
    document.title = "Services - VRPI Import & Export";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ImportExportServices />
    </div>
  );
};

export default ImportExportServicesPage;
