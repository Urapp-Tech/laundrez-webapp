import { CardActionTypes } from './actions-types';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  cards: [],
};
export function CardReducer(state = initState, action) {
  let array = [];
  switch (action.type) {
    case CardActionTypes.SAVE_CARD_PROG:
      return { ...state, isProgress: true };

    case CardActionTypes.SAVE_CARD_SUCC:
      return { ...state, isProgress: false, };

    case CardActionTypes.SAVE_CARD_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case CardActionTypes.DELETE_CARD_PROG:
      return { ...state, };

    case CardActionTypes.DELETE_CARD_SUCC:
      array = [...state.cards];
      array.splice(action.payload.index, 1);
      return { ...state, cards: array };

    case CardActionTypes.DELETE_CARD_FAIL:
      return { ...state, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case CardActionTypes.GET_CARDS_PROG:
      return { ...state };

    case CardActionTypes.GET_CARDS_SUCC:
      return { ...state, cards: action.payload.cards };

    case CardActionTypes.GET_CARDS_FAIL:
      return { ...state, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    default:
      return state;
  }
};