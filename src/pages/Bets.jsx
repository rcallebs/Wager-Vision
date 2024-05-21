import React, { useState, useEffect } from "react";
import axios from "axios";
import BetSlip from "../components/BetSlip";
import { Box, Typography, Grid } from "@mui/material";

const Bets = () => {
  const [bets, setBets] = useState([]);

  const fetchBets = async () => {
    const token = localStorage.getItem("token");
    let response = await axios.get(
      "https://wager-server-946d5db015ae.herokuapp.com/bets",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBets(response.data);
  };

  useEffect(() => {
    fetchBets();
  }, []);

  const openBets = bets.filter((bet) => bet.open);

  const styles = {
    container: {
      padding: "16px",
    },
    header: {
      marginBottom: "16px",
    },
  };

  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.header} textAlign="center">
        Open Bets
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {openBets.map((bet) => (
          <Grid item key={bet._id} xs={12} sm={6} md={4}>
            <BetSlip
              pick={bet.pick}
              betType={bet.betType}
              odds={bet.odds}
              event={bet.event}
              commenceTime={bet.commenceTime}
              betId={bet._id}
              outcome={bet.outcome}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Bets;
