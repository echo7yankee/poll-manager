import React from "react";
import "./navbar.css";
import PollCreatorLink from "./PollCreatorLink";

const SignOut = props => {
  return (
    <nav className="nav">
      <button
        onClick={props.onSignOutClick}
        className="ui red google button google-button"
      >
        <i className="google icon" />
        Sign Out
      </button>
      <li className="nav-item">
        <PollCreatorLink />
      </li>
    </nav>
  );
};

export default SignOut;
