import { useEffect } from "react";
import FinancialContent from "../../../components/Companies/FinancialServices/FinancialContent";

const FinancialServices = () => {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Financial Services";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FinancialContent />
    </div>
  );
};

export default FinancialServices;
