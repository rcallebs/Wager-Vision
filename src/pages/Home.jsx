import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Box, Typography, Container } from "@mui/material";
import SpinningCoin from "../components/SpinningCoin";

const Home = ({ user }) => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome {user ? user.name : ",please log in to continue"}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2">
          Good teams win. Great teams cover.
        </Typography>
      </Box>
      {!user && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 5 }}>
          <Button variant="contained" component={NavLink} to="/register">
            New User
          </Button>
          <Button variant="contained" component={NavLink} to="/login">
            Login
          </Button>
        </Box>
      )}
      <SpinningCoin />
    </Container>
  );
};
export default Home;
