import LocationData from "../../../data/LocationsData";
import style from "./Locations.module.css";

const Locations = () => {
  return (
    <div className={style.location}>
      <h1>Our Branch Locations</h1>
      <div className={style.locations}>
        {LocationData.map((location) => (
          <div className={style.locationCard} key={Math.random()}>
            <div className={style.contentLine}>
              <img
                src={require("../../../assets/footer/Location.png")}
                alt=""
              />
              <h2>{location.location}</h2>
            </div>
            <div className={style.contentLine}>
              <p>{location.address}</p>
            </div>
            <div className={style.contentLine}>
              <img src={require("../../../assets/footer/Call.png")} alt="" />

              <p>{location.mobile}</p>
            </div>
            <div className={style.contentLine}>
              <img src={require("../../../assets/footer/Email.png")} alt="" />

              <p>{location.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
