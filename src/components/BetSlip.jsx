import React from "react";
import { Link } from "react-router-dom";

const BetSlip = ({ pick, event, odds, betId }) => {
  return (
    <Link to={`${betId}`}>
      <div className="bet-slip">
        <h3 className="slip-event">{event}</h3>
        <h3 className="slip-pick">Pick: {pick}</h3>
        <h4 className="slip-odds">Odds: {odds}</h4>
      </div>
    </Link>
  );
};

export default BetSlip;
