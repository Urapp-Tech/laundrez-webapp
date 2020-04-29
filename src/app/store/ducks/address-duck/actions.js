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

    static updateAddress(body) {
        return {
            type: AddressActionTypes.UPDATE_ADDRESS_PROG,
            payload: { body }

        };
    }

    static deleteAddress(id, index) {
        return {
            type: AddressActionTypes.DELETE_ADDRESS_PROG,
            payload: { id, index }

        };
    }


}