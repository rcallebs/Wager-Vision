import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";

const BetSlip = ({ pick, event, odds, betId, betType }) => {
  const renderOdds = () => (odds >= 0 ? `+${odds}` : `${odds}`);

  const styles = {
    link: {
      textDecoration: "none",
      color: "inherit",
      display: "block",
      margin: "0 auto",
      maxWidth: "400px",
    },
    paper: {
      padding: "16px",
      margin: "8px",
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    },
    detail: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
  };

  return (
    <Link to={`${betId}`} style={styles.link}>
      <Paper style={styles.paper}>
        <Box style={styles.detail}>
          <Typography variant="h6">Event:</Typography>
          <Typography variant="h6">{event}</Typography>
        </Box>
        <Box style={styles.detail}>
          <Typography variant="body1">Pick:</Typography>
          <Typography variant="body1">
            {pick} - {betType}
          </Typography>
        </Box>
        <Box style={styles.detail}>
          <Typography variant="body2">Odds:</Typography>
          <Typography variant="body2">{renderOdds()}</Typography>
        </Box>
      </Paper>
    </Link>
  );
};

export default BetSlip;
