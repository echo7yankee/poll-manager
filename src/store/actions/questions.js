import {
  ADD_QUESTION,
  TOGGLE_EDITABLE,
  EDIT_QUESTION,
  DELETE_QUESTION,
  CLEAR_QUESTIONS
} from "./types";

export const addQuestion = payload => {
  return {
    type: ADD_QUESTION,
    payload
  };
};

export const toggleEditable = id => {
  return {
    type: TOGGLE_EDITABLE,
    id
  };
};

export const editQuestion = payload => {
  return {
    type: EDIT_QUESTION,
    payload
  };
};

export const deleteQuestion = id => {
  return {
    type: DELETE_QUESTION,
    id
  };
};

export const clearQuestions = payload => {
  return {
    type: CLEAR_QUESTIONS,
    payload
  };
};
