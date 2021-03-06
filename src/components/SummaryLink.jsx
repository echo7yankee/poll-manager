import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./navbar.css";
import auth from "../Auth";

class SummaryLink extends React.Component {
  render() {
    return (
      <Link
        className="nav-el"
        to="/summary"
        onClick={() =>
          auth.login(() => {
            this.props.history.push("/summary");
          })
        }
      >
        Summary
      </Link>
    );
  }
}

export default withRouter(SummaryLink);
