import React from "react";

const MatchCard = ({ match, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(match)}>
      <div className="card-body">
        <h5 className="card-title">{`${match.home_team} vs ${match.away_team}`}</h5>
      </div>
    </div>
  );
};

export default MatchCard;
