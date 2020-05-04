import { AddressActionTypes } from './actions-types';

export class AddressActions {

    static saveAddress(body) {
        return {
            type: AddressActionTypes.SAVE_ADDRESS_PROG,
            payload: { body }

        };
    }
    static getAddresses() {
        return {
            type: AddressActionTypes.GET_ADDRESSES_PROG,

        };
    }

    static updateAddress(body, index) {
        return {
            type: AddressActionTypes.UPDATE_ADDRESS_PROG,
            payload: { body, index }

        };
    }

    static deleteAddress(id, index) {
        return {
            type: AddressActionTypes.DELETE_ADDRESS_PROG,
            payload: { id, index }

        };
    }


}