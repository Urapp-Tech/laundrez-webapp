import { LovActionTypes } from './actions-types';
const initialAuthState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  config: {
    system: {},
    timeSlots: []
  }

};
export function LovReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LovActionTypes.GET_LOV_PROG:
      return { ...state, isProgress: true };
    case LovActionTypes.GET_LOV_SUCC:
      return { ...state, isProgress: false, config: action.payload.config };
    case LovActionTypes.GET_LOV_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };
    default:
      return state;
  }
};