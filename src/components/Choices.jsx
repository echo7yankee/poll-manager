import React, { Component } from "react";
import ChoiceItem from "./ChoiceItem.jsx";
import uuid from "uuid";

class Choices extends Component {
  state = {
    newChoices: [],
    choiceInput: {},
    id: uuid()
  };

  componentWillMount() {
    this.setState({
      newChoices: [0, 1]
    });
  }

  handleChoiceInput = e => {
    this.setState({
      choiceInput: e.target.value
    });
  };

  addNewChoice = () => {
    const newChoice = {
      id: this.state.id,
      choiceInput: this.state.choiceInput
    };

    const updatedChoices = [...this.state.newChoices, newChoice];
    this.setState({
      newChoices: updatedChoices,
      id: uuid()
    });
  };

  clearNewChoices = () => {
    this.setState({
      newChoices: [0, 1]
    });
  };

  deleteNewChoice = id => {
    if (this.state.newChoices.length > 2) {
      const filteredChoices = this.state.newChoices.filter(newChoice => {
        return newChoice.id !== id;
      });

      this.setState({
        newChoices: filteredChoices
      });
    }
  };

  render() {
    return (
      <div className="polls_choices-container">
        {this.state.newChoices.map((newChoice, index) => {
          console.log(newChoice.id);
          return (
            <ChoiceItem
              key={newChoice.id}
              choiceInput={this.state.choiceInput[newChoice.id]}
              handleChoiceInput={this.handleChoiceInput}
              deleteNewChoice={() => this.deleteNewChoice(newChoice.id)}
              index={index + 1}
              ChoicesLength={this.state.newChoices.length}
            />
          );
        })}

        <button className="add_choice" onClick={this.addNewChoice}>
          + Add new choice
        </button>
        {this.state.newChoices.length > 2 && (
          <button className="add_choice" onClick={this.clearNewChoices}>
            Clear new choices
          </button>
        )}
      </div>
    );
  }
}

export default Choices;
