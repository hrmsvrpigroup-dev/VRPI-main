import { useEffect } from "react";
import FinancialContactUsSubPage from "../../../components/Companies/FinancialServices/FinancialContactUsSubPage";

const FinancialContactUsSubPageWrapper = () => {
  useEffect(() => {
    document.title = "Contact Us - VRPI Financial Services";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FinancialContactUsSubPage />
    </div>
  );
};

export default FinancialContactUsSubPageWrapper;
