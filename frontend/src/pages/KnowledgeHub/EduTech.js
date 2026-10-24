import { useEffect } from "react";
import CustomKnowledgeHubComponent from "../../components/KnowledgeHub/CustomKnowledgeHubComponent";
import { EduTechData } from "../../data/EduTechData";
export default function EduTech() {
  useEffect(() => {
    document.title = "Edutech";
  });

  return (
    <CustomKnowledgeHubComponent
      data={EduTechData}
      backgroundImage="edutechPageBackground.jpeg"
    />
  );
}
