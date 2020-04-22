// import { MyBasketActionTypes } from './actions-types';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  items: {}
};
export function MyBasketReducer(state = initState, action) {
  switch (action.type) {

    default:
      return state;
  }
};