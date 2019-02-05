import React, { Component } from "react";
import ChoiceItem from "./ChoiceItem.jsx";

class Choices extends Component {
  render() {
    const { answers, results } = this.props;

    return (
      <div className="polls__choices-container">
        {answers.map((choice, index) => {
          return (
            <ChoiceItem
              key={choice.id}
              inputValue={choice.value}
              handleChoiceInput={e =>
                this.props.handleChoiceInput(e.target.value, choice.id)
              }
              deleteNewChoice={() =>
                this.props.deleteNewChoice(choice.id, index)
              }
              index={index + 1}
            />
          );
        })}

        <button
          className="add-choice"
          onClick={this.props.addNewChoice}
          type="button"
        >
          + Add new choice
        </button>
        {answers.length > 2 && (
          <button className="add-choice" onClick={this.props.clearAllChoices}>
            Clear Choices
          </button>
        )}
      </div>
    );
  }
}

export default Choices;
