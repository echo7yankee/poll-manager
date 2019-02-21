import React from "react";
import "../polls.css";

const RadioInput = ({ value, text, type, onChange }) => {
  return (
    <label className="radio__label-input radio__label-input--mt">
      <input
        name="types"
        className="polls-radio"
        type="radio"
        value={value}
        checked={type}
        onChange={onChange}
      />
      {text}
    </label>
  );
};

export default RadioInput;
