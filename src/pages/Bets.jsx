import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BetSlip from "../components/BetSlip";
import AddBet from "./AddBet";

const Bets = () => {
  const [bets, setBets] = useState([]);

  const fetchBets = async () => {
    console.log("fetching bets");
    let response = await axios.get(
      "https://wager-server-946d5db015ae.herokuapp.com/bets"
    );
    setBets(response.data);
  };

  useEffect(() => {
    fetchBets();
  }, []);

  const sports = [...new Set(bets.map((bet) => bet.sport))];

  return (
    <div className="bet-container">
      <h1 className="betslip">Open Bets</h1>
      {/*  */}
      <div className="bet-details">
        {bets.map((bet) => (
          <div key={bet._id}>
            <BetSlip
              pick={bet.pick}
              betType={bet.betType}
              odds={bet.odds}
              event={bet.event}
              betId={bet._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bets;
