import React from "react";
import "./choices.css";
import "../reusableStyle.css";

import cancel from "../../img/cancel.svg";

const ChoiceItem = ({ deleteChoice, handleChoiceInput, inputValue, index }) => {
  return (
    <div className="polls__choices">
      <label className="polls__choices-label">Choice # {index}</label>
      <input
        className="polls__choices-input"
        type="text"
        value={inputValue}
        onChange={handleChoiceInput}
        placeholder={index === 1 ? "Enter a choice" : null}
      />
      {index >= 3 ? (
        <span className="btn-delete-position" onClick={deleteChoice}>
          <img src={cancel} className="btn-delete" alt="" />
        </span>
      ) : null}
    </div>
  );
};

export default ChoiceItem;
