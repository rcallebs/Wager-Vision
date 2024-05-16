import React from "react";
import { Typography } from "@mui/material";

const BettingCalculator = ({ stakeAmount, odds, outcome }) => {
  const calculateWinnings = () => {
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
    if (odds >= 0) {
      return `+${odds}`;
    } else {
      return `${odds}`;
    }
  };

  const totalPayout = stakeAmount + calculateWinnings();

  return (
    <>
      <Typography variant="h6">Odds: {renderOdds()}</Typography>
      <Typography variant="h6">Wager: ${stakeAmount}</Typography>
      <Typography variant="h6">
        Potential Winnings: ${calculateWinnings()}
      </Typography>
      <Typography variant="h6">
        Total Payout:{" "}
        <span
          style={{
            textDecoration: outcome === "Loss" ? "line-through" : "none",
          }}
        >
          ${totalPayout.toFixed(2)}
        </span>
      </Typography>
    </>
  );
};

export default BettingCalculator;
