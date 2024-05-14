import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ user, handleLogOut }) => {
  return (
    <nav className="nav-links">
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        {user && (
          <>
            <NavLink to="/bets">
              <li>Bets</li>
            </NavLink>
            <NavLink to="/bets/add-bet">
              <li>Add a Bet</li>
            </NavLink>
            <NavLink to="/odds">
              <li>Upcoming Odds</li>
            </NavLink>
            <NavLink onClick={handleLogOut}>
              <li>Logout</li>
            </NavLink>
          </>
        )}
        {!user && (
          <>
            <NavLink to="/auth/register">
              <li>New User</li>
            </NavLink>
            <NavLink to="/auth/login">
              <li>Login</li>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
