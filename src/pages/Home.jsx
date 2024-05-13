import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Home
      <NavLink to="/auth/register">
        <li>New User</li>
      </NavLink>
    </div>
  );
};

export default Home;
