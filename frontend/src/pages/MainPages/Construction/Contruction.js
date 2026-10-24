import { useEffect } from "react";
import Content from "../../../components/Companies/Construction/Content";

const Construction = () => {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Construction";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Content />
    </div>
  );
};

export default Construction;
