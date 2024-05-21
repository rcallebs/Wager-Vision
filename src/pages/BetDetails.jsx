import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BettingCalculator from "../components/BettingCalculator";
import EventTimeFormatter from "../components/EventTimeFormatter";
import CloseButton from "../components/CloseButton";
import { Paper, Box, Typography, Container, Button } from "@mui/material";

const BetDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [bet, setBet] = useState(null);
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

  const getBackgroundColor = () => {
    if (outcome === "Win") {
      return "rgba(0, 255, 0, 0.1)";
    } else if (outcome === "Loss") {
      return "rgba(255, 0, 0, 0.1)";
    }
    return "#ffffff";
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://wager-server-946d5db015ae.herokuapp.com/bets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/bets");
    } catch (error) {
      console.error("Error deleting bet", error);
    }
  };

  if (!bet) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 3, backgroundColor: getBackgroundColor() }}
      >
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
            <BettingCalculator
              stakeAmount={bet.stakeAmount}
              odds={bet.odds}
              outcome={outcome}
            />
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
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Remove Bet from History
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BetDetails;
