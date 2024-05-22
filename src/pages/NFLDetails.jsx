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
  const spreadMarket = draftKingsBookmaker?.markets.find(
    (market) => market.key === "spreads"
  );
  const formatOdds = (odds) => {
    if (odds > 0) {
      return `+${odds}`;
    }
    return `${odds}`;
  };

  const formatSpread = (spread) => {
    if (spread > 0) {
      return `+${spread}`;
    }
    return `${spread}`;
  };

  const awayTeamOdds = h2hMarket?.outcomes[0]?.price;
  const homeTeamOdds = h2hMarket?.outcomes[1]?.price;

  const awayTeamSpread = spreadMarket?.outcomes[0]?.point;
  const homeTeamSpread = spreadMarket?.outcomes[1]?.point;

  const formattedAwayTeamOdds = formatOdds(awayTeamOdds);
  const formattedHomeTeamOdds = formatOdds(homeTeamOdds);

  const formattedAwayTeamSpread = formatSpread(awayTeamSpread);
  const formattedHomeTeamSpread = formatSpread(homeTeamSpread);

  return (
    <div>
      <h2>Game Details</h2>
      <p>
        <EventTimeFormatter dateTimeString={matchDetails.commence_time} />
      </p>
      <p>
        {matchDetails.away_team} at {matchDetails.home_team}
      </p>
      <h3>Current Moneyline Odds</h3>
      {draftKingsBookmaker && h2hMarket ? (
        <div>
          <p>
            {matchDetails.away_team} to Win: {formattedAwayTeamOdds}
          </p>
          <p>
            {matchDetails.home_team} to Win: {formattedHomeTeamOdds}
          </p>
        </div>
      ) : (
        <p>Odds not available</p>
      )}
      <h3>Current Spread</h3>
      {draftKingsBookmaker && spreadMarket ? (
        <div>
          <p>
            {matchDetails.away_team} {formattedAwayTeamSpread}
          </p>
          <p>
            {matchDetails.home_team} {formattedHomeTeamSpread}
          </p>
        </div>
      ) : (
        <p>Spread not available</p>
      )}
    </div>
  );
}

export default NFLDetails;
