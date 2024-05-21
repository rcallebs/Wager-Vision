import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

const AddBet = () => {
  let navigate = useNavigate();

  const [bet, setBet] = useState({
    pick: "",
    betType: "",
    odds: "",
    event: "",
    stakeAmount: "",
    commenceTime: "",
    open: true,
    spread: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBet((prevBet) => ({
      ...prevBet,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setBet((prevBet) => ({
      ...prevBet,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://wager-server-946d5db015ae.herokuapp.com/bets",
        bet,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/bets");
    } catch (error) {
      console.error("Error adding bet:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Enter Details Below
          </Typography>
          <TextField
            label="Pick"
            name="pick"
            value={bet.pick}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Event"
            name="event"
            value={bet.event}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: bet.betType === "spread" ? "1fr 1fr" : "1fr",
              gap: 2,
              width: "100%",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="betType">Bet Type</InputLabel>
              <Select
                labelId="betType"
                name="betType"
                value={bet.betType}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="ml">Moneyline</MenuItem>
                <MenuItem value="spread">Spread</MenuItem>
              </Select>
            </FormControl>
            {bet.betType === "spread" && (
              <TextField
                label="Spread"
                name="spread"
                type="number"
                value={bet.spread}
                onChange={handleChange}
                fullWidth
                required
              />
            )}
          </Box>
          <TextField
            label="Odds"
            name="odds"
            type="number"
            value={bet.odds}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Stake"
            name="stakeAmount"
            type="number"
            value={bet.stakeAmount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            sx={{ marginTop: "16px", marginBottom: "8px" }}
            label="Start Time"
            name="commenceTime"
            type="datetime-local"
            value={bet.commenceTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Submit Bet
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBet;
