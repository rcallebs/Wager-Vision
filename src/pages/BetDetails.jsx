import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BettingCalculator from "../components/BettingCalculator";
import EventTimeFormatter from "../components/EventTimeFormatter";
import CloseButton from "../components/CloseButton";
import { Paper, Box, Typography, Container } from "@mui/material";

const BetDetails = () => {
  let { id } = useParams();
  let [bet, setBet] = useState(null);
  const [open, setOpen] = useState(true);
  const [outcome, setOutcome] = useState(null);

  const fetchBet = async () => {
    const token = localStorage.getItem("token");
    let response = await axios.get(
      `https://wager-server-946d5db015ae.herokuapp.com/bets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBet(response.data);
    setOpen(response.data.open);
    setOutcome(response.data.outcome);
  };

  useEffect(() => {
    fetchBet();
  }, [id]);

  if (!bet) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {bet.event}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {bet.pick} - {bet.betType}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Scheduled Start:{" "}
            <EventTimeFormatter dateTimeString={bet.commenceTime} />
          </Typography>
          <Box sx={{ marginY: 2 }}>
            <BettingCalculator stakeAmount={bet.stakeAmount} odds={bet.odds} />
          </Box>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          {open ? (
            <CloseButton id={id} setOpen={setOpen} setOutcome={setOutcome} />
          ) : (
            <Typography variant="body1">
              Bet closed - Outcome: {outcome}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default BetDetails;
