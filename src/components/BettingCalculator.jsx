import React from "react";

const BettingCalculator = ({ stakeAmount, odds }) => {
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

  return (
    <>
      <h3>Odds: {renderOdds()}</h3>
      <h3>Wager: ${stakeAmount}</h3>
      <h3>Potential Winnings: ${calculateWinnings()}</h3>
      <h3>Total Payout: ${(stakeAmount + calculateWinnings()).toFixed(2)}</h3>
    </>
  );
};

export default BettingCalculator;
