import {
  ADD_QUESTION,
  EDIT_QUESTION,
  TOGGLE_EDITABLE,
  DELETE_QUESTION,
  CLEAR_QUESTIONS
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return [...state, { ...action.payload }];

    case TOGGLE_EDITABLE:
      const questionsToggleEditable = state.map(question => {
        if (question.id === action.id) {
          question = {
            ...question,
            isEdit: !question.isEdit
          };
        }
        return question;
      });

      return questionsToggleEditable;

    case EDIT_QUESTION:
      const questionsEdit = state.map(question => {
        if (question.id === action.payload.id) {
          question = {
            ...action.payload,
            isEdit: false
          };
        }

        return question;
      });

      return questionsEdit;

    case DELETE_QUESTION:
      return state.filter(item => {
        return item.id !== action.id;
      });

    case CLEAR_QUESTIONS:
      return [];
    default:
      return state;
  }
};
