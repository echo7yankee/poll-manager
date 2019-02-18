import React from "react";
import "./navbar.css";
import { GooglePlusIcon } from "./reusableComponents/icons";

const SignIn = props => {
  return (
    <nav className="nav">
      <button className="google-button" onClick={props.onSignInClick}>
        <GooglePlusIcon />
        Sign In with Google
      </button>
    </nav>
  );
};

export default SignIn;
