import React, { Component } from "react";
import ChoiceItem from "./ChoiceItem.jsx";
import uuid from "uuid";

class Choices extends Component {
  state = {
    newChoices: [],
    id: uuid(),
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
      choiceInput: this.state.choiceInput
    };

    const updatedChoices = [...this.state.newChoices, newChoice];
    this.setState({
      newChoices: updatedChoices,
      choiceInput: "",
      id: uuid()
    });
  };

  clearNewChoices = () => {
    this.setState({
      newChoices: []
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
        {this.state.newChoices.map(newChoice => {
          return (
            <ChoiceItem
              key={newChoice.id}
              choiceInput={newChoice.choiceInput}
              deleteNewChoice={() => this.deleteNewChoice(newChoice.id)}
            />
          );
        })}

        <button className="add_choice" onClick={this.addNewChoice}>
          + Add new choice
        </button>
        {this.state.newChoices.length > 0 && (
          <button className="add_choice" onClick={this.clearNewChoices}>
            Clear new choices
          </button>
        )}
      </div>
    );
  }
}

export default Choices;
