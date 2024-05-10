import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <NavLink to="/">
          <li>Landing Page</li>
        </NavLink>
        <NavLink to="/bets">
          <li>Bets</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
