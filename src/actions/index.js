import { SIGN_IN, SIGN_OUT, DELETE_CHOICE, GET_NEW_CHOICES } from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const getNewChoices = () => {
  return {
    type: GET_NEW_CHOICES
  };
};

export const deleteChoice = id => {
  return {
    type: DELETE_CHOICE,
    payload: id
  };
};
