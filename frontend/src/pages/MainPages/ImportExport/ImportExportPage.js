import React, { useEffect } from "react";
import Content from "../../../components/Companies/ImportExport/Content";

const ImportExportPage = () => {
  useEffect(() => {
    document.title = "Import & Export Services - VRPI Group";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Content />
    </div>
  );
};

export default ImportExportPage;
