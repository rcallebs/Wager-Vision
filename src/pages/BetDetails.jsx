import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BetDetails = () => {
  let { id } = useParams();
  const [bet, setBet] = useState([]);
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

  const calculateWinnings = () => {
    const { stakeAmount, odds } = bet;
    if (!stakeAmount || !odds) return 0;
    let winnings;
    if (odds < 0) {
      winnings = stakeAmount * (100 / Math.abs(odds));
    } else {
      winnings = stakeAmount * (odds / 100);
    }
    return parseFloat(winnings.toFixed(2));
  };

  const renderOdds = () => {
    if (bet.odds > 0) {
      return `+${bet.odds}`;
    } else bet.odds < 0;
    return `${bet.odds}`;
  };

  console.log(bet.commenceTime);

  const handleOutcome = () => {
    setIsOpen(false);
  };

  return (
    <div className="bet-details container">
      <div className="bet-details info">
        <h1>{bet.pick}</h1>
        <h2>{bet.event}</h2>
        <h2>Scheduled Start: {formatDateTime(bet.commenceTime)}</h2>
        <h3>Odds: {renderOdds()}</h3>
        <h3>Wager: ${bet.stakeAmount}</h3>
        <h3> Potential Winnings: ${calculateWinnings()}</h3>
        <h3>
          Total Payout: ${(bet.stakeAmount + calculateWinnings()).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default BetDetails;
