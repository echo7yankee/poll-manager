import React from "react";
import edit from "../../img/edit.svg";
import cancel from "../../img/cancel.svg";

import "../reusableStyle.css";

export const BtnEdit = ({ onClick, spanClassName, imgClassName }) => {
  return (
    <span onClick={onClick}>
      <img src={edit} alt="" className="btn-edit" />
    </span>
  );
};

export const BtnDelete = ({ onClick, spanClassName, imgClassName }) => {
  return (
    <span onClick={onClick} className={spanClassName}>
      <img src={cancel} alt="" className={imgClassName} />
    </span>
  );
};
