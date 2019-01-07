import React, { Component } from "react";
import "./polls.css";

import CreateChoices from "./CreateChoices";

class CreatePolls extends Component {
  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <h1 className="polls_header">ADD POLLS</h1>

        <form className="polls_form" onSubmit={this.handleSubmit}>
          <div className="polls_inputs">
            <label className="polls_label">Question:</label>
            <input className="polls_input" type="text" />
          </div>
          <div className="polls_inputs">
            <label className="polls_label">Answers:</label>
            <div className="polls_radios">
              <div className="radio_label">
                <input className="polls_radio" type="radio" />
                <label>Yes/No Form</label>
              </div>

              <div className="radio_label">
                <input className="polls_radio" type="radio" />
                <label>Multiple choice form</label>
              </div>
            </div>
          </div>
          <CreateChoices />
          <div className="button_container">
            <button className="add_poll" type="submit">
              Add Poll
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default CreatePolls;
