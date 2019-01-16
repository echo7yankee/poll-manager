import React, { Component } from "react";
import ChoiceItem from "./ChoiceItem.jsx";

class Choices extends Component {
  render() {
    const { newChoices } = this.props;
    console.log(newChoices);

    return (
      <div className="polls__choices-container">
        {newChoices.map((choice, index) => {
          return (
            <ChoiceItem
              key={choice.id}
              InputValue={choice.value}
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
        {newChoices.length > 2 && (
          <button className="add-choice" onClick={this.props.clearNewChoices}>
            Clear new choices
          </button>
        )}
      </div>
    );
  }
}

export default Choices;

//[...this.state.choices.slice(0, i - 1), value];
