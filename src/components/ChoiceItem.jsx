import React from "react";
import "./polls.css";

const ChoiceItem = props => {
  return (
    <div className="polls_choices">
      <label className="polls_label">Choice #</label>
      <input className="polls_input-choice" type="text" />
      <span className="btn-trash" onClick={props.deleteNewChoice}>
        <i className="fas fa-trash" />
      </span>
    </div>
  );
};

export default ChoiceItem;
