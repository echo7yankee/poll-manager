import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { withRouter } from "react-router-dom";

import auth from "../Auth";
import PollCreatorLink from "./PollCreatorLink";

import { GooglePlusIcon } from "./reusableComponents/icons";
import PollResultsLink from "./PollResultsLink";
import ResultsByQuestionsLink from "./ResultsByQuestionsLink";

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
      auth.login(() => {
        this.props.history.push("/pollCreator");
      });
    } else {
      this.props.signOut();
      auth.logout(() => {
        this.props.history.push("/");
      });
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderNavbar() {
    if (this.props.isSignedIn === null) {
      return null;
    }

    return this.props.isSignedIn === true ? (
      <div className="nav">
        <button onClick={this.onSignOutClick} className="google-button">
          <GooglePlusIcon />
          Sign Out
        </button>
        <ul className="nav-items">
          <li className="nav-item">
            <PollCreatorLink />
          </li>
          <li className="nav-item">
            <PollResultsLink />
          </li>
          <li className="nav-item">
            <ResultsByQuestionsLink />
          </li>
        </ul>
      </div>
    ) : (
      <div className="nav">
        <button onClick={this.onSignInClick} className="google-button">
          <GooglePlusIcon />
          Sign In with Google
        </button>
        <ul className="nav-items">
          {/* <li>
            <Link className="nav-el" to="/pollQuestions">
              See Polls
            </Link>
          </li> */}
        </ul>
      </div>
    );
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
