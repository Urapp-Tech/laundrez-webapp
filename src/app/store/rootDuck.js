import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import AuthReducer from "./ducks/auth-duck/reducer";
import { metronic } from "../../_metronic";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  // i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer
});

//TODO: root epic will come here

