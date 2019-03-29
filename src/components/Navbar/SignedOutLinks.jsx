import React from "react";
import { NavLink } from "react-router-dom";

import "./navbar-style.css";

const SignedOutLinks = () => {
  return (
    <ul className="nav-items">
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">
          Sign Up
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signin">
          Sign in
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
