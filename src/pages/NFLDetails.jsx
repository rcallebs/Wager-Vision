import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EventTimeFormatter from "../components/EventTimeFormatter";

function NFLDetails() {
  const { id } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(
          `https://wager-server-946d5db015ae.herokuapp.com/api/odds/nfl/${id}`
        );
        setMatchDetails(response.data);
      } catch (error) {
        setError("Error fetching match details. Please try again later.");
        console.error("Error fetching match details:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!matchDetails) {
    return <p>No match details available.</p>;
  }

  const draftKingsBookmaker = matchDetails.bookmakers.find(
    (bookmaker) => bookmaker.key === "draftkings"
  );
  const h2hMarket = draftKingsBookmaker?.markets.find(
    (market) => market.key === "h2h"
  );
  const awayTeamOdds = h2hMarket?.outcomes[0]?.price;
  const homeTeamOdds = h2hMarket?.outcomes[1]?.price;

  return (
    <div>
      <h2>Game Details</h2>
      <p>
        Match Time:{" "}
        <EventTimeFormatter dateTimeString={matchDetails.commence_time} />
      </p>
      <p>
        Away Team: {matchDetails.away_team} @ {matchDetails.home_team}
      </p>
      <h3>Moneyline Odds</h3>
      {draftKingsBookmaker && h2hMarket ? (
        <div>
          <p>
            {matchDetails.away_team} to Win: {awayTeamOdds}
          </p>
          <p>
            {matchDetails.home_team} to Win: {homeTeamOdds}
          </p>
        </div>
      ) : (
        <p>Odds not available</p>
      )}
    </div>
  );
}

export default NFLDetails;
