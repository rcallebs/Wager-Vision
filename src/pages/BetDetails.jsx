import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BettingCalculator from "../components/BettingCalculator";
import EventTimeFormatter from "../components/EventTimeFormatter";
import CloseButton from "../components/CloseButton";
import {
  Paper,
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const BetDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [bet, setBet] = useState(null);
  const [open, setOpen] = useState(true);
  const [outcome, setOutcome] = useState(null);
  const [editingField, setEditingField] = useState(null);

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

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async (field) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://wager-server-946d5db015ae.herokuapp.com/bets/${id}`,
        { [field]: bet[field] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingField(null);
      fetchBet();
    } catch (error) {
      console.error(`Error updating ${field}`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBet((prevBet) => ({
      ...prevBet,
      [name]: value,
    }));
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {editingField === "event" ? (
            <TextField
              label="Event"
              name="event"
              value={bet.event}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            <Typography variant="h4" gutterBottom>
              Event: {bet.event}
            </Typography>
          )}
          <IconButton onClick={() => handleEdit("event")}>
            <EditIcon />
          </IconButton>
          {editingField === "event" && (
            <IconButton onClick={() => handleSave("event")}>
              <SaveIcon />
            </IconButton>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {editingField === "pick" ? (
            <TextField
              label="Pick"
              name="pick"
              value={bet.pick}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            <Typography variant="h5" gutterBottom>
              Pick: {bet.pick}
            </Typography>
          )}
          <IconButton onClick={() => handleEdit("pick")}>
            <EditIcon />
          </IconButton>
          {editingField === "pick" && (
            <IconButton onClick={() => handleSave("pick")}>
              <SaveIcon />
            </IconButton>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {editingField === "betType" ? (
            <FormControl fullWidth>
              <InputLabel id="betType">Bet Type</InputLabel>
              <Select
                labelId="betType"
                name="betType"
                value={bet.betType}
                onChange={handleChange}
              >
                <MenuItem value="ml">Moneyline</MenuItem>
                <MenuItem value="spread">Spread</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography variant="h5" gutterBottom>
              Type: {bet.betType}
            </Typography>
          )}
          <IconButton onClick={() => handleEdit("betType")}>
            <EditIcon />
          </IconButton>
          {editingField === "betType" && (
            <IconButton onClick={() => handleSave("betType")}>
              <SaveIcon />
            </IconButton>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {editingField === "commenceTime" ? (
            <TextField
              label="Start Time"
              name="commenceTime"
              type="datetime-local"
              value={bet.commenceTime}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <Typography variant="h6" gutterBottom>
              Scheduled Start:{" "}
              <EventTimeFormatter dateTimeString={bet.commenceTime} />
            </Typography>
          )}
          <IconButton onClick={() => handleEdit("commenceTime")}>
            <EditIcon />
          </IconButton>
          {editingField === "commenceTime" && (
            <IconButton onClick={() => handleSave("commenceTime")}>
              <SaveIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ marginY: 2 }}>
          <BettingCalculator
            stakeAmount={bet.stakeAmount}
            odds={bet.odds}
            outcome={outcome}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
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
