import { OrderActionTypes } from './actions-types';
const initState = {
  isProgressSave: false,
  isProgressUpdate: false,
  isProgressOrders: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  orders: [],
  paging: {}
};
export function OrderReducer(state = initState, action) {
  // let array = [];
  switch (action.type) {







    case OrderActionTypes.GET_ORDERS_PROG:
      return { ...state, isProgressOrders: true, };
    case OrderActionTypes.GET_ORDERS_SUCC:
      return { ...state, isProgressOrders: false, orders: action.payload.result, paging: action.payload.paging };
    case OrderActionTypes.GET_ORDERS_FAIL:
      return { ...state, isProgressOrders: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };


    default:
      return state;
  }
};