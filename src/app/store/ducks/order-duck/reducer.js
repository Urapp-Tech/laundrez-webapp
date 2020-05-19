import { OrderActionTypes } from './actions-types';
const initState = {
  isProgressSave: false,
  isProgressUpdate: false,
  isProgressOrders: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  orders: [],
  currentOrder : {

    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    driverInstruction: '',
    address: {},
  },
  paging: {}
};
export function OrderReducer(state = initState, action) {
  // let array = [];
  let obj = {};
  switch (action.type) {

    case OrderActionTypes.SET_PICKUP_AND_DROPOFF:
      obj = {...state.currentOrder};
      obj['pickupDate'] = action.payload.pickupDate;
      obj['pickupTime'] = action.payload.pickupTime;
      obj['dropoffDate'] = action.payload.dropoffDate;
      obj['dropoffTime'] = action.payload.dropoffTime;
      obj['driverInstruction'] = action.payload.driverInstruction;
      obj['address'] = action.payload.address;
      return {...state, currentOrder: {...obj}};

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