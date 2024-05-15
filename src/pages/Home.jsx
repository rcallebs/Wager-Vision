import React from "react";
import { NavLink } from "react-router-dom";
import OddsData from "./OddsData";
import SportsData from "../components/SportsData";
import { Button, Box, Typography, Container } from "@mui/material";

const Home = ({ user }) => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome {user ? user.name : "Guest"}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2">
          Good teams win. Great teams cover.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 5 }}>
        <Button variant="contained" component={NavLink} to="/register">
          New User
        </Button>
        <Button variant="contained" component={NavLink} to="/login">
          Login
        </Button>
      </Box>
      <Box>
        <SportsData />
      </Box>
    </Container>
  );
};

export default Home;
