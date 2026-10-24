import { useEffect } from "react";
import CustomKnowledgeHubComponent from "../../components/KnowledgeHub/CustomKnowledgeHubComponent";
import { InternshipsData } from "../../data/InternshipsData";

export default function Internships() {
  useEffect(() => {
    document.title = "Internships";
  });
  return (
    <CustomKnowledgeHubComponent
      data={InternshipsData}
      backgroundImage="intershipPageBackground.jpg"
    />
  );
}
