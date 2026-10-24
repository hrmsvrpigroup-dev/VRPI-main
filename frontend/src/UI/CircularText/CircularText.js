import React, { useEffect } from "react";
import style from "./CircularText.module.css";

const CircularText = ({ text, width }) => {
  useEffect(() => {
    const nameInCircle = document.getElementById("nameInCircle");
    const radius = nameInCircle.offsetWidth / 3; // Adjust the divisor to control the radius
    const characters = text.split("");
    const angleStep = 360 / characters.length;

    nameInCircle.innerHTML = "";
    characters.forEach((char, index) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      const angle = angleStep * index;
      const radians = (angle - 90) * (Math.PI / 180);
      const x = radius * Math.cos(radians); // Adjusted for correct positioning
      const y = radius * Math.sin(radians); // Adjusted for correct positioning
      charSpan.style.transform = `translate(${x}px, ${y}px)`;
      nameInCircle.appendChild(charSpan);
    });
  }, [text]);

  return (
    <div
      id="nameInCircle"
      className={style.nameInCircle}
      style={{ width: width }}
    >
      {text}
    </div>
  );
};

export default CircularText;
