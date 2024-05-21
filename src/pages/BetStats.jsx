import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Modal } from "@mui/material";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import WinningStats from "../components/WinningStats";
import LossStats from "../components/LossStats";

ChartJS.register(ArcElement, Tooltip, Legend);

const BetStats = () => {
  const [bets, setBets] = useState([]);
  const [stats, setStats] = useState({
    totalBets: 0,
    openBets: 0,
    closedBets: 0,
    totalStakeClosedBets: 0,
    totalWinningsClosedWinBets: 0,
    totalLoss: 0,
    totalStakeOpenBets: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const fetchBets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://wager-server-946d5db015ae.herokuapp.com/bets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBets(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error("Error fetching bets", error);
    }
  };

  const calculateStats = (bets) => {
    const totalBets = bets.length;
    const openBets = bets.filter((bet) => bet.open).length;
    const closedBets = totalBets - openBets;
    const totalStakeOpenBets = bets
      .filter((bet) => bet.open)
      .reduce((sum, bet) => sum + bet.stakeAmount, 0);
    const totalStakeClosedBets = bets
      .filter((bet) => !bet.open)
      .reduce((sum, bet) => sum + bet.stakeAmount, 0);
    const totalWinningsClosedWinBets = bets
      .filter((bet) => !bet.open && bet.outcome === "Win")
      .reduce(
        (sum, bet) => sum + calculateWinnings(bet.stakeAmount, bet.odds),
        0
      );
    const totalLoss = bets
      .filter((bet) => !bet.open && bet.outcome === "Loss")
      .reduce((sum, bet) => sum + bet.stakeAmount, 0);

    setStats({
      totalBets,
      openBets,
      closedBets,
      totalStakeClosedBets,
      totalWinningsClosedWinBets,
      totalLoss,
      totalStakeOpenBets,
    });
  };

  const calculateWinnings = (stakeAmount, odds) => {
    if (odds < 0) {
      return stakeAmount * (100 / Math.abs(odds));
    } else {
      return stakeAmount * (odds / 100);
    }
  };

  useEffect(() => {
    fetchBets();
  }, []);

  const handlePieClick = (elements) => {
    if (elements.length > 0) {
      const { index } = elements[0];

      if (index === 1) {
        setModalContent(
          `Total Stake for Closed Bets: ${stats.totalStakeClosedBets.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )}`
        );
      } else if (index === 0) {
        setModalContent(
          `Total Stake for Open Bets: ${stats.totalStakeOpenBets.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )}`
        );
      }

      setModalOpen(true);
    }
  };

  const pieDataTotalBets = {
    labels: ["Open Bets", "Closed Bets"],
    datasets: [
      {
        data: [stats.openBets, stats.closedBets],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const totalProfit =
    stats.totalWinningsClosedWinBets -
    stats.totalStakeClosedBets -
    stats.totalLoss;
  const formattedProfit = totalProfit.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bet Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Total Bets: {stats.totalBets}</Typography>
          <Box sx={{ width: "100%", maxWidth: 250, margin: "0 auto" }}>
            <Pie
              data={pieDataTotalBets}
              width={300}
              height={300}
              options={{
                onClick: (event, elements) => handlePieClick(elements),
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Closed Bet Stats</Typography>
          <WinningStats totalWinnings={stats.totalWinningsClosedWinBets} />
          <LossStats totalLoss={stats.totalLoss} />
          <Typography variant="h5">
            {totalProfit >= 0 ? "Profit" : "Loss"}:
          </Typography>
          <Typography style={{ color: totalProfit >= 0 ? "green" : "red" }}>
            {formattedProfit}
          </Typography>
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bet Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default BetStats;
