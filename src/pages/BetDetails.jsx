import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BettingCalculator from "../components/BettingCalculator";

const BetDetails = () => {
  let { id } = useParams();
  let [bet, setBet] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const fetchBet = async () => {
    let response = await axios.get(
      `https://wager-server-946d5db015ae.herokuapp.com/bets/${id}`
    );
    setBet(response.data);
  };

  useEffect(() => {
    fetchBet();
    console.log(bet.commenceTime);
  }, []);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    const dateTime = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    };

    return new Intl.DateTimeFormat("en-US", options).format(dateTime);
  };

  const handleOutcome = () => {
    setIsOpen(false);
  };

  return (
    <div className="bet-details container">
      <div className="bet-details info">
        <h1>{bet.event}</h1>
        <h1>
          {bet.pick} - {bet.betType}
        </h1>
        <h2>Scheduled Start: {formatDateTime(bet.commenceTime)}</h2>
        <BettingCalculator stakeAmount={bet.stakeAmount} odds={bet.odds} />
      </div>
    </div>
  );
};

export default BetDetails;
