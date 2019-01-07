import React from "react";
import "./polls.css";

const ChoiceItem = ({
  deleteNewChoice,
  handleChoiceInput,
  choiceInput,
  index,
  ChoicesLength
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
      {index > 2 && (
        <span className="btn-trash" onClick={deleteNewChoice}>
          <i className="fas fa-trash" />
        </span>
      )}
    </div>
  );
};

export default ChoiceItem;
