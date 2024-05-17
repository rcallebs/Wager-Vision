import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from "@mui/material";

const Nav = ({ user, handleLogOut, userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{ justifyContent: "center", overflow: "scroll", width: "95%" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
            justifyContent: "center",
            "@media (max-width: 600px)": {
              justifyContent: "center",
              overflow: "scroll",
            },
          }}
        >
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          {user && (
            <>
              <Button
                color="inherit"
                aria-controls="bets-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Bets
              </Button>
              <Menu
                id="bets-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleClose} component={NavLink} to="/bets">
                  Open Bets
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={NavLink}
                  to="/settled-bets"
                >
                  Settled Bets
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={NavLink}
                  to="/add-bet"
                >
                  New Bet
                </MenuItem>
              </Menu>
              <Button color="inherit" component={NavLink} to={`/history`}>
                Stats
              </Button>
              <Button color="inherit" component={NavLink} to="/odds">
                Upcoming
              </Button>
              <Button color="inherit" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit" component={NavLink} to="/register">
                New User
              </Button>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
            </>
          )}
          <Button color="inherit" component={NavLink} to="/discussion">
            Comments
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
