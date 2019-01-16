import React from "react";
import "./navbar.css";

const SignIn = props => {
  return (
    <nav className="nav">
      <button
        className="ui red google button google-button"
        onClick={props.onSignInClick}
      >
        <i className="google icon" />
        Sign In with Google
      </button>
    </nav>
  );
};

export default SignIn;
