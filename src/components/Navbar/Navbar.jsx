import React from "react";
import { Link } from "react-router-dom";

import "./navbar-style.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link className="nav-link logo" to="/">
          Poll Manager
        </Link>
      </div>
      <SignedInLinks />
      <SignedOutLinks />
    </nav>
  );
};

export default Navbar;
