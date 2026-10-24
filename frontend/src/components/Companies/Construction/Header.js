import React from "react";
import styles from "./Header.module.css";
import logo from "../../../assets/vrpiLogo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={logo}
          alt="Logo"
          onClick={() => {
            navigate("/");
          }}
          title="Link to Home page"
        />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className={styles.quoteButton}>
        <button className={styles.quoteBtn}>Get a Quote</button>
      </div>
    </header>
  );
};

export default Header;
