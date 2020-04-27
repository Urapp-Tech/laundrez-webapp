import { AddressActionTypes } from './actions-types';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  addresses: [],
};
export function AddressReducer(state = initState, action) {
  switch (action.type) {
    case AddressActionTypes.SAVE_ADDRESS_PROG:
      return { ...state, isProgress: true };

    case AddressActionTypes.SAVE_ADDRESS_SUCC:
      return { ...state, isProgress: false, };

    case AddressActionTypes.SAVE_ADDRESS_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };




    case AddressActionTypes.UPDATE_ADDRESS_PROG:
      return { ...state, isProgress: true };

    case AddressActionTypes.UPDATE_ADDRESS_SUCC:
      return { ...state, isProgress: false, };

    case AddressActionTypes.UPDATE_ADDRESS_FAIL:
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