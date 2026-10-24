import { useEffect } from "react";

export default function Companies() {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Companies";
  }, []);

  return <div>Companies</div>;
}
