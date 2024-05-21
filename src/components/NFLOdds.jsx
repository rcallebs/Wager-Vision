import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchCard from "../components/MatchCard";
import MatchDetails from "../components/MatchDetails";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function NFLOdds() {
  const [odds, setOdds] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(
          `https://wager-server-946d5db015ae.herokuapp.com/api/odds/nfl`,
          {
            params: {
              sportKey: "americanfootball_nfl",
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
    navigate(`/nfl/${match.id}`);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
  };

  const groupMatchesByDate = (matches) => {
    const groupedMatches = matches.reduce((acc, match) => {
      const date = format(new Date(match.commence_time), "MM-dd-yyyy");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
      return acc;
    }, {});
    return groupedMatches;
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Upcoming NFL Games</h2>
      {isFetching && <p>Loading...</p>}
      {!isFetching && odds && (
        <div className="container">
          {Object.entries(groupMatchesByDate(odds)).map(([date, matches]) => (
            <div key={date}>
              <h3>{date}</h3>
              <div className="row">
                {matches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onClick={() => handleMatchClick(match)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NFLOdds;
