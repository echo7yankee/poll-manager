import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";

class PollCreator extends Component {
  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="polls-container">
        <h1 className="polls-header">ADD POLLS</h1>

        <form className="polls-form" onSubmit={this.handleSubmit}>
          <div className="polls__inputs-container">
            <label className="polls-label">Question:</label>
            <input className="polls-input" type="text" />
          </div>
          <div className="polls__inputs-container">
            <label className="polls-label">Answers:</label>
            <div className="polls__radio-container">
              <div className="radio__label-container">
                <input className="polls-radio" type="radio" />
                <label>Yes/No Form</label>
              </div>

              <div className="radio__label-container">
                <input className="polls-radio" type="radio" />
                <label>Multiple choice form</label>
              </div>
            </div>
          </div>
          <Choices />
          <div className="button-container">
            <button className="add-poll" type="submit">
              Add Poll
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PollCreator;
