import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/bets">
          <li>Bets</li>
        </NavLink>
        <NavLink to="/auth/register">
          <li>New User</li>
        </NavLink>
        <NavLink to="/auth/login">
          <li>Login</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
