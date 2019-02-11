import React from "react";
import "./choices.css";
import "../reusableStyle.css";

import { BtnDelete } from "../reusableComponents/buttons";

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
        <BtnDelete
          onClick={deleteChoice}
          spanClassName="btn-delete-absolute"
          imgClassName={"btn-delete"}
        />
      ) : null}
    </div>
  );
};

export default ChoiceItem;
