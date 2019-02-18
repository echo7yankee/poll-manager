import React from "react";
import "./navbar.css";
import PollCreatorLink from "./PollCreatorLink";
import { GooglePlusIcon } from "./reusableComponents/icons";

const SignOut = props => {
  return (
    <nav className="nav">
      <button onClick={props.onSignOutClick} className="google-button">
        <GooglePlusIcon />
        Sign Out
      </button>
      <li className="nav-item">
        <PollCreatorLink />
      </li>
    </nav>
  );
};

export default SignOut;
