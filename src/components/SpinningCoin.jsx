import React, { useState, useEffect } from "react";
import "../assets/styles/SpinningCoin.css";

import nfl from "../assets/images/nfl.png";
import mlb from "../assets/images/mlb.png";
import sportsbettings from "../assets/images/sportsbetting.png";

const SpinningCoin = () => {
  const [speed] = useState(3);
  const [logos] = useState([nfl, mlb, sportsbettings]);
  const [currentLogo, setCurrentLogo] = useState(nfl);
  const [logoIndex, setLogoIndex] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    // change logo at an interval
    const logoInterval = setInterval(() => {
      setSpinCount((prevCount) => prevCount + 1);

      if (spinCount >= 2) {
        setLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
        setSpinCount(0); // teset spin count
      }
    }, 1000); // change the logo every second

    return () => clearInterval(logoInterval);
  }, [logos.length, spinCount]);

  useEffect(() => {
    setCurrentLogo(logos[logoIndex]);
  }, [logoIndex, logos]);

  return (
    <div className="spinning-coin">
      <img src={currentLogo} alt="Spinning coin" />
    </div>
  );
};

export default SpinningCoin;
