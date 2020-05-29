import { OrderActionTypes } from './actions-types';
import { OrderStorage } from './order-storage';
const initState = {
  isProgressPost: false,
  isProgressUpdate: false,
  isProgressOrders: false,
  isProgressActiveOrders: false,
  isProgressPayment: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  orders: [],
  activeOrders: [],
  currentOrder: {
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    driverInstruction: '',
    address: undefined,
    start: false
  },
  paging: {},
  order: {}
};
export function OrderReducer(state = initState, action) {
  // let array = [];
  let obj = {};
  switch (action.type) {

    case OrderActionTypes.ORDER_START:
      obj = { ...state.currentOrder };
      obj['start'] = true;
      OrderStorage.setCurrentOrder(obj);
      return { ...state, currentOrder: obj };

    case OrderActionTypes.SET_PICKUP_AND_DROPOFF:
      obj = { ...state.currentOrder };
      obj['pickupDate'] = action.payload.pickupDate;
      obj['pickupTime'] = action.payload.pickupTime;
      obj['dropoffDate'] = action.payload.dropoffDate;
      obj['dropoffTime'] = action.payload.dropoffTime;
      obj['driverInstruction'] = action.payload.driverInstruction;
      obj['address'] = action.payload.address;
      OrderStorage.setCurrentOrder({ ...obj });
      return { ...state, currentOrder: { ...obj } };

    case OrderActionTypes.POST_ORDER_PROG:
      return { ...state, isProgressPost: true, };
    case OrderActionTypes.POST_ORDER_SUCC:
      OrderStorage.setOrder(action.payload.order);
      return { ...state, isProgressPost: false, order: action.payload.order };
    case OrderActionTypes.POST_ORDER_FAIL:
      return { ...state, isProgressPost: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case OrderActionTypes.GET_ORDERS_PROG:
      return { ...state, isProgressOrders: true, };
    case OrderActionTypes.GET_ORDERS_SUCC:
      return { ...state, isProgressOrders: false, orders: action.payload.result, paging: action.payload.paging };
    case OrderActionTypes.GET_ORDERS_FAIL:
      return { ...state, isProgressOrders: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };



    case OrderActionTypes.GET_ACTIVE_ORDERS_PROG:
      return { ...state, isProgressActiveOrders: true, };
    case OrderActionTypes.GET_ACTIVE_ORDERS_SUCC:
      return { ...state, isProgressActiveOrders: false, activeOrders: action.payload.result };
    case OrderActionTypes.GET_ACTIVE_ORDERS_FAIL:
      return { ...state, isProgressActiveOrders: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case OrderActionTypes.MAKE_PAYMENT_PROG:
      return { ...state, isProgressPayment: true, };
    case OrderActionTypes.MAKE_PAYMENT_SUCC:
      return { ...state, isProgressPayment: false, };
    case OrderActionTypes.MAKE_PAYMENT_FAIL:
      return { ...state, isProgressPayment: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    case OrderActionTypes.CLEAR_ORDER:
      OrderStorage.clearOrder();
      return {
        ...state, currentOrder: {
          pickupDate: '',
          pickupTime: '',
          dropoffDate: '',
          dropoffTime: '',
          driverInstruction: '',
          address: undefined,
          start: false
        },
        order: {}
      };

    case OrderActionTypes.SET_ORDER:
      return { ...state, order: action.payload.order };

    case OrderActionTypes.SET_CURRENT_ORDER:
      return { ...state, currentOrder: action.payload.currentOrder };

    default:
      return state;
  }
};