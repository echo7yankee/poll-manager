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
      state.map(question => {
        if (question.id === action.id) {
          question.isEdit = !question.isEdit;
        }
        return question.isEdit;
      });

      return [...state];

    case EDIT_QUESTION:
      let newQuestion = [...state];
      const indexQuestion = state.findIndex(item => {
        return item.id === action.payload.id;
      });
      newQuestion[indexQuestion] = {
        ...action.payload,
        isEdit: false
      };

      return newQuestion;

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
