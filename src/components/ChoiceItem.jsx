import React from "react";
import "./polls.css";

const ChoiceItem = ({
  renderDeleteButton,
  handleChoiceInput,
  choiceInput,
  index
}) => {
  return (
    <div className="polls_choices">
      <label className="polls_label">Choice # {index}</label>
      <input
        className="polls_input-choice"
        type="text"
        value={choiceInput}
        onChange={handleChoiceInput}
      />
      {renderDeleteButton}
    </div>
  );
};

export default ChoiceItem;
