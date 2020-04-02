import { combineReducers } from "redux";
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as auth from "./ducks/auth-duck";
import { metronic } from "../../_metronic";

const appReducer = combineReducers({
  auth: auth.AuthReducer, 
  builder: metronic.builder.reducer
});
export const rootReducer = (state, action) => {
  if (action.type === auth.AuthActionTypes.LOGOUT) {
      state = undefined;
  }
  return appReducer(state, action);
};
export const rootEpic = combineEpics(
  // more epics functions go here
  auth.AuthEpics.login

);
