import React from "react";
import "../polls.css";

const RadioType = ({ value, text, type, onChange }) => {
  return (
    <div className="radio__label-container">
      <label className="mt-2">
        <input
          className="polls-radio"
          type="radio"
          value={value}
          checked={type}
          onChange={onChange}
        />
        {text}
      </label>
    </div>
  );
};

export default RadioType;
