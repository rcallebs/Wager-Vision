import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from "@mui/material";
import betIcon from "../assets/images/betIcon.png";
import analytics from "../assets/images/analytics.png";
import logout from "../assets/images/logout.png";
import home from "../assets/images/home.png";
import upcoming from "../assets/images/upcoming.png";
import discussion from "../assets/images/discussion.png";

const Nav = ({ user, handleLogOut }) => {
  const [betsMenuAnchorEl, setBetsMenuAnchorEl] = useState(null);
  const [postsMenuAnchorEl, setPostsMenuAnchorEl] = useState(null);
  const [upcomingMenuAnchorEl, setUpcomingMenuAnchorEl] = useState(null);
  const isBetsMenuOpen = Boolean(betsMenuAnchorEl);
  const isPostsMenuOpen = Boolean(postsMenuAnchorEl);
  const isUpcomingMenuOpen = Boolean(upcomingMenuAnchorEl);

  const handleBetsMenuClick = (event) => {
    setBetsMenuAnchorEl(event.currentTarget);
  };

  const handlePostsMenuClick = (event) => {
    setPostsMenuAnchorEl(event.currentTarget);
  };

  const handleUpcomingMenuClick = (event) => {
    setUpcomingMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setBetsMenuAnchorEl(null);
    setPostsMenuAnchorEl(null);
    setUpcomingMenuAnchorEl(null);
  };

  let navigate = useNavigate();

  const buttonStyle = {
    mx: 2,
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
      }}
    >
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
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "nowrap",
            "@media (max-width: 600px)": {
              overflow: "scroll",
              display: "flex",
              justifyContent: "space-evenly",
              padding: "0",
              margin: "0px",
              marginLeft: "6px",
              margin: "6px",
            },
          }}
        >
          <Button sx={buttonStyle} color="inherit" component={NavLink} to="/">
            <img src={home} alt="home" style={{ width: 24, height: 24 }} />
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
                <img
                  src={betIcon}
                  alt="Bets"
                  style={{ width: 24, height: 24 }}
                />
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
                <img
                  src={analytics}
                  alt="stats"
                  style={{ width: 24, height: 24 }}
                />
              </Button>
              <Button
                sx={buttonStyle}
                color="inherit"
                aria-controls="upcoming-menu"
                aria-haspopup="true"
                onClick={handleUpcomingMenuClick}
              >
                <img
                  src={upcoming}
                  alt="Upcoming"
                  style={{ width: 24, height: 24 }}
                />
              </Button>
              <Menu
                id="upcoming-menu"
                anchorEl={upcomingMenuAnchorEl}
                open={isUpcomingMenuOpen}
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
                  onClick={() => {
                    handleMenuClose();
                    navigate("/odds");
                  }}
                >
                  Upcoming Games
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/nfl");
                  }}
                >
                  NFL Schedule
                </MenuItem>
              </Menu>
            </>
          )}
          <Button
            sx={buttonStyle}
            color="inherit"
            aria-controls="posts-menu"
            aria-haspopup="true"
            onClick={handlePostsMenuClick}
          >
            <img
              src={discussion}
              alt="Discussions"
              style={{ width: 24, height: 24 }}
            />
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
              New Post
            </MenuItem>
          </Menu>
          {user && (
            <Button sx={buttonStyle} color="inherit" onClick={handleLogOut}>
              <img
                src={logout}
                alt="logout"
                style={{ width: 24, height: 24 }}
              />
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
