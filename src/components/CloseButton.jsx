import React, { useEffect } from "react";
import axios from "axios";

const CloseButton = ({ id, setOpen, setOutcome }) => {
  useEffect(() => {
    const savedOpenState = localStorage.getItem(`bet-${id}-open`);
    const savedOutcome = localStorage.getItem(`bet-${id}-outcome`);
    if (savedOpenState !== null) {
      setOpen(JSON.parse(savedOpenState));
    }
    if (savedOutcome !== null) {
      setOutcome(savedOutcome);
    }
  }, [id, setOpen, setOutcome]);

  const handleOutcome = async (outcome) => {
    setOpen(false);
    setOutcome(outcome);

    localStorage.setItem(`bet-${id}-open`, JSON.stringify(false));
    localStorage.setItem(`bet-${id}-outcome`, outcome);

    try {
      await axios.put(
        `https://wager-server-946d5db015ae.herokuapp.com/bets/${id}`,
        {
          open: false,
          outcome: outcome,
        }
      );
    } catch (error) {
      console.error("Error updating bet:", error);
    }
  };

  return (
    <div>
      <button onClick={() => handleOutcome("Win")}>Set as Win</button>
      <button onClick={() => handleOutcome("Loss")}>Set as Loss</button>
    </div>
  );
};

export default CloseButton;
