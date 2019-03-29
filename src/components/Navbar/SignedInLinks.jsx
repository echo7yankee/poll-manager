import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul className="nav-items">
      <li className="nav-item">
        <NavLink className="nav-link" to="/create">
          New Questions
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/summary">
          Summary
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Logout
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
