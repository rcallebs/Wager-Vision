// import React from "react";

// const MatchDetails = ({ isOpen, match, onClose }) => {
//   return (
//     <div
//       className={`modal ${isOpen ? "show" : ""}`}
//       tabIndex="-1"
//       role="dialog"
//     >
//       {/* Modal Content */}
//     </div>
//   );
// };

// export default MatchDetails;
import React from "react";

const MatchDetails = ({ isOpen, match, onClose }) => {
  if (!match) {
    return null; // Return null if match is not available
  }

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Match Details</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Home Team:</strong> {match.home_team}
            </p>
            <p>
              <strong>Away Team:</strong> {match.away_team}
            </p>
            <p>
              <strong>Commence Time:</strong>{" "}
              {new Date(match.commence_time).toLocaleString()}
            </p>
            <h6>Betting Lines (FanDuel)</h6>
            <ul>
              {match.bookmakers.map((bookmaker) => (
                <li key={bookmaker.key}>
                  {bookmaker.title}:{" "}
                  {bookmaker.markets[0].outcomes
                    .map((outcome) => `${outcome.name}: ${outcome.price}`)
                    .join(", ")}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
