import React from "react";

import { BtnDelete } from "../reusableComponents/buttons";

import "../buttons.css";

const ChoiceItem = ({ deleteChoice, handleChoiceInput, inputValue, index }) => {
  return (
    <div className="polls__answer">
      <label className="polls__answer-label">Choice # {index}</label>
      <input
        className="polls__answer-input"
        type="text"
        value={inputValue}
        onChange={handleChoiceInput}
        placeholder={index === 1 ? "Enter a choice" : null}
      />
      {index >= 3 ? (
        <BtnDelete
          onClick={deleteChoice}
          spanClassName="button__icon-absolute"
          imgClassName={"button-icon"}
        />
      ) : null}
    </div>
  );
};

export default ChoiceItem;
