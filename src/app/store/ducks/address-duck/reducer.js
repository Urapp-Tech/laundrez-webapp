import { AddressActionTypes } from './actions-types';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  addresses: [],
};
export function AddressReducer(state = initState, action) {
  let array = [];
  switch (action.type) {
    case AddressActionTypes.SAVE_ADDRESS_PROG:
      return { ...state, isProgress: true };

    case AddressActionTypes.SAVE_ADDRESS_SUCC:
      array = [...state.addresses];
      array.push(action.payload.address);
      return { ...state, isProgress: false, addresses: array };

    case AddressActionTypes.SAVE_ADDRESS_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case AddressActionTypes.UPDATE_ADDRESS_PROG:
      return { ...state, isProgress: true };

    case AddressActionTypes.UPDATE_ADDRESS_SUCC:
      return { ...state, isProgress: false, };

    case AddressActionTypes.UPDATE_ADDRESS_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case AddressActionTypes.DELETE_ADDRESS_PROG:
      return { ...state, isProgress: true };

    case AddressActionTypes.DELETE_ADDRESS_SUCC:
      array = [...state.addresses];
      array.splice(action.payload.index, 1);
      return { ...state, isProgress: false, addresses: array };

    case AddressActionTypes.DELETE_ADDRESS_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case AddressActionTypes.GET_ADDRESSES_PROG:
      return { ...state, isProgress: true };

    case AddressActionTypes.GET_ADDRESSES_SUCC:
      return { ...state, isProgress: false, addresses: action.payload.addresses };

    case AddressActionTypes.GET_ADDRESSES_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };

    default:
      return state;
  }
};