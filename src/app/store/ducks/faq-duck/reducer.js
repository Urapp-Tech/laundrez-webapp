import { FaqActionTypes } from './actions-types';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  faqs: [],
};
export function FaqReducer(state = initState, action) {
  switch (action.type) {
    case FaqActionTypes.FAQS_PROG:
      return { ...state, isProgress: true };

    case FaqActionTypes.FAQS_SUCC:
      return { ...state, isProgress: false, faqs: action.payload.faqs };

    case FaqActionTypes.FAQS_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };
    default:
      return state;
  }
};