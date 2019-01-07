import React from "react";
import auth from "../Auth";
import GoogleAuth from "./GoogleAuth";

const Navbar = props => {
  return (
    <div>
      <span
        onClick={() => {
          auth.login(() => {
            props.history.push("/polls");
          });
        }}
      >
        <GoogleAuth />
      </span>
    </div>
  );
};

export default Navbar;
