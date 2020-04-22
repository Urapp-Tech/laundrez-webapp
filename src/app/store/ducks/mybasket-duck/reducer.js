import { MyBasketActionTypes } from './actions-types';
import { MyBasketStorage } from './basket-storage';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  items: {}
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
    default:
      return state;
  }
};