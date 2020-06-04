import { AddressActionTypes } from './actions-types';
const initState = {
  isProgressSave: false,
  isProgressUpdate: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  addresses: [],
};
export function AddressReducer(state = initState, action) {
  let array = [];
  switch (action.type) {
    case AddressActionTypes.SAVE_ADDRESS_PROG:
      return { ...state, isProgressSave: true };

    case AddressActionTypes.SAVE_ADDRESS_SUCC:
      return { ...state, isProgressSave: false, };

    case AddressActionTypes.SAVE_ADDRESS_FAIL:
      return { ...state, isProgressSave: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case AddressActionTypes.UPDATE_ADDRESS_PROG:
      return { ...state, isProgressUpdate: true };

    case AddressActionTypes.UPDATE_ADDRESS_SUCC:
      return { ...state, isProgressUpdate: false, };

    case AddressActionTypes.UPDATE_ADDRESS_FAIL:
      return { ...state, isProgressUpdate: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case AddressActionTypes.DELETE_ADDRESS_PROG:
      return { ...state };

    case AddressActionTypes.DELETE_ADDRESS_SUCC:
      array = [...state.addresses];
      array.splice(action.payload.index, 1);
      return { ...state, addresses: array };

    case AddressActionTypes.DELETE_ADDRESS_FAIL:
      return { ...state, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case AddressActionTypes.GET_ADDRESSES_PROG:
      return { ...state };

    case AddressActionTypes.GET_ADDRESSES_SUCC:
      return { ...state, addresses: action.payload.addresses };

    case AddressActionTypes.GET_ADDRESSES_FAIL:
      return { ...state, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    default:
      return state;
  }
};