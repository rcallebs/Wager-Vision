import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBet = () => {
  let navigate = useNavigate();

  const [bet, setBet] = useState({
    pick: "",
    betType: "",
    odds: "",
    event: "",
    stakeAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBet((prevBet) => ({
      ...prevBet,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://wager-server-946d5db015ae.herokuapp.com/bets",
        bet
      );
      navigate("/bets");
      // setBet({
      //   pick: "",
      //   betType: "",
      //   odds: "",
      //   event: "",
      //   stakeAmount: "",
      // });
    } catch (error) {
      console.error("Error adding bet:", error);
    }
  };

  return (
    <div className="add-bet-container">
      <h2>Add New Bet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pick:
          <input
            type="text"
            name="pick"
            value={bet.pick}
            onChange={handleChange}
          />
        </label>
        <label>
          Event:
          <input
            type="text"
            name="event"
            value={bet.event}
            onChange={handleChange}
          />
        </label>
        <label>
          Odds:
          <input
            type="number"
            name="odds"
            value={bet.odds}
            onChange={handleChange}
          />
        </label>
        <label>
          Stake:
          <input
            type="number"
            name="stakeAmount"
            value={bet.stakeAmount}
            onChange={handleChange}
          />
        </label>
        {/* get all needed fields input before deleting */}
        <button type="submit">Submit Bet</button>
      </form>
    </div>
  );
};

export default AddBet;
