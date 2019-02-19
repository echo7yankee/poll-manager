import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { withRouter, Link } from "react-router-dom";

import auth from "../Auth";
import PollCreatorLink from "./PollCreatorLink";

import { GooglePlusIcon } from "./reusableComponents/icons";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "279926207700-2301lhdkodvobp98clfr0qq9gos09u0u.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();

    auth.login(() => {
      this.props.history.push("/pollCreatorLink");
    });
  };

  onSignOutClick = () => {
    this.auth.signOut();

    auth.logout(() => {
      this.props.history.push("/");
    });
  };

  renderNavbar() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        <div className="nav">
          <button onClick={this.onSignOutClick} className="google-button">
            <GooglePlusIcon />
            Sign Out
          </button>
          <ul className="nav-items">
            <li>
              <PollCreatorLink />
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="nav">
          <button className="google-button" onClick={this.onSignInClick}>
            <GooglePlusIcon />
            Sign In with Google
          </button>
          <ul className="nav-items">
            <Link className="nav-el" to="/pollQuestions">
              See Polls
            </Link>
          </ul>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderNavbar()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signIn, signOut }
  )(GoogleAuth)
);
