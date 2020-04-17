import { CategoryActionTypes } from './actions-types';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  categories: [],
};
export function CategoryReducer(state = initState, action) {
  switch (action.type) {
    case CategoryActionTypes.CATEGORIES_PROG:
      return { ...state, isProgress: true };

    case CategoryActionTypes.CATEGORIES_SUCC:
      return { ...state, isProgress: false, categories: action.payload.categories };

    case CategoryActionTypes.CATEGORIES_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };
    default:
      return state;
  }
};