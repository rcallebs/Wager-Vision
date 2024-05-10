import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <NavLink to="/">
          <li>Landing Page</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
