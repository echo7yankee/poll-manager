import React, { Component } from "react";
import CreateChoiceItem from "./CreateChoiceItem";
import uuid from "uuid";

class CreateChoices extends Component {
  state = {
    newChoices: [],
    id: uuid(),
    choiceNum: 3,
    choiceInput: ""
  };

  handleChoiceInput = e => {
    this.setState({
      choiceInput: e.target.value
    });
  };

  addNewChoice = e => {
    const newChoice = {
      id: this.state.id,
      choiceNum: this.state.choiceNum,
      choiceInput: this.state.choiceInput
    };

    this.setState({
      choiceNum: this.state.choiceNum + 1
    });

    const updatedChoices = [...this.state.newChoices, newChoice];
    this.setState({
      newChoices: updatedChoices,
      choiceInput: "",
      id: uuid()
    });
  };

  clearNewChoices = () => {
    this.setState({
      newChoices: [],
      choiceNum: 3
    });
  };

  deleteNewChoice = id => {
    const filteredChoices = this.state.newChoices.filter(newChoice => {
      return newChoice.id !== id;
    });

    this.setState({
      newChoices: filteredChoices
    });
  };

  render() {
    return (
      <div className="polls_choices-container">
        <div className="polls_choices">
          <label className="polls_label">Choice #1</label>
          <input
            className="polls_input-choice"
            type="text"
            value={this.state.choiceInput}
            onChange={this.handleChoiceInput}
          />
        </div>
        <div className="polls_choices">
          <label className="polls_label">Choice #2</label>
          <input
            className="polls_input-choice"
            type="text"
            value={this.state.choiceInput}
            onChange={this.handleChoiceInput}
          />
        </div>
        {this.state.newChoices.map(newChoice => {
          return (
            <CreateChoiceItem
              key={newChoice.id}
              choiceInput={newChoice.choiceInput}
              choiceNum={newChoice.choiceNum}
              deleteNewChoice={() => this.deleteNewChoice(newChoice.id)}
            />
          );
        })}

        <button className="add_choice" onClick={this.addNewChoice}>
          + Add new choice
        </button>
        {this.state.newChoices.length === 0 ? null : (
          <button className="add_choice" onClick={this.clearNewChoices}>
            Clear new choices
          </button>
        )}
      </div>
    );
  }
}

export default CreateChoices;
