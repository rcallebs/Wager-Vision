import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Box, Typography, Container } from "@mui/material";

const BetStats = () => {
  let { id } = useParams();
  const [betStats, setBetStats] = useState(null);

  const fetchBetStats = async () => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.get(
        `https://wager-server-946d5db015ae.herokuapp.com/history/betStats/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBetStats(response.data);
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  useEffect(() => {
    fetchBetStats();
  }, [id]);

  if (!betStats) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Bet Statistics</Typography>
      <Typography>Total Bets: {betStats.totalBets}</Typography>
      <Typography>Total Stake: {betStats.totalStake}</Typography>
      <Typography>Total Winnings: {betStats.totalWinnings}</Typography>
      <Typography>Profit: {betStats.profit}</Typography>
    </div>
  );
};

export default BetStats;
