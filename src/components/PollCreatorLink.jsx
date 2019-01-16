import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const PollCreatorLink = () => {
  return (
    <Link className="nav-el" to="/pollCreator">
      Create Polls
    </Link>
  );
};

export default PollCreatorLink;
