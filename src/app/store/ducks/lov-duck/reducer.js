import { LovActionTypes } from './actions-types';
const initialAuthState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  config: {
    system: {},
    timeSlots: []
  },
  policy: null,
  policyYear: null,
  termsConditions: null

};
export function LovReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LovActionTypes.GET_LOV_PROG:
      return { ...state, isProgress: true };
    case LovActionTypes.GET_LOV_SUCC:
      return { ...state, isProgress: false, config: action.payload.config };
    case LovActionTypes.GET_LOV_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case LovActionTypes.GET_PRIVACY_POLICY_PROG:
      return { ...state, isProgress: true };
    case LovActionTypes.GET_PRIVACY_POLICY_SUCC:
      return { ...state, isProgress: false, policyYear: action?.payload?.policyYear, policy: action?.payload?.policy, termsConditions: action?.payload?.termsConditions };
    case LovActionTypes.GET_PRIVACY_POLICY_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    default:
      return state;
  }
};