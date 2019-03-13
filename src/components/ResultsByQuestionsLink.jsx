import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./navbar.css";
import auth from "../Auth";

class ResultsByQuestionsLink extends React.Component {
  render() {
    return (
      <Link
        className="nav-el"
        to="/resultsByQuestions"
        onClick={() =>
          auth.login(() => {
            this.props.history.push("/resultsByQuestions");
          })
        }
      >
        Results by questions
      </Link>
    );
  }
}

export default withRouter(ResultsByQuestionsLink);
