import React from "react";
import { Link } from "react-router-dom";

const BetSlip = ({ pick, event, odds, betId, betType }) => {
  const renderOdds = () => {
    if (odds >= 0) {
      return `+${odds}`;
    } else {
      return `${odds}`;
    }
  };

  return (
    <Link to={`${betId}`}>
      <div className="bet-slip">
        <h3 className="slip-event">{event}</h3>
        <h3 className="slip-pick">
          Pick: {pick} - {betType}
        </h3>
        <h4 className="slip-odds">Odds: {renderOdds()}</h4>
      </div>
    </Link>
  );
};

export default BetSlip;
