import React from "react";
import { Typography } from "@mui/material";

const WinningStats = ({ totalWinnings }) => {
  const formattedTotalWinnings = totalWinnings.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Typography variant="body1">
      Total Winnings: {formattedTotalWinnings}
    </Typography>
  );
};

export default WinningStats;
