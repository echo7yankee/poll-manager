import React from "react";

const SignOut = props => {
  return (
    <button onClick={props.onSignOutClick} className="ui red google button">
      <i className="google icon" />
      Sign Out
    </button>
  );
};

export default SignOut;
