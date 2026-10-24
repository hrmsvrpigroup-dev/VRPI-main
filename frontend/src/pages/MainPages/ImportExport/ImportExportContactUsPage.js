import React, { useEffect } from "react";
import ImportExportContactUs from "../../../components/Companies/ImportExport/ImportExportContactUs";

const ImportExportContactUsPage = () => {
  useEffect(() => {
    document.title = "Contact Us - VRPI Import & Export";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ImportExportContactUs />
    </div>
  );
};

export default ImportExportContactUsPage;
