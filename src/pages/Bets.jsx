import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Bets = () => {
  const [bets, setBets] = useState([]);

  const fetchBets = async () => {
    let response = await axios.get(
      "https://wager-server-946d5db015ae.herokuapp.com/bets"
    );
    setBets(response.data);
  };

  useEffect(() => {
    fetchBets();
  }, []);

  return (
    <div className="bet-container">
      <h1 className="betslip">Open Bets</h1>
      <div className="bet-details">
        {bets.map((bet) => (
          <h4 key={bet._id}>{bet.event}</h4>
        ))}
      </div>
    </div>
  );
};

export default Bets;
