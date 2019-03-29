import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/auth";

import "./navbar-style.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = ({ auth, signOut }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link className="nav-link logo" to={auth.uid ? "/create" : "/"}>
          Poll Manager
        </Link>
      </div>
      {auth.uid ? <SignedInLinks signOut={signOut} /> : <SignedOutLinks />}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
