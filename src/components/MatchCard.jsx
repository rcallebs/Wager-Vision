import React from "react";
import ShortDate from "./ShortDate";

const MatchCard = ({ match, onClick, className }) => {
  return (
    <div className={`match-card ${className}`} onClick={() => onClick(match)}>
      <div className="card-body">
        <p className="matchcard-time">
          <ShortDate dateTimeString={match.commence_time} />
        </p>
        <h5 className="card-title">{`${match.home_team} vs ${match.away_team}`}</h5>
      </div>
    </div>
  );
};

export default MatchCard;
