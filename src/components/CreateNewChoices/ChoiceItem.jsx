import React from "react";
import "./choices.css";
import "../reusableStyle.css";

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
        <span className="btn-delete btn-delete-position" onClick={deleteChoice}>
          <i className="fas fa-times" />
        </span>
      ) : null}
    </div>
  );
};

export default ChoiceItem;
