import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

const Nav = ({ user, handleLogOut }) => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={NavLink} to="/bets">
                Bets
              </Button>
              <Button color="inherit" component={NavLink} to="/add-bet">
                Add a Bet
              </Button>
              <Button color="inherit" component={NavLink} to="/odds">
                Upcoming Odds
              </Button>
              <Button color="inherit" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/register">
                New User
              </Button>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
