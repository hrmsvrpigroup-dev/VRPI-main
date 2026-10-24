import { useEffect } from "react";
import CommingSoon from "../../../UI/ComingSoon/ComingSoon";

export default function Careers() {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Careers";
  }, []);
  return <CommingSoon show={true} />;
}
