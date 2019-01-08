import React from "react";
import auth from "../Auth";
import GoogleAuth from "./GoogleAuth.jsx";

import "./navbar.css";

const Navbar = props => {
  return (
    <nav className="nav">
      <ul className="nav-elements">
        <li>Polls</li>
        <li
          onClick={() => {
            auth.login(() => {
              props.history.push("/pollCreator");
            });
          }}
        >
          Create Polls
        </li>
      </ul>
      <span>
        <GoogleAuth />
      </span>
    </nav>
  );
};

export default Navbar;
