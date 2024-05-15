import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BettingCalculator from "../components/BettingCalculator";
import EventTimeFormatter from "../components/EventTimeFormatter";
import CloseButton from "../components/CloseButton";

const BetDetails = () => {
  let { id } = useParams();
  let [bet, setBet] = useState([]);
  const [open, setOpen] = useState(true);
  const [outcome, setOutcome] = useState(null);

  const fetchBet = async () => {
    const token = localStorage.getItem("token");
    let response = await axios.get(
      `https://wager-server-946d5db015ae.herokuapp.com/bets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBet(response.data);
    setOpen(response.data.open);
    setOutcome(response.data.outcome);
  };

  useEffect(() => {
    fetchBet();
  }, [id]);

  if (bet === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bet-details container">
      <div className="bet-details info">
        <h1>{bet.event}</h1>
        <h1>
          {bet.pick} - {bet.betType}
        </h1>
        <h2>
          Scheduled Start:{" "}
          <EventTimeFormatter dateTimeString={bet.commenceTime} />
        </h2>
        <BettingCalculator stakeAmount={bet.stakeAmount} odds={bet.odds} />
      </div>
      <div className="close-bet">
        {open ? (
          <CloseButton id={id} setOpen={setOpen} setOutcome={setOutcome} />
        ) : (
          <div>Bet closed - Outcome: {outcome}</div>
        )}
      </div>
    </div>
  );
};

export default BetDetails;
