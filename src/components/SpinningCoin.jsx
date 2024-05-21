import React, { useState, useEffect } from "react";
import "../assets/styles/SpinningCoin.css";
import nfl from "../assets/images/nfl.png";
import mlb from "../assets/images/mlb.png";
import pga from "../assets/images/pga.png";
import falcons from "../assets/images/falcons.png";
import uefa from "../assets/images/uefa.png";
import sportsbettings from "../assets/images/sportsbetting.png";

const SpinningCoin = () => {
  const logos = [nfl, mlb, pga, falcons, uefa, sportsbettings];
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
      <img src={currentLogo} alt="spinning-coin logos" />
    </div>
  );
};

export default SpinningCoin;
