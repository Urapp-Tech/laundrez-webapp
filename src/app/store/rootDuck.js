import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as auth from './ducks/auth-duck';
import * as category from './ducks/category-duck';
import * as service from './ducks/service-duck';
import { metronic } from '../../_metronic';

const appReducer = combineReducers({
  auth: auth.AuthReducer,
  builder: metronic.builder.reducer,
  category: category.CategoryReducer,
  service: service.ServiceReducer
});
export const rootReducer = (state, action) => {
  if (action.type === auth.AuthActionTypes.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
export const rootEpic = combineEpics(
  // more epics functions go here
  auth.AuthEpics.login,
  category.CategoryEpics.getCategories,
  service.ServiceEpics.getServices,
  service.ServiceEpics.getServiceFaq

);
