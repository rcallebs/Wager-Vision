import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from "@mui/material";

const Nav = ({ user, handleLogOut }) => {
  const [betsMenuAnchorEl, setBetsMenuAnchorEl] = useState(null);
  const [postsMenuAnchorEl, setPostsMenuAnchorEl] = useState(null);
  const isBetsMenuOpen = Boolean(betsMenuAnchorEl);
  const isPostsMenuOpen = Boolean(postsMenuAnchorEl);

  const handleBetsMenuClick = (event) => {
    setBetsMenuAnchorEl(event.currentTarget);
  };

  const handlePostsMenuClick = (event) => {
    setPostsMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setBetsMenuAnchorEl(null);
    setPostsMenuAnchorEl(null);
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
                onClick={handleBetsMenuClick}
              >
                Bets
              </Button>
              <Menu
                id="bets-menu"
                anchorEl={betsMenuAnchorEl}
                open={isBetsMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={NavLink}
                  to="/bets"
                >
                  Open Bets
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={NavLink}
                  to="/settled-bets"
                >
                  Settled Bets
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
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
            aria-controls="posts-menu"
            aria-haspopup="true"
            onClick={handlePostsMenuClick}
          >
            Discussion
          </Button>
          <Menu
            id="posts-menu"
            anchorEl={postsMenuAnchorEl}
            open={isPostsMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              component={NavLink}
              to="/discussion"
            >
              Discussion Board
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={NavLink}
              to="/discussion/post"
            >
              Post
            </MenuItem>
          </Menu>
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
