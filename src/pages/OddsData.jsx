import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchCard from "../components/MatchCard";
import MatchDetails from "../components/MatchDetails";

function OddsData() {
  const [odds, setOdds] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(
          `https://wager-server-946d5db015ae.herokuapp.com/api/odds`,
          {
            params: {
              sportKey: "upcoming",
              regions: "us",
              markets: "h2h",
              oddsFormat: "american",
              dateFormat: "iso",
            },
          }
        );
        setOdds(response.data);
      } catch (error) {
        setError("Error fetching odds. Please try again later.");
        console.error("Error fetching odds:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchOdds();
  }, []);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Upcoming Games</h2>
      {isFetching && <p>Loading...</p>}
      {!isFetching && odds && (
        <div className="container">
          <div className="row">
            {odds.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onClick={handleMatchClick}
              />
            ))}
          </div>
          {selectedMatch && (
            <MatchDetails
              isOpen={selectedMatch !== null}
              match={selectedMatch}
              onClose={handleCloseModal}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default OddsData;
