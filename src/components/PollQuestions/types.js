import uuid from "uuid";

// @todo named export
export const createChoice = () => {
  return {
    id: uuid(),
    value: ""
  };
};

export const createQuestion = () => {
  return {
    id: uuid(),
    value: "",
    answers: [createChoice(), createChoice()],
    type: YES_NO,
    isEdit: false
  };
};

export const YES_NO = "YES_NO";
export const MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
export const SINGLE_CHOICE = "SINGLE_CHOICE";
