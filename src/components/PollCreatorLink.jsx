import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./navbar.css";
//import auth from "../Auth";

class PollCreatorLink extends React.Component {
  render() {
    return (
      <Link
        className="nav-el"
        to="/pollCreator"
        // onClick={() =>
        //   auth.login(() => {
        //     this.props.history.push("/pollCreator");
        //   })
        // }
      >
        Create Polls
      </Link>
    );
  }
}

export default withRouter(PollCreatorLink);
