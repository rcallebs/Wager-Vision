import React from "react";
import { NavLink } from "react-router-dom";
import OddsData from "../components/OddsData";
import SportsData from "../components/SportsData";
import { Button, Box } from "@mui/material";

const Home = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <h1>Welcome {user ? user.name : "Guest"}</h1>
      <div className="home-welcome">
        <h2>Good teams win. Great teams cover.</h2>
      </div>
      <div className="homepage links">
        <Button variant="contained">
          <NavLink to="/register" className="nav-link">
            New User
          </NavLink>
        </Button>

        <Button variant="contained">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </Button>
      </div>

      <div>
        <SportsData />
      </div>
    </Box>
  );
};

export default Home;
