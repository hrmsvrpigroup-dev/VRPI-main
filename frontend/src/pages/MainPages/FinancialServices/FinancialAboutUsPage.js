import { useEffect } from "react";
import FinancialAboutUs from "../../../components/Companies/FinancialServices/FinancialAboutUs";

const FinancialAboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us - VRPI Financial Services";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FinancialAboutUs />
    </div>
  );
};

export default FinancialAboutUsPage;
