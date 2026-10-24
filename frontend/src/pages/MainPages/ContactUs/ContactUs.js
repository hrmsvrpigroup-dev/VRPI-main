import ContactUsForm from "../../../components/ContactUs/ContactForm/ContactUsForm";
import style from "./ContactUs.module.css";
import Locations from "../../../components/ContactUs/Locations/Locations";
import { useEffect } from "react";

export default function ContactUs() {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Contact Us";
  }, []);
  return (
    <div className={style.ContactUs}>
      <div className={style.formSection}>
        <h1>Get in Touch</h1>
        {/* <div className={style.form}>
          <img src={require(`../../../assets/contactUs1.png`)} alt="" /> */}
        <ContactUsForm />
        {/* </div> */}
      </div>
      <Locations />
    </div>
  );
}
