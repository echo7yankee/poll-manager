import React from "react";

const SignIn = props => {
  return (
    <button className="ui red google button" onClick={props.onSignInClick}>
      <i className="google icon" />
      Sign In with Google
    </button>
  );
};

export default SignIn;
