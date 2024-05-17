import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from "@mui/material";

const Nav = ({ user, handleLogOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();

  const buttonStyle = {
    mx: 2,
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          justifyContent: "center",
          overflow: "scroll",
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "nowrap",
            "@media (max-width: 600px)": {
              overflow: "scroll",
              display: "flex",
              justifyContent: "space-evenly",
              padding: "10px",
              margin: "0",
              width: "100%",
            },
          }}
        >
          <Button sx={buttonStyle} color="inherit" component={NavLink} to="/">
            Home
          </Button>
          {user && (
            <>
              <Button
                sx={buttonStyle}
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
              <Button
                sx={buttonStyle}
                color="inherit"
                component={NavLink}
                to={`/history`}
              >
                Stats
              </Button>
              <Button
                sx={buttonStyle}
                color="inherit"
                component={NavLink}
                to="/odds"
              >
                Upcoming
              </Button>
            </>
          )}
          <Button
            sx={buttonStyle}
            color="inherit"
            component={NavLink}
            to="/discussion"
          >
            Comments
          </Button>
          {user && (
            <Button sx={buttonStyle} color="inherit" onClick={handleLogOut}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
