import { AuthActionTypes } from './actions-types';
const initialAuthState = {
  isProgress: false,
  isProgressSocialLogin: false,
  isProgressRefreshToken: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  user: null,
  profileUpdateSucc: false,
  isProfileCompleted: false
};
export function AuthReducer(state = initialAuthState, action) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_PROG:
      return { ...state, isProgress: true };

    case AuthActionTypes.LOGIN_SUCC:
      return { ...state, isProgress: false, };

    case AuthActionTypes.LOGIN_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case AuthActionTypes.GET_NEW_ACCESS_TOKEN_PROG:
      return { ...state, isProgressRefreshToken: true };

    case AuthActionTypes.GET_NEW_ACCESS_TOKEN_SUCC:
      return { ...state, isProgressRefreshToken: false, };

    case AuthActionTypes.GET_NEW_ACCESS_TOKEN_FAIL:
      return { ...state, isProgressRefreshToken: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };



    case AuthActionTypes.SOCIAL_LOGIN_PROG:
      return { ...state, isProgressSocialLogin: true };

    case AuthActionTypes.SOCIAL_LOGIN_SUCC:
      return { ...state, isProgressSocialLogin: false, };

    case AuthActionTypes.SOCIAL_LOGIN_FAIL:
      return { ...state, isProgressSocialLogin: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case AuthActionTypes.GET_PROFILE_PROG:
      return { ...state, isProgress: true };

    case AuthActionTypes.GET_PROFILE_SUCC:
      return { ...state, isProgress: false, user: action.payload.user };

    case AuthActionTypes.GET_PROFILE_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };


    case AuthActionTypes.SET_IS_PROFILE_COMPLETED:
      return { ...state, isProfileCompleted: action.payload.isProfileCompleted };


    case AuthActionTypes.UPDATE_PROFILE_PROG:
      return { ...state, isProgress: true };

    case AuthActionTypes.UPDATE_PROFILE_SUCC:
      return { ...state, isProgress: false, user: action.payload.user, profileUpdateSucc: true };

    case AuthActionTypes.UPDATE_PROFILE_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case AuthActionTypes.CLEAR_SUCCESS:
      return { ...state, profileUpdateSucc: false };

    case AuthActionTypes.SET_USER:
      return { ...state, user: action.payload.user };

    case AuthActionTypes.CLEAR_ERROR:
      return { ...state, isError: false, errorMsg: '', errorStatus: 0, };
    default:
      return state;
  }
};