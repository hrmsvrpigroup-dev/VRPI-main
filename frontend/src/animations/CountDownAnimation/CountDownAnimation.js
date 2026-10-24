import React, { useState, useEffect } from "react";
import styles from "./CountDownAnimation.module.css";

const CountDownAnimation = ({ endNumber, time }) => {
  const [count, setCount] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const intervalTime = (time / endNumber) * 1000;
    if (count >= endNumber) {
      setReachedEnd(true);
    }
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < endNumber) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [endNumber, time, count]);

  return (
    <div
      className={`${styles.countdownAnimation} ${
        reachedEnd ? styles.blink : ""
      }`}
    >
      {count}
    </div>
  );
};

export default CountDownAnimation;
