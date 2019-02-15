import React, { Component } from "react";
import ChoiceItem from "./ChoiceItem.jsx";
import "./choices.css";

class Choices extends Component {
  render() {
    const { answers } = this.props;

    return (
      <>
        <div className="polls__answer">
          {answers.map((choice, index) => {
            return (
              <ChoiceItem
                key={choice.id}
                inputValue={choice.value}
                handleChoiceInput={e =>
                  this.props.handleChoiceInput(e.target.value, choice.id)
                }
                deleteChoice={() => this.props.deleteChoice(choice.id, index)}
                index={index + 1}
              />
            );
          })}
        </div>

        <div className="polls__answers-buttons">
          <button
            className="button-answer"
            onClick={this.props.addChoice}
            type="button"
          >
            + Add new choice
          </button>
          {answers.length > 2 && (
            <button
              className="button-answer"
              onClick={this.props.clearAllChoices}
            >
              Clear Choices
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Choices;
