import { MyBasketActionTypes } from './actions-types';
import { MyBasketStorage } from './basket-storage';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  items: {},
  coupon: null
};
export function MyBasketReducer(state = initState, action) {
  let item = {};
  let items = {};
  switch (action.type) {

    case MyBasketActionTypes.ADD_TO_BASKET:
      items = { ...state.items };
      items[action.payload.item.id] = action.payload.item;
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.INCREMENT_QTY:
      items = { ...state.items };
      item = { ...items[action.payload.id] };
      item.qty++;
      items[action.payload.id] = item;
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.DECREMENT_QTY:
      items = { ...state.items };
      item = { ...items[action.payload.id] };
      item.qty--;
      items[action.payload.id] = item;
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.REMOVE_FROM_BASKET:
      items = { ...state.items };
      delete items[action.payload.id];
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.SET_BASKET:
      return { ...state, items: action.payload.items };

    case MyBasketActionTypes.CLEAR_BASKET:
      MyBasketStorage.clearBasket();
      return { ...state, items: {} };

    case MyBasketActionTypes.VALIDATE_COUPON_PROG:
      return { ...state, isProgress: true, };
    case MyBasketActionTypes.VALIDATE_COUPON_SUCC:
      return { ...state, isProgress: false, coupon: action.payload.coupon };
    case MyBasketActionTypes.VALIDATE_COUPON_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };


    case MyBasketActionTypes.CLEAR_COUPON:
      return { ...state, coupon: null };

    default:
      return state;
  }
};