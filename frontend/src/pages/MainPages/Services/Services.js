import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Services";
  }, []);
  return <div>Services</div>;
}
