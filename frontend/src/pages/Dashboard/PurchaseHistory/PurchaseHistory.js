import { useEffect } from "react";
import PurchaseHistoryComponent from "../../../components/Dashboard/PurchaseHistoryComponent/PurchaseHistoryComponent";
import style from "./PurchaseHistory.module.css";

const PurchaseHistory = () => {
  useEffect(() => {
    document.title = "Purchase History";
  });
  return <PurchaseHistoryComponent />;
};

export default PurchaseHistory;
