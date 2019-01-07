import React from "react";
import auth from "../Auth";
import GoogleAuth from "./GoogleAuth.jsx";

const Navbar = props => {
  return (
    <div>
      <span
        onClick={() => {
          auth.login(() => {
            props.history.push("/createPolls");
          });
        }}
      >
        <GoogleAuth />
      </span>
    </div>
  );
};

export default Navbar;
