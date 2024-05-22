import React from "react";
import { Typography } from "@mui/material";

const LossStats = ({ totalLoss }) => {
  const formattedTotalLoss = totalLoss.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <Typography variant="body1">Total Losses: {formattedTotalLoss}</Typography>
  );
};

export default LossStats;
