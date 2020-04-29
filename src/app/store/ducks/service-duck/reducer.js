import { ServiceActionTypes } from './actions-types';
const initState = {
  isProgress: true,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  services: [],
  service: null,
  serviceFaq: []
};
export function ServiceReducer(state = initState, action) {
  switch (action.type) {
    case ServiceActionTypes.SERVICES_PROG:
      return { ...state, isProgress: true };

    case ServiceActionTypes.SERVICES_SUCC:
      return { ...state, isProgress: false, services: action.payload.services };

    case ServiceActionTypes.SERVICES_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case ServiceActionTypes.CLEAR_SERVICES:
      return { ...state, services: [] };


    case ServiceActionTypes.GET_SERVICE_PROG:
      return { ...state, isProgress: true };

    case ServiceActionTypes.GET_SERVICE_SUCC:
      return { ...state, isProgress: false, service: action.payload.service };

    case ServiceActionTypes.GET_SERVICE_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };


    case ServiceActionTypes.CLEAR_SERVICE:
      return { ...state, service: null };


    default:
      return state;
  }
};