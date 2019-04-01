import {
  ADD_QUESTION,
  TOGGLE_EDITABLE,
  EDIT_QUESTION,
  DELETE_QUESTION,
  CLEAR_QUESTIONS,
  ADD_QUESTION_ERROR
} from "./types";

export const addQuestion = questions => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;

    firestore
      .collection("questions")
      .add({
        ...questions,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: ADD_QUESTION
        });
      })
      .catch(err => {
        dispatch({ type: ADD_QUESTION_ERROR, err });
      });
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

export const deleteQuestion = (id, questions) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("questions")
      .doc()
      .delete()
      .then(() => {
        dispatch({ type: DELETE_QUESTION });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const clearQuestions = payload => {
  return {
    type: CLEAR_QUESTIONS,
    payload
  };
};