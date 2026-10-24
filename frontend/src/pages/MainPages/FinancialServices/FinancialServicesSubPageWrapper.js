import { useEffect } from "react";
import FinancialServicesSubPage from "../../../components/Companies/FinancialServices/FinancialServicesSubPage";

const FinancialServicesSubPageWrapper = () => {
  useEffect(() => {
    document.title = "Our Services - VRPI Financial Services";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FinancialServicesSubPage />
    </div>
  );
};

export default FinancialServicesSubPageWrapper;
