import { MyBasketActionTypes } from './actions-types';
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
      return { ...state, items: { ...state.items, [action.payload.item.id]: action.payload.item } };

    case MyBasketActionTypes.INCREMENT_QTY:
      item = { ...state.items[action.payload.id] };
      item.qty++;
      return { ...state, items: { ...state.items, [action.payload.id]: item } };

    case MyBasketActionTypes.DECREMENT_QTY:
      item = { ...state.items[action.payload.id] };
      item.qty--;
      return { ...state, items: { ...state.items, [action.payload.id]: item } };

    case MyBasketActionTypes.REMOVE_FROM_BASKET:
      items = { ...state.items };
      delete items[action.payload.id];
      return { ...state, items };
    default:
      return state;
  }
};