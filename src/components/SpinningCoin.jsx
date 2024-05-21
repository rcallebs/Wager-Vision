import React, { useState, useEffect } from "react";
import "../assets/styles/SpinningCoin.css";
import nfl from "../assets/images/nfl.png";
import mlb from "../assets/images/mlb.png";
import sportsbettings from "../assets/images/sportsbetting.png";

const SpinningCoin = () => {
  const logos = [nfl, mlb, sportsbettings];
  const [currentLogo, setCurrentLogo] = useState(nfl);
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000);

    return () => clearInterval(logoInterval);
  }, [logos]);

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
