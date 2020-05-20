import { MyBasketActionTypes } from './actions-types';

export class MyBasketActions {

    static addToBasket(item) {
        return {
            type: MyBasketActionTypes.ADD_TO_BASKET,
            payload: { item }
        };
    }

    static incrementQty(id) {
        return {
            type: MyBasketActionTypes.INCREMENT_QTY,
            payload: { id }
        };
    }
    static decrementQty(id) {
        return {
            type: MyBasketActionTypes.DECREMENT_QTY,
            payload: { id }
        };
    }

    static removeFromBasket(id) {
        return {
            type: MyBasketActionTypes.REMOVE_FROM_BASKET,
            payload: { id }
        };
    }

    static setBasket(items) {
        return {
            type: MyBasketActionTypes.SET_BASKET,
            payload: { items }
        };
    }
    static clearBasket() {
        return {
            type: MyBasketActionTypes.CLEAR_BASKET
        };
    }

    static validateCoupon(code) {
        return {
            type: MyBasketActionTypes.VALIDATE_COUPON_PROG,
            payload: { code }
        };
    }

}