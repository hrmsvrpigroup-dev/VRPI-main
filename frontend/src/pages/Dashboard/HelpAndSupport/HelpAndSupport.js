import { useEffect } from "react";
import HelpAndSupportComponent from "../../../components/Dashboard/HelpAndSupportComponent/HelpAndSupportComponent";
import style from "./HelpAndSupport.module.css";

const HelpAndSupport = () => {
  useEffect(() => {
    document.title = "Purchase History";
  });

  return <HelpAndSupportComponent />;
};

export default HelpAndSupport;
