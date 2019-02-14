import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { withRouter } from "react-router-dom";

import auth from "../Auth";
import SignIn from "./SignIn.jsx";
import SignOut from "./SignOut.jsx";

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

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return <SignOut onSignOutClick={this.onSignOutClick} />;
    } else {
      return <SignIn onSignInClick={this.onSignInClick} />;
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
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
