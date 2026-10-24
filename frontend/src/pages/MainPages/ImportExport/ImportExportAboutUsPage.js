import React, { useEffect } from "react";
import ImportExportAboutUs from "../../../components/Companies/ImportExport/ImportExportAboutUs";

const ImportExportAboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us - VRPI Import & Export";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ImportExportAboutUs />
    </div>
  );
};

export default ImportExportAboutUsPage;
