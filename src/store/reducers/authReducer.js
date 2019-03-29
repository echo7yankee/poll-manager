import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGN_OUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from "../actions/types";

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { ...state, authError: null };
    case SIGNIN_FAILED:
      return { ...state, authError: action.err.message };
    case SIGN_OUT:
      return state;
    case SIGNUP_SUCCESS:
      return { ...state, authError: null };
    case SIGNUP_FAILED:
      return { ...state, authError: action.err.message };
    default:
      return state;
  }
};

export default authReducer;
