import style from "./MainScreen.module.css";

const MainScreen = () => {
  return (
    <div className={style.mainScreen}>
      <div className={style.aboutUsImage1}>
        <img src={require("../../../assets/aboutus/AboutUs1.png")} alt=""></img>
      </div>
      <div className={style.mainContent}>
        <h1>WHO WE ARE?</h1>
        <p>
          "<span className={style.highlight}>VR PI Group of Companies</span> is
          a dynamic and innovative organization specializing in industry . With
          a strong focus on innovative software technology, we are committed to
          delivering exceptional services while fostering a culture of
          creativity, inclusivity, and excellence in all endeavors.". Through
          our dedication to integrity, innovation & collabration. we aim to
          drive growth, create value, and make a positive impact in our industry
          and community."
        </p>
        {/* <ul>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
        </ul> */}
      </div>
    </div>
  );
};

export default MainScreen;
