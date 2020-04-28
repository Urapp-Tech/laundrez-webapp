import { NotificationActionTypes } from './actions-types';
const initState = {
  isError: false,
  isSuccess: false,
  successMessage: '',
  errorMessage: ''

};
export function NotificationReducer(state = initState, action) {
  switch (action.type) {

    case NotificationActionTypes.SHOW_SUCCESS_NOTIFICATION:
      return { ...state, isSuccess: true, successMessage: action.payload.message };

    case NotificationActionTypes.HIDE_SUCCESS_NOTIFICATION:
      return { ...state, isSuccess: false, successMessage: '' };


    case NotificationActionTypes.SHOW_ERROR_NOTIFICATION:
      return { ...state, isError: true, errorMessage: action.payload.message };

    case NotificationActionTypes.HIDE_ERROR_NOTIFICATION:
      return { ...state, isError: false, errorMessage: '' };
    default:
      return state;
  }
};