import { ServiceActionTypes } from './actions-types';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  services: [],
};
export function ServiceReducer(state = initState, action) {
  switch (action.type) {
    case ServiceActionTypes.SERVICES_PROG:
      return { ...state, isProgress: true };

    case ServiceActionTypes.SERVICES_SUCC:
      return { ...state, isProgress: false, services: action.payload.services };

    case ServiceActionTypes.SERVICES_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };
    default:
      return state;
  }
};