import React, { Component } from "react";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("results") !== null) {
      this.state = {
        results: JSON.parse(localStorage.getItem("results"))
      };
    } else {
      this.state = {
        results: []
      };
    }
  }

  render() {
    console.log(this.state.results);

    return <div>poll results component</div>;
  }
}

export default PollResults;
