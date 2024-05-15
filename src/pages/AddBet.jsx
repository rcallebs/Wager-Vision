import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, Typography } from "@mui/material";

const AddBet = () => {
  let navigate = useNavigate();

  const [bet, setBet] = useState({
    pick: "",
    betType: "",
    odds: "",
    event: "",
    stakeAmount: "",
    open: true,
  });

  const handleChange = (e) => {
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
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
        />
        <TextField
          label="Event"
          name="event"
          value={bet.event}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Odds"
          name="odds"
          type="number"
          value={bet.odds}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stake"
          name="stakeAmount"
          type="number"
          value={bet.stakeAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
    </Container>
  );
};
//   return (
//     <div className="add-bet-container">
//       <h2>Add New Bet</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Pick:
//           <input
//             type="text"
//             name="pick"
//             value={bet.pick}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Event:
//           <input
//             type="text"
//             name="event"
//             value={bet.event}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Odds:
//           <input
//             type="number"
//             name="odds"
//             value={bet.odds}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Stake:
//           <input
//             type="number"
//             name="stakeAmount"
//             value={bet.stakeAmount}
//             onChange={handleChange}
//           />
//         </label>
//         {/* get all needed fields input before deleting */}
//         <button type="submit">Submit Bet</button>
//       </form>
//     </div>
//   );
// };

export default AddBet;
