import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.question = React.createRef();
    this.state = {
      value: "",
      renderError: false,
      visible: false,
      invisible: true
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.question.current.value === "") {
      this.setState({
        renderError: true
      });
    } else {
      this.setState({
        value: this.question.current.value,
        renderError: false
      });
    }

    this.question.current.value = "";
  };
  handleRadioChange = e => {
    this.setState({
      invisible: !this.state.invisible,
      visible: !this.state.visible
    });
  };
  renderChoices = () => {
  handleDeleteResult = id => {
    const { newResults } = this.state;
    const filteredResults = newResults.filter(result => {
      return result.id !== id;
    });

    this.setState({
      newResults: filteredResults
    });
  };
    if (this.state.visible) {
      return <Choices />;
    } else if (this.state.invisible) {
      return null;
    }
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
          <form className="polls-form" onSubmit={this.handleSubmit}>
            <div className="polls__inputs-container">
              <label className="polls-label">Question:</label>
              <input className="polls-input" type="text" ref={this.question} />
            </div>
            {this.state.renderError && <p>Please insert a value</p>}
            <div className="polls__inputs-container">
              <label className="polls-label">Answers:</label>
              <div className="polls__radio-container">
                <div className="radio__label-container">
                  <label className="mt-2">
                    <input
                      className="polls-radio"
                      type="radio"
                      value="invisibleForm"
                      checked={this.state.invisible}
                      onChange={this.handleRadioChange}
                    />
                    Yes/No Form
                  </label>
                </div>

                <div className="radio__label-container">
                  <label className="mt-2">
                    <input
                      className="polls-radio"
                      type="radio"
                      value="visibleForm"
                      checked={this.state.visible}
                      onChange={this.handleRadioChange}
                    />
                    Multiple choice form
                  </label>
                </div>
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
            {this.renderChoices()}
        <PollResults value={this.state.value} />
              handleDeleteResult={() => this.handleDeleteResult(result.id)}
              index={index + 1}
    );
  }
}

export default PollCreator;
