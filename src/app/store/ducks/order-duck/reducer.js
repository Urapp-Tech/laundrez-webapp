// import { OrderActionTypes } from './actions-types';
const initState = {
  isProgressSave: false,
  isProgressUpdate: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  orders: [],
};
export function OrderReducer(state = initState, action) {
  // let array = [];
  switch (action.type) {
    

    default:
      return state;
  }
};