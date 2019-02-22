import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./navbar.css";
import auth from "../Auth";

class PollResultsLink extends React.Component {
  render() {
    return (
      <Link
        className="nav-el"
        to="/pollResults"
        onClick={() =>
          auth.login(() => {
            this.props.history.push("/pollResults");
          })
        }
      >
        Poll Results
      </Link>
    );
  }
}

export default withRouter(PollResultsLink);
