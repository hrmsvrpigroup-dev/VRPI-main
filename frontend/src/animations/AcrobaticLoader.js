import React from "react";
import style from "./AcrobaticLoader.module.css";

const AcrobaticLoader = () => {
  return (
    <div className={style.loader}>
      {/* <div className={style.center}> */}
      <div className={style.box}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={style["loader div"]}
            style={{
              animationDelay: `${index*(0.2)}s`,
            }}
          ></div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default AcrobaticLoader;
